import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'manuj_bajaj_sales_saas_super_secret_key_2026';

/**
 * Register a new subscriber account
 */
export function register(req, res) {
  const { email, password, name, selectTrial } = req.body;

  if (!email || !password || !name) {
    return res.status(400).json({ error: 'Name, email, and password are required.' });
  }

  try {
    const existing = db.prepare('SELECT id FROM users WHERE email = ?').get(email);
    if (existing) {
      return res.status(409).json({ error: 'An account with this email already exists.' });
    }

    const salt = bcrypt.genSaltSync(10);
    const passwordHash = bcrypt.hashSync(password, salt);

    // If user opts for 1-month trial upon signup:
    const plan = selectTrial ? 'free_trial' : 'always_free';
    const initialTokens = selectTrial ? 50000 : 5000;
    const trialExpiry = selectTrial ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString() : null;

    const result = db.prepare(`
      INSERT INTO users (email, password_hash, name, plan, token_balance, trial_expires_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `).run(email, passwordHash, name, plan, initialTokens, trialExpiry);

    const userId = result.lastInsertRowid;

    // Log initial token grant in ledger
    db.prepare(`
      INSERT INTO token_ledger (user_id, amount, reason, balance_after)
      VALUES (?, ?, ?, ?)
    `).run(userId, initialTokens, selectTrial ? 'Free 1-Month Trial Welcome Bonus' : 'Always Free Starter Grant', initialTokens);

    const token = jwt.sign({ id: userId, email }, JWT_SECRET, { expiresIn: '30d' });

    res.status(201).json({
      message: 'Registration successful!',
      token,
      user: {
        id: userId,
        email,
        name,
        plan,
        token_balance: initialTokens,
        trial_expires_at: trialExpiry
      }
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Failed to create account.' });
  }
}

/**
 * Login user
 */
export function login(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required.' });
  }

  try {
    const user = db.prepare('SELECT * FROM users WHERE email = ?').get(email);
    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const isMatch = bcrypt.compareSync(password, user.password_hash);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password.' });
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '30d' });

    res.json({
      message: 'Login successful!',
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        token_balance: user.token_balance,
        trial_expires_at: user.trial_expires_at
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Internal server error during login.' });
  }
}

/**
 * Fetch current authenticated user's profile and live token ledger
 */
export function getMe(req, res) {
  try {
    const user = req.user;

    // Fetch last 10 token transactions
    const history = db.prepare(`
      SELECT id, amount, reason, balance_after, created_at
      FROM token_ledger
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 10
    `).all(user.id);

    res.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        plan: user.plan,
        token_balance: user.token_balance,
        trial_expires_at: user.trial_expires_at,
        created_at: user.created_at
      },
      token_history: history
    });
  } catch (err) {
    console.error('getMe error:', err);
    res.status(500).json({ error: 'Failed to retrieve profile.' });
  }
}

import jwt from 'jsonwebtoken';
import db from '../config/database.js';

const JWT_SECRET = process.env.JWT_SECRET || 'manuj_bajaj_sales_saas_super_secret_key_2026';

/**
 * Middleware: Verify user JWT session and fetch up-to-date user profile
 */
export function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Authentication required. Please log in or sign up.' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = db.prepare('SELECT id, email, name, plan, token_balance, trial_expires_at, created_at FROM users WHERE id = ?').get(decoded.id);

    if (!user) {
      return res.status(404).json({ error: 'User account not found.' });
    }

    // Check if free trial has expired
    if (user.plan === 'free_trial' && user.trial_expires_at) {
      const expiry = new Date(user.trial_expires_at);
      if (Date.now() > expiry.getTime()) {
        // Automatically downgrade expired trial to always_free
        db.prepare("UPDATE users SET plan = 'always_free' WHERE id = ?").run(user.id);
        user.plan = 'always_free';
      }
    }

    req.user = user;
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Session expired or invalid token. Please log in again.' });
  }
}

/**
 * Middleware: Enforce token quota requirement before running AI generations
 */
export function requireTokenQuota(minTokens = 100) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    if (req.user.token_balance < minTokens) {
      return res.status(402).json({
        error: `Insufficient tokens! Your current balance is ${req.user.token_balance} tokens. Please upgrade your subscription plan or purchase tokens to continue.`,
        currentBalance: req.user.token_balance,
        requiresUpgrade: true
      });
    }

    next();
  };
}

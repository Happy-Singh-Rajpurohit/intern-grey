import db from '../config/database.js';

/**
 * 4 Canonical Subscription Plans as requested:
 * 1. Always Free
 * 2. Free 1 month Trial
 * 3. Monthly Payment
 * 4. One time payment
 */
export const PLANS = {
  always_free: {
    id: 'always_free',
    name: 'Always Free',
    price: 0,
    currency: 'INR',
    billingCycle: 'Forever',
    tokensAllocated: 5000,
    features: [
      '5,000 tokens included monthly (~3 reports)',
      'Core Stab & Twist methodology',
      'Basic 6KLH leakage calculator',
      'Standard community support'
    ]
  },
  free_trial: {
    id: 'free_trial',
    name: 'Free 1-Month Trial',
    price: 0,
    currency: 'INR',
    billingCycle: '30 Days Full Access',
    tokensAllocated: 50000,
    features: [
      '50,000 tokens included (~25 full reports)',
      'Full Stab & Twist objection engine',
      'Full 6KLH financial leakage breakdown',
      'Manuj Bajaj video transcripts training',
      'PDF report downloads & WhatsApp sharing'
    ]
  },
  monthly: {
    id: 'monthly',
    name: 'Monthly Pro Subscription',
    price: 2999,
    currency: 'INR',
    billingCycle: 'Billed monthly',
    tokensAllocated: 250000,
    badge: 'Most Popular',
    features: [
      '250,000 tokens auto-renewed monthly (~125 reports)',
      'Continuous video transcript training updates',
      'Custom high-ticket buyer persona tuning',
      'Priority generation speed',
      'Cancel or downgrade anytime'
    ]
  },
  one_time: {
    id: 'one_time',
    name: 'One-Time Lifetime Pass',
    price: 9999,
    currency: 'INR',
    billingCycle: 'One-time payment (No recurring fees)',
    tokensAllocated: 750000,
    badge: 'Best Value',
    features: [
      '750,000 lifetime token bundle (~375 reports)',
      'Never expiring token wallet',
      'All present & future video transcript libraries',
      'Direct priority feature requests',
      'Zero monthly subscription fees forever'
    ]
  }
};

/**
 * Get all available subscription plans
 */
export function getPlans(req, res) {
  res.json({
    plans: Object.values(PLANS)
  });
}

/**
 * Process plan upgrade / payment simulation
 */
export function upgradePlan(req, res) {
  const { planId, paymentMethod = 'sandbox_instant' } = req.body;
  const user = req.user;

  if (!planId || !PLANS[planId]) {
    return res.status(400).json({ error: 'Invalid plan selected.' });
  }

  const selectedPlan = PLANS[planId];

  try {
    let newBalance = user.token_balance + selectedPlan.tokensAllocated;
    let trialExpiry = null;

    if (planId === 'free_trial') {
      trialExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();
    }

    // Update user record
    db.prepare(`
      UPDATE users 
      SET plan = ?, token_balance = ?, trial_expires_at = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `).run(planId, newBalance, trialExpiry, user.id);

    // Record subscription entry
    const txId = `TX_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
    const expiresAt = planId === 'monthly'
      ? new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString()
      : trialExpiry;

    db.prepare(`
      INSERT INTO subscriptions (user_id, plan_id, status, amount, currency, payment_method, transaction_id, expires_at)
      VALUES (?, ?, 'active', ?, ?, ?, ?, ?)
    `).run(user.id, planId, selectedPlan.price, selectedPlan.currency, paymentMethod, txId, expiresAt);

    // Record token addition in ledger
    db.prepare(`
      INSERT INTO token_ledger (user_id, amount, reason, balance_after)
      VALUES (?, ?, ?, ?)
    `).run(user.id, selectedPlan.tokensAllocated, `Plan Upgrade: ${selectedPlan.name} (+${selectedPlan.tokensAllocated.toLocaleString()} tokens)`, newBalance);

    res.json({
      success: true,
      message: `Successfully switched to ${selectedPlan.name}!`,
      newPlan: planId,
      tokensAdded: selectedPlan.tokensAllocated,
      newBalance,
      transactionId: txId
    });
  } catch (err) {
    console.error('Plan upgrade error:', err);
    res.status(500).json({ error: 'Failed to complete plan upgrade.' });
  }
}

/**
 * Get subscriber's token audit trail and billing history
 */
export function getBillingHistory(req, res) {
  try {
    const user = req.user;

    const subscriptions = db.prepare(`
      SELECT * FROM subscriptions WHERE user_id = ? ORDER BY id DESC
    `).all(user.id);

    const tokenTransactions = db.prepare(`
      SELECT * FROM token_ledger WHERE user_id = ? ORDER BY id DESC LIMIT 50
    `).all(user.id);

    res.json({
      subscriptions,
      tokenTransactions,
      currentBalance: user.token_balance,
      currentPlan: user.plan
    });
  } catch (err) {
    console.error('getBillingHistory error:', err);
    res.status(500).json({ error: 'Failed to fetch billing history.' });
  }
}

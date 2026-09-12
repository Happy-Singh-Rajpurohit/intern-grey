import db from '../config/database.js';
import { generateSalesObjections } from '../services/aiService.js';

/**
 * Generate Sales Objection Handling Intelligence:
 * 1. Checks user token balance
 * 2. Grounded via RAG on video transcripts
 * 3. Calls Gemini or fallback engine
 * 4. Deducts exact tokens consumed and records audit trail
 */
export async function handleGenerateSalesInfo(req, res) {
  const { product, targetIndustry, businessModel, dealSize, buyerProfile, additionalContext } = req.body;
  const user = req.user;

  if (!product || !targetIndustry) {
    return res.status(400).json({ error: 'Product / Service and Target Industry fields are required.' });
  }

  // Pre-check balance
  if (user.token_balance <= 50) {
    return res.status(402).json({
      error: `Insufficient tokens! Your current balance is ${user.token_balance} tokens. Please upgrade your subscription plan or add tokens to continue.`,
      requiresUpgrade: true
    });
  }

  try {
    // Generate AI intelligence with video transcript grounding
    const { result, tokensSpent, source, matchedTranscripts } = await generateSalesObjections({
      product,
      targetIndustry,
      businessModel,
      dealSize,
      buyerProfile,
      additionalContext
    });

    // Determine actual tokens to deduct (ensure user does not go negative)
    const deduction = Math.min(tokensSpent, user.token_balance);
    const newBalance = user.token_balance - deduction;

    // Atomic update of user token balance and audit trail
    const updateBalance = db.transaction(() => {
      db.prepare(`
        UPDATE users 
        SET token_balance = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
      `).run(newBalance, user.id);

      db.prepare(`
        INSERT INTO token_ledger (user_id, amount, reason, balance_after)
        VALUES (?, ?, ?, ?)
      `).run(user.id, -deduction, `Sales Intelligence Generation for "${product.slice(0, 30)}"`, newBalance);

      db.prepare(`
        INSERT INTO reports (user_id, product, industry, result_json, tokens_spent)
        VALUES (?, ?, ?, ?, ?)
      `).run(user.id, product, targetIndustry, JSON.stringify(result), deduction);
    });

    updateBalance();

    console.log(`🪙 User ${user.email} consumed ${deduction} tokens. Remaining: ${newBalance}`);

    res.json({
      ...result,
      _meta: {
        tokensConsumed: deduction,
        tokenBalanceRemaining: newBalance,
        engineSource: source,
        groundedTranscripts: matchedTranscripts
      }
    });
  } catch (err) {
    console.error('Error in handleGenerateSalesInfo:', err);
    res.status(500).json({ error: err.message || 'Failed to generate sales intelligence report.' });
  }
}

/**
 * Get user's previously generated reports
 */
export function getUserReports(req, res) {
  try {
    const user = req.user;
    const reports = db.prepare(`
      SELECT id, product, industry, tokens_spent, created_at
      FROM reports
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 20
    `).all(user.id);

    res.json({ reports });
  } catch (err) {
    res.status(500).json({ error: 'Failed to retrieve reports.' });
  }
}

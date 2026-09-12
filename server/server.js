import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initDatabase } from './config/database.js';
import { authenticateToken, requireTokenQuota } from './middleware/authMiddleware.js';
import * as authController from './controllers/authController.js';
import * as billingController from './controllers/billingController.js';
import * as salesController from './controllers/salesController.js';
import * as transcriptController from './controllers/transcriptController.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));

// Initialize SQLite database, create tables & seed foundational data
initDatabase();

// --- Health Check ---
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'Sales Intelligence Objection Handling Assistant SaaS',
    author: 'Coach Manuj Bajaj Methodology',
    timestamp: new Date().toISOString()
  });
});

// --- Authentication Routes ---
app.post('/api/auth/register', authController.register);
app.post('/api/auth/login', authController.login);
app.get('/api/auth/me', authenticateToken, authController.getMe);

// --- Billing & Subscription Routes (4 Tiers) ---
app.get('/api/billing/plans', billingController.getPlans);
app.post('/api/billing/upgrade', authenticateToken, billingController.upgradePlan);
app.get('/api/billing/history', authenticateToken, billingController.getBillingHistory);

// --- Core AI Sales Intelligence Route (With Token Consumption & Transcript Grounding) ---
app.post('/api/generate-sales-info', authenticateToken, requireTokenQuota(100), salesController.handleGenerateSalesInfo);
app.get('/api/sales/reports', authenticateToken, salesController.getUserReports);

// --- Video Transcripts Training (RAG Knowledge Base) ---
app.get('/api/transcripts', transcriptController.getTranscripts);
app.post('/api/transcripts', transcriptController.addTranscript);
app.delete('/api/transcripts/:id', transcriptController.deleteTranscript);
app.post('/api/transcripts/test-search', transcriptController.testTranscriptSearch);

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDist = path.join(__dirname, '..', 'client', 'dist');

// Serve static frontend assets from client/dist if built
app.use(express.static(clientDist));

// SPA fallback for all other routes
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(clientDist, 'index.html'));
});

// Resilient server startup
function startServer(portToTry) {
  const server = app.listen(portToTry, () => {
    console.log(`=======================================================`);
    console.log(`🚀 Sales Intelligence SaaS API & UI running on port ${portToTry}`);
    console.log(`🔗 Web Application: http://localhost:${portToTry}`);
    console.log(`🔗 Health Check: http://localhost:${portToTry}/api/health`);
    console.log(`🪙 Token Deduction & Video RAG Grounding active`);
    console.log(`=======================================================`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.warn(`⚠️ Port ${portToTry} is in use, attempting port ${portToTry + 1}...`);
      startServer(portToTry + 1);
    } else {
      console.error('Server error:', err);
    }
  });
}

startServer(Number(PORT));

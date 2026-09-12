# 🚀 Sales Objection Handling Assistant SaaS
### Enterprise Subscription Platform & Video Transcript RAG Engine
**Created for Coach Manuj Bajaj's Sales Methodology (Amazon Bestselling Author of 26 Books)**

---

## 📌 Executive Summary

This application transforms Coach Manuj Bajaj's Google AI Studio Sales Objection Handling prototype into a **scalable, multi-tenant subscription SaaS platform**. 

It implements:
1. **Tiered Monetization:** 4 canonical plans (**Always Free**, **Free 1-Month Trial**, **Monthly Subscription**, **One-Time Lifetime Pass**).
2. **Strict Subscriber Token Deduction:** AI tokens are deducted exclusively from the buyer's account with a real-time cryptographic audit trail.
3. **Video Transcript Training (RAG):** Ingests, chunks, and semantically indexes Manuj's video webinars and coaching sessions to ground every AI rebuttal in his authentic *Stab & Twist* and *6KLH* methodology.

---

## 🏗️ Architecture & Scalable Tech Stack

```
sales-intelligence-saas/
├── server/
│   ├── config/
│   │   └── database.js           # SQLite (WAL mode, zero-lag) -> Ready for PostgreSQL/Supabase
│   ├── controllers/
│   │   ├── authController.js     # User registration, login, JWT token generation
│   │   ├── billingController.js  # 4 subscription tiers, checkout simulation, ledger
│   │   ├── salesController.js    # AI objection generation with atomic token deduction
│   │   └── transcriptController.js # Video transcript ingestion, chunking & RAG search
│   ├── middleware/
│   │   └── authMiddleware.js     # Session validation & quota gatekeeping
│   ├── services/
│   │   ├── aiService.js          # Google Gemini 1.5/2.0 Flash with RAG prompt grounding
│   │   └── ragService.js         # Semantic retrieval of Manuj's video transcripts
│   ├── server.js                 # Express bootstrap & static SPA hosting
│   └── package.json
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── LandingPage.jsx   # Clean light-theme Product Showcase & Home Page
│   │   │   ├── LoginPage.jsx     # Dedicated light-theme Login & Sign-up Page
│   │   │   ├── Header.jsx        # Light executive top bar with live token pill
│   │   │   ├── ObjectionForm.jsx # Spacious scenario configuration form
│   │   │   ├── ReportView.jsx    # Objections, Stab & Twist, 6KLH, and PDF/WhatsApp export
│   │   │   ├── PricingModal.jsx  # 4-tier plan comparison & instant checkout simulation
│   │   │   ├── TokenWallet.jsx   # Live token gauge & transaction ledger audit table
│   │   │   └── TranscriptTrainer.jsx # Video transcript manager & semantic test sandbox
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Global auth, plan, and token balance state
│   │   ├── App.jsx
│   │   └── index.css
│   ├── vite.config.js
│   └── package.json
├── .env.example
└── README.md
```

### Why This Tech Stack is Scalable:
* **Stateless Express API:** Horizontally scalable on Google Cloud Run, AWS ECS, or Render with zero state in memory.
* **Database Agnostic Architecture:** Uses SQLite in WAL mode locally, easily switched to **PostgreSQL / Supabase** by changing the database driver.
* **Atomic Token Transactions:** Deductions happen in database transactions (`db.transaction`), preventing race conditions and double-spending of tokens.
* **Hybrid RAG Engine:** Fast semantic chunking and term-overlap retrieval, designed to scale to vector databases (Pinecone or pgvector).

---

## 💳 The 4 Subscription Tiers

| Tier | Price | Token Quota | Validity | Target Audience |
| :--- | :--- | :--- | :--- | :--- |
| **Always Free** | ₹0 | 5,000 tokens / mo | Forever | Casual trial users (~3 reports/month) |
| **Free 1-Month Trial** | ₹0 | 50,000 tokens upfront | 30 Days Full Pass | Serious prospective clients (~25 reports) |
| **Monthly Pro** | ₹2,999 / mo | 250,000 tokens / mo | 30 Days Auto-renewing | Active sales reps and SDR teams (~125 reports) |
| **One-Time Lifetime** | ₹9,999 | 750,000 tokens | Never Expiring | Founders & high-ticket agency owners (~375 reports) |

---

## 🪙 Token Deduction Engine

1. **Quota Check:** Before any AI call, `authMiddleware` checks if `token_balance >= 100`.
2. **Generation:** Gemini 1.5/2.0 Flash generates the comprehensive report.
3. **Atomic Deduction:** Exact tokens spent (prompt + completion tokens) are calculated and subtracted from `users.token_balance`.
4. **Audit Trail:** A row is inserted into `token_ledger` recording:
   * Timestamp
   * Amount deducted (e.g. `-580`)
   * Reason (e.g. `Sales Intelligence Generation for "Warehouse IoT System"`)
   * Resulting balance

---

## 🎓 Video Transcripts RAG Grounding Engine

Manuj Bajaj asked: *"Provision to train this app based on transcripts from my videos."*

### How it works:
1. **Ingestion (`POST /api/transcripts`):** Admin pastes or uploads spoken transcripts from YouTube, coaching videos, or webinars.
2. **Chunking (`ragService.js`):** Breaks transcripts into 150-word semantic chunks with 30-word overlaps.
3. **Keyword & Vector Indexing:** Stored in `transcript_chunks` with high-intent sales terms.
4. **Retrieval at Query Time:** When a user generates objections for a scenario, the RAG service extracts the top matching video lessons (e.g. *"Stab & Twist Framework"*, *"6KLH Breakdown"*, *"Countering Diwali Delays"*).
5. **Prompt Injection:** These exact lessons are injected into Gemini's system instructions, ensuring the output sounds authentically like Manuj Bajaj.

---

## ⚡ Quickstart Guide (Run Locally in 2 Minutes)

### Prerequisites
* Node.js v18+ (tested on v22)
* npm

### Step 1: Install Dependencies
```bash
cd sales-intelligence-saas
npm run install:all
```

### Step 2: Configure Environment (Optional)
```bash
cp .env.example server/.env
```
*(The system includes an automatic fallback generator and sandbox checkout simulator, so it runs completely out of the box even without API keys!)*

To enable live Google Gemini calls:
1. Get a free API key at [Google AI Studio](https://aistudio.google.com/).
2. Add to `server/.env`:
   ```env
   GEMINI_API_KEY=AIzaSy...
   ```

### Step 3: Build & Start Full Application
```bash
# Build frontend
npm run build

# Start production server (serves API and UI on one port)
npm start
```
Open your browser at: **`http://localhost:5001`**

---

## 🧪 Pre-configured Demo Accounts

For instant testing without signing up, the system pre-seeds:

* **Email:** `demo@manujbajaj.com`
* **Password:** `demo1234`
* **Initial Plan:** Free 1-Month Trial
* **Initial Token Balance:** 50,000 tokens
* **Indexed Video Transcripts:** 4 foundational lessons preloaded from Manuj Bajaj's coaching library.

*(You can also use the **"Instant Demo Login"** button in the app to sign in with 1 click).*

---

## 📡 API Endpoints Reference

### Authentication
* `POST /api/auth/register` — Create new account (allocates initial tier tokens)
* `POST /api/auth/login` — Sign in and receive JWT token
* `GET /api/auth/me` — Fetch profile, active plan, live token balance, and recent ledger

### Subscriptions & Billing
* `GET /api/billing/plans` — List all 4 subscription plans
* `POST /api/billing/upgrade` — Upgrade plan (adds tokens, updates subscription)
* `GET /api/billing/history` — Full audit trail of token ledger and subscription history

### Sales Objection Engine
* `POST /api/generate-sales-info` — Generates sales objections, applies RAG video grounding, and atomically deducts tokens from subscriber's account.

### Video Transcripts RAG
* `GET /api/transcripts` — List all indexed video lessons
* `POST /api/transcripts` — Ingest new video transcript and create chunks
* `POST /api/transcripts/test-search` — Test semantic recall against buyer queries
* `DELETE /api/transcripts/:id` — Remove transcript from knowledge base

---

## 💡 Talking Points for Your Client Meeting with Manuj Bajaj

1. **Monetization Protection:** *"You no longer pay for user API usage. The system manages subscriber quotas atomically, ensuring heavy users either purchase Monthly Pro or Lifetime token packs."*
2. **Authentic Voice:** *"Rather than generic AI outputs, our RAG pipeline grounds Gemini specifically in your video transcripts, citing your exact analogies, Stab & Twist frameworks, and 6KLH figures."*
3. **Conversion Focused:** *"We built an interactive 6KLH Cost of Inaction Calculator right into the report view. Sales reps can show prospects the exact ₹ cash lost if they procrastinate."*
4. **Ready for Scale:** *"The architecture is stateless and container-ready, allowing instant 1-click deployment to Google Cloud Run."*

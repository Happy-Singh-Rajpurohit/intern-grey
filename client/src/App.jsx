import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import Header from './components/Header';
import ObjectionForm from './components/ObjectionForm';
import ReportView from './components/ReportView';
import TokenWallet from './components/TokenWallet';
import TranscriptTrainer from './components/TranscriptTrainer';
import PricingModal from './components/PricingModal';
import { useAuth } from './context/AuthContext';
import { Check, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function App() {
  const { user, token, updateBalanceAfterGeneration } = useAuth();

  // Primary view routing: 'landing' (Product Home), 'login' (Dedicated Login Page), 'app' (Workspace)
  const [viewMode, setViewMode] = useState('landing');
  const [activeTab, setActiveTab] = useState('assistant'); // 'assistant', 'wallet', 'training', 'pricing'
  const [report, setReport] = useState(null);
  const [scenario, setScenario] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const [pricingModalOpen, setPricingModalOpen] = useState(false);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const handleGenerate = async (formData) => {
    if (!token) {
      setViewMode('login');
      return;
    }

    setLoading(true);
    setScenario(formData);

    try {
      const res = await fetch('/api/generate-sales-info', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        if (res.status === 402 || data.requiresUpgrade) {
          setPricingModalOpen(true);
          showToast(data.error || 'Insufficient tokens! Please upgrade your plan.', 'error');
          return;
        }
        throw new Error(data.error || 'Failed to generate report.');
      }

      setReport(data);

      // Deduct tokens in local state immediately
      if (data._meta?.tokenBalanceRemaining !== undefined) {
        updateBalanceAfterGeneration(
          data._meta.tokenBalanceRemaining,
          data._meta.tokensConsumed,
          formData.product
        );

        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 }
        });

        showToast(`Report generated! Consumed ${data._meta.tokensConsumed} tokens from your account.`);
      }

      setActiveTab('assistant');
    } catch (err) {
      console.error(err);
      showToast(err.message || 'Generation failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  // 1. Landing Page View (Home / Product Showcase)
  if (viewMode === 'landing') {
    return (
      <>
        <LandingPage
          onLaunchApp={() => setViewMode('app')}
          onOpenLogin={() => setViewMode('login')}
          onSelectPlan={(planId) => {
            setViewMode('app');
            setPricingModalOpen(true);
          }}
        />
        <PricingModal
          isOpen={pricingModalOpen}
          onClose={() => setPricingModalOpen(false)}
        />
      </>
    );
  }

  // 2. Dedicated Login / Register Page
  if (viewMode === 'login') {
    return (
      <LoginPage
        onBackToHome={() => setViewMode('landing')}
        onSuccess={() => setViewMode('app')}
      />
    );
  }

  // 3. Workspace Application View
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'pricing') {
            setPricingModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        onOpenAuth={() => setViewMode('login')}
        onOpenPricing={() => setPricingModalOpen(true)}
        onGoHome={() => setViewMode('landing')}
      />

      {/* Toast Notification */}
      {toast && (
        <div className="fixed top-20 right-5 z-50 animate-fade-in no-print">
          <div className={`p-4 rounded-2xl shadow-xl border text-xs font-bold flex items-center gap-2.5 ${
            toast.type === 'error'
              ? 'bg-rose-50 text-rose-800 border-rose-200'
              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
          }`}>
            {toast.type === 'error' ? <AlertCircle className="w-4 h-4 text-rose-600" /> : <Check className="w-4 h-4 text-emerald-600" />}
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Main Workspace Area with Breathing Space */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        
        {activeTab === 'assistant' && (
          <div>
            {!report ? (
              <div className="space-y-8">
                {/* Hero Banner */}
                <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-10 shadow-sm relative overflow-hidden">
                  <div className="max-w-3xl relative z-10">
                    <span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full inline-block mb-3">
                      Autonomous Sales Defense Engine
                    </span>
                    <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-950 tracking-tight leading-tight">
                      Turn Harsh Objections into <span className="text-emerald-700">High-Ticket Closes</span>
                    </h2>
                    <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
                      Powered by Coach Manuj Bajaj's proprietary <strong>Stab & Twist</strong> framework and <strong>6KLH</strong> leakage arithmetic. Grounded in real video transcripts to cut through buyer hesitation.
                    </p>
                  </div>
                </div>

                <ObjectionForm
                  onGenerate={handleGenerate}
                  loading={loading}
                  onOpenPricing={() => setPricingModalOpen(true)}
                />
              </div>
            ) : (
              <ReportView
                report={report}
                scenario={scenario}
                onReset={() => {
                  setReport(null);
                  setScenario(null);
                }}
              />
            )}
          </div>
        )}

        {activeTab === 'wallet' && (
          <TokenWallet
            onOpenPricing={() => setPricingModalOpen(true)}
          />
        )}

        {activeTab === 'training' && (
          <TranscriptTrainer />
        )}

      </main>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={pricingModalOpen}
        onClose={() => setPricingModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 text-center text-xs text-slate-500 no-print">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>Sales Objections Handling Assistant SaaS • Methodologies by Coach Manuj Bajaj</p>
          <div className="flex items-center gap-4">
            <button onClick={() => setViewMode('landing')} className="hover:text-slate-900 font-semibold">Home & Product</button>
            <button onClick={() => setPricingModalOpen(true)} className="hover:text-slate-900 font-semibold">Pricing</button>
            <button onClick={() => setViewMode('login')} className="hover:text-slate-900 font-semibold">Account</button>
          </div>
        </div>
      </footer>

    </div>
  );
}

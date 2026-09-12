import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Check, Zap, Sparkles, X, ShieldCheck, CreditCard } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PricingModal({ isOpen, onClose }) {
  const { user, upgradePlan } = useAuth();
  const [upgradingPlan, setUpgradingPlan] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  if (!isOpen) return null;

  const plans = [
    {
      id: 'always_free',
      name: 'Always Free',
      tagline: 'Test the waters',
      price: 0,
      period: 'Forever',
      tokens: '5,000 Tokens / mo',
      badge: null,
      features: [
        '5,000 tokens refreshed monthly',
        'Basic Stab & Twist generator',
        'Standard 6KLH calculator',
        'Up to 3 full reports per month',
        'Community knowledge access'
      ]
    },
    {
      id: 'free_trial',
      name: 'Free 1-Month Trial',
      tagline: 'Zero-risk full evaluation',
      price: 0,
      period: '30 Days Full Pass',
      tokens: '50,000 Tokens Grant',
      badge: 'Zero Risk',
      features: [
        '50,000 tokens upfront (~25 reports)',
        'Full video transcript RAG access',
        'All buyer fear question blueprints',
        'Cost of Inaction interactive calculator',
        'WhatsApp share & PDF report exports'
      ]
    },
    {
      id: 'monthly',
      name: 'Monthly Pro',
      tagline: 'For active sales closers & teams',
      price: 2999,
      period: 'Billed monthly',
      tokens: '250,000 Tokens / mo',
      badge: 'Most Popular',
      popular: true,
      features: [
        '250,000 tokens every 30 days (~125 reports)',
        'Priority RAG semantic video retrieval',
        'Exclusive high-ticket closing scripts',
        'Custom deal size & industry tuning',
        'Cancel or downgrade anytime'
      ]
    },
    {
      id: 'one_time',
      name: 'One-Time Lifetime',
      tagline: 'Permanent ownership, zero recurring bills',
      price: 9999,
      period: 'One-time payment',
      tokens: '750,000 Lifetime Tokens',
      badge: 'Best Value',
      features: [
        '750,000 tokens never expiring (~375 reports)',
        'All present & future video transcripts',
        'Direct priority roadmap access',
        'Commercial client-facing report rights',
        'No monthly or annual subscription fees ever'
      ]
    }
  ];

  const handleSelectPlan = async (planId) => {
    setUpgradingPlan(planId);
    setSuccessMessage('');

    try {
      const res = await upgradePlan(planId);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      setSuccessMessage(res.message || 'Plan updated successfully!');
      setTimeout(() => {
        onClose();
        setSuccessMessage('');
      }, 1800);
    } catch (err) {
      alert(err.message || 'Failed to upgrade plan.');
    } finally {
      setUpgradingPlan(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex min-h-full items-start sm:items-center justify-center p-3 sm:p-6 py-6 sm:py-10">
      
      {/* Background click to close overlay */}
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />

      {/* Modal Dialog Card */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl max-w-5xl w-full p-4 sm:p-8 sm:p-10 shadow-2xl relative my-auto z-10">
        
        {/* Close Button with comfortable mobile touch target */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-5 sm:right-5 p-2 text-slate-400 hover:text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-full transition-colors min-w-[36px] min-h-[36px] flex items-center justify-center"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-8 mt-2 sm:mt-0 px-2">
          <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[10px] sm:text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full inline-flex items-center gap-1.5 mb-2.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            Transparent Token-Based Plans
          </span>
          <h2 className="text-xl sm:text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-tight">
            Choose the Perfect Plan for Your Sales Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1.5 leading-relaxed">
            Tokens are consumed directly from your subscriber account on every report generation. Upgrade or replenish anytime.
          </p>
        </div>

        {successMessage && (
          <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold rounded-xl text-center flex items-center justify-center gap-2">
            <Check className="w-4 h-4 text-emerald-600" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 4 Plans Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-5">
          {plans.map((p) => {
            const isCurrent = user?.plan === p.id;

            return (
              <div
                key={p.id}
                className={`rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex flex-col justify-between transition-all relative ${
                  p.popular
                    ? 'bg-white border-2 border-emerald-600 shadow-md sm:shadow-lg shadow-emerald-600/10'
                    : 'bg-slate-50 border border-slate-200 hover:border-slate-300'
                }`}
              >
                {/* Badge */}
                {p.badge && (
                  <span className={`absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full shadow-xs ${
                    p.popular
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-100 text-amber-900 border border-amber-200'
                  }`}>
                    {p.badge}
                  </span>
                )}

                <div>
                  <h3 className="text-sm sm:text-base font-bold text-slate-900 mt-0.5">{p.name}</h3>
                  <p className="text-[11px] text-slate-500 mt-0.5 h-auto sm:h-7 leading-tight">{p.tagline}</p>

                  {/* Price */}
                  <div className="my-3 sm:my-4 pb-3 sm:pb-4 border-b border-slate-200">
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">
                        {p.price === 0 ? '₹0' : `₹${p.price.toLocaleString('en-IN')}`}
                      </span>
                      <span className="text-[10px] sm:text-[11px] text-slate-500 font-normal">/{p.period}</span>
                    </div>
                    <div className="mt-2 bg-emerald-100 text-emerald-900 text-[10px] sm:text-[11px] font-bold px-2 py-0.5 rounded-md inline-block">
                      🪙 {p.tokens}
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-2 sm:space-y-2.5 mb-5 sm:mb-6 text-[11px] sm:text-xs text-slate-600">
                    {p.features.map((feat, fIdx) => (
                      <li key={fIdx} className="flex items-start gap-2">
                        <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Upgrade Button with 44px touch height */}
                <button
                  onClick={() => handleSelectPlan(p.id)}
                  disabled={isCurrent || upgradingPlan === p.id}
                  className={`w-full py-2.5 sm:py-3 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 min-h-[42px] ${
                    isCurrent
                      ? 'bg-slate-200 text-slate-500 cursor-default'
                      : p.popular
                      ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                      : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-300'
                  }`}
                >
                  {upgradingPlan === p.id ? (
                    <div className="w-4 h-4 border-2 border-slate-400 border-t-slate-800 rounded-full animate-spin" />
                  ) : isCurrent ? (
                    'Current Plan'
                  ) : (
                    <>
                      <Zap className="w-3.5 h-3.5" />
                      <span>{p.price === 0 ? 'Activate Plan' : 'Select Plan'}</span>
                    </>
                  )}
                </button>

              </div>
            );
          })}
        </div>

        {/* Security & Token Guarantee Footer */}
        <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] sm:text-xs text-slate-500">
          <div className="flex items-center gap-2 text-center sm:text-left">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Instant activation • Tokens credit immediately to your account</span>
          </div>
          <div className="flex items-center gap-2 text-center sm:text-right">
            <CreditCard className="w-4 h-4 text-slate-400 shrink-0" />
            <span>Sandbox payment test simulator enabled</span>
          </div>
        </div>

      </div>
    </div>
  );
}

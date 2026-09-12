import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Coins, Award, Video, Wallet, CreditCard, LogOut, User, Zap, Home, Menu, X } from 'lucide-react';

export default function Header({ activeTab, setActiveTab, onOpenAuth, onOpenPricing, onGoHome }) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const getPlanBadge = (plan) => {
    switch (plan) {
      case 'monthly':
        return <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">🌟 Monthly Pro</span>;
      case 'one_time':
        return <span className="bg-amber-50 text-amber-800 border border-amber-200 text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">👑 Lifetime Pass</span>;
      case 'free_trial':
        return <span className="bg-blue-50 text-blue-800 border border-blue-200 text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-bold flex items-center gap-1 shrink-0">⏳ 1-Month Trial</span>;
      default:
        return <span className="bg-slate-100 text-slate-700 border border-slate-200 text-[11px] sm:text-xs px-2.5 py-0.5 rounded-full font-medium shrink-0">Always Free</span>;
    }
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
      
      {/* Top Coach Announcement Bar */}
      <div className="bg-slate-900 text-slate-100 px-3 sm:px-4 py-1.5 text-[11px] sm:text-xs text-center font-medium flex items-center justify-center gap-1.5 leading-tight">
        <Award className="w-3.5 h-3.5 text-emerald-400 inline shrink-0" />
        <span className="truncate sm:whitespace-normal">Official Assistant by <strong>Coach Manuj Bajaj</strong> — Author of 26 Bestsellers</span>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18 py-2 gap-2 sm:gap-4">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-2.5 sm:gap-3 cursor-pointer min-w-0" onClick={onGoHome}>
            <div className="relative shrink-0">
              <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full overflow-hidden border-2 border-emerald-600 shadow-xs">
                <img 
                  src="https://picsum.photos/seed/manuj_coach/200/200" 
                  alt="Manuj Bajaj" 
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-600 rounded-full border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">✓</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-extrabold text-slate-900 text-sm sm:text-base tracking-tight leading-none truncate">
                  Sales Objection Assistant
                </h1>
                <span className="bg-emerald-50 text-emerald-800 border border-emerald-200 text-[9px] sm:text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold hidden lg:inline">
                  Workspace
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium hidden sm:block truncate">Stab & Twist • 6KLH Methodology</p>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-slate-100 p-1.5 rounded-xl border border-slate-200 shrink-0">
            <button
              onClick={() => handleTabClick('assistant')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[36px] ${
                activeTab === 'assistant' 
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-emerald-600" />
              Objection Engine
            </button>

            <button
              onClick={() => handleTabClick('wallet')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[36px] ${
                activeTab === 'wallet' 
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Wallet className="w-3.5 h-3.5 text-emerald-600" />
              Token Ledger
            </button>

            <button
              onClick={() => handleTabClick('training')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[36px] ${
                activeTab === 'training' 
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <Video className="w-3.5 h-3.5 text-emerald-600" />
              Video Training (RAG)
            </button>

            <button
              onClick={() => handleTabClick('pricing')}
              className={`px-3 sm:px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 min-h-[36px] ${
                activeTab === 'pricing' 
                  ? 'bg-white text-emerald-800 shadow-xs border border-slate-200/80' 
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
              Plans & Pricing
            </button>
          </nav>

          {/* Right Area: Token Counter & User Profile & Mobile Toggle */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {user ? (
              <>
                {/* Live Token Counter Pill */}
                <button
                  onClick={() => handleTabClick('wallet')}
                  className="group flex items-center gap-1.5 sm:gap-2 bg-emerald-50/90 border border-emerald-200 hover:border-emerald-300 px-2 sm:px-3 py-1.5 rounded-xl transition-all shadow-xs min-h-[36px]"
                  title="Click to view token transaction ledger"
                >
                  <Coins className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-600 group-hover:rotate-12 transition-transform shrink-0" />
                  <div className="text-left">
                    <span className="text-[9px] uppercase tracking-wider text-slate-500 block leading-none font-bold hidden xs:block">Tokens</span>
                    <span className="text-[11px] sm:text-xs font-black text-emerald-800 font-mono leading-tight">
                      {user.token_balance?.toLocaleString() || 0}
                    </span>
                  </div>
                </button>

                {/* Plan Badge (Desktop only) */}
                <div className="hidden xl:block cursor-pointer" onClick={() => handleTabClick('pricing')}>
                  {getPlanBadge(user.plan)}
                </div>

                {/* Desktop Home and Logout */}
                <div className="hidden sm:flex items-center gap-1.5 border-l border-slate-200 pl-2">
                  <button
                    onClick={onGoHome}
                    className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors text-xs font-medium flex items-center gap-1"
                    title="Back to Landing Page"
                  >
                    <Home className="w-4 h-4" />
                  </button>

                  <button
                    onClick={logout}
                    className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                    title="Sign Out"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>

                {/* Mobile Menu Hamburger Button */}
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  className="md:hidden p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-xl transition-colors min-h-[40px] min-w-[40px] flex items-center justify-center border border-slate-200"
                  aria-label="Toggle Navigation Menu"
                >
                  {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
                </button>
              </>
            ) : (
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={onGoHome}
                  className="text-xs font-semibold text-slate-600 hover:text-slate-900 px-2.5 sm:px-3 py-2 rounded-lg"
                >
                  Home
                </button>
                <button
                  onClick={onOpenAuth}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs px-3.5 sm:px-4 py-2 rounded-xl transition-all shadow-xs flex items-center gap-1 min-h-[38px]"
                >
                  <User className="w-3.5 h-3.5" />
                  <span>Sign In</span>
                </button>
              </div>
            )}
          </div>

        </div>

        {/* Mobile Dropdown Menu Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 py-3 pb-4 space-y-1.5 animate-in slide-in-from-top-2 duration-200">
            <div className="px-2 py-1 flex items-center justify-between text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">
              <span>Navigation</span>
              {user && <div>{getPlanBadge(user.plan)}</div>}
            </div>

            <button
              onClick={() => handleTabClick('assistant')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 min-h-[44px] ${
                activeTab === 'assistant'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Zap className="w-4 h-4 text-emerald-600" />
              <span>Objection Engine</span>
            </button>

            <button
              onClick={() => handleTabClick('wallet')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 min-h-[44px] ${
                activeTab === 'wallet'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span>Token Ledger & Wallet</span>
            </button>

            <button
              onClick={() => handleTabClick('training')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 min-h-[44px] ${
                activeTab === 'training'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <Video className="w-4 h-4 text-emerald-600" />
              <span>Video Training (RAG)</span>
            </button>

            <button
              onClick={() => handleTabClick('pricing')}
              className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-2.5 min-h-[44px] ${
                activeTab === 'pricing'
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                  : 'text-slate-700 hover:bg-slate-100'
              }`}
            >
              <CreditCard className="w-4 h-4 text-emerald-600" />
              <span>Plans & Pricing</span>
            </button>

            <div className="pt-2 border-t border-slate-200 mt-2 flex items-center justify-between gap-2 px-1">
              <button
                onClick={() => { onGoHome(); setMobileMenuOpen(false); }}
                className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl flex items-center justify-center gap-1.5 min-h-[40px]"
              >
                <Home className="w-4 h-4 text-slate-500" />
                <span>Product Home</span>
              </button>

              {user && (
                <button
                  onClick={() => { logout(); setMobileMenuOpen(false); }}
                  className="flex-1 py-2 px-3 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-xl flex items-center justify-center gap-1.5 min-h-[40px]"
                >
                  <LogOut className="w-4 h-4 text-rose-500" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>

          </div>
        )}

      </div>
    </header>
  );
}

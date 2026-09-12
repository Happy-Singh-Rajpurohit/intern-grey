import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  Check, 
  Menu, 
  X, 
  Calculator, 
  ChevronRight, 
  Award,
  Video,
  Layers,
  Coins
} from 'lucide-react';

export default function LandingPage({ onLaunchApp, onOpenLogin, onSelectPlan }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (hash) => {
    setMobileMenuOpen(false);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* Top Banner */}
      <div className="bg-emerald-700 text-white text-[11px] sm:text-xs py-2 px-3 sm:px-4 text-center font-medium leading-tight">
        <span>🏆 Official Sales Intelligence System by <strong>Coach Manuj Bajaj</strong> — Author of 26 Bestsellers</span>
      </div>

      {/* Navigation Bar */}
      <header className="bg-white/90 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
          
          {/* Logo & Coach Badge */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer min-w-0" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-emerald-600 shadow-xs shrink-0">
              <img 
                src="https://picsum.photos/seed/manuj_coach/200/200" 
                alt="Manuj Bajaj" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="font-bold text-slate-900 text-sm sm:text-base tracking-tight leading-tight truncate">
                  Sales Objection Assistant
                </span>
                <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[9px] sm:text-[10px] font-bold px-1.5 sm:px-2 py-0.5 rounded-full uppercase shrink-0 hidden xs:inline">
                  by Manuj Bajaj
                </span>
              </div>
              <p className="text-[11px] text-slate-500 font-medium hidden sm:block truncate">Stab & Twist • 6KLH Methodology</p>
            </div>
          </div>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs lg:text-sm font-semibold text-slate-600">
            <button onClick={() => handleNavClick('#features')} className="hover:text-emerald-600 transition-colors">How It Works</button>
            <button onClick={() => handleNavClick('#methodology')} className="hover:text-emerald-600 transition-colors">6KLH Method</button>
            <button onClick={() => handleNavClick('#pricing')} className="hover:text-emerald-600 transition-colors">Pricing & Plans</button>
            <button onClick={() => handleNavClick('#about')} className="hover:text-emerald-600 transition-colors">About the Coach</button>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            <button
              onClick={onOpenLogin}
              className="text-xs sm:text-sm font-semibold text-slate-700 hover:text-slate-900 px-2.5 sm:px-3.5 py-2 rounded-xl transition-colors min-h-[38px]"
            >
              Sign In
            </button>

            <button
              onClick={onLaunchApp}
              className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3.5 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-xs hover:shadow transition-all flex items-center gap-1.5 min-h-[38px]"
            >
              <span>Launch App</span>
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-slate-600 hover:text-slate-900 rounded-lg border border-slate-200 min-h-[38px] min-w-[38px] flex items-center justify-center"
              aria-label="Toggle Navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-slate-200 bg-white px-4 py-3 pb-4 space-y-2 animate-in slide-in-from-top-2">
            <button
              onClick={() => handleNavClick('#features')}
              className="w-full text-left py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>How It Works</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('#methodology')}
              className="w-full text-left py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>6KLH Method</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('#pricing')}
              className="w-full text-left py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>Pricing & Plans (4 Tiers)</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
            <button
              onClick={() => handleNavClick('#about')}
              className="w-full text-left py-2 px-3 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-lg flex items-center justify-between"
            >
              <span>About Coach Manuj Bajaj</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="pt-10 sm:pt-16 pb-14 sm:pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center relative overflow-hidden">
        <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
          
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] sm:text-xs font-bold px-3 sm:px-4 py-1.5 rounded-full shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
            <span>Trained on Video Transcripts & 26 Books</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight leading-[1.15]">
            Turn Tough Sales Objections into <span className="text-emerald-700">Immediate Closes</span>
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto font-normal leading-relaxed px-1">
            Stop losing deals to <em>"Budget nahi hai"</em> or <em>"Diwali baad dekhenge"</em>. Deploy Coach Manuj Bajaj's battle-tested <strong>Stab & Twist</strong> framework and <strong>6KLH</strong> cash leakage arithmetic to prove the brutal cost of buyer inaction.
          </p>

          {/* Action CTAs */}
          <div className="pt-3 sm:pt-4 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              onClick={onLaunchApp}
              className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 min-h-[48px] group"
            >
              <span>Start Free 1-Month Trial</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => handleNavClick('#pricing')}
              className="w-full sm:w-auto bg-white hover:bg-slate-100 text-slate-800 font-bold text-sm sm:text-base px-6 sm:px-7 py-3.5 sm:py-4 rounded-xl border border-slate-200 transition-all flex items-center justify-center gap-2 shadow-xs min-h-[48px]"
            >
              <span>View All 4 Tiers</span>
              <ChevronRight className="w-4 h-4 text-slate-400" />
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pt-4 sm:pt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs text-slate-500 font-medium">
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>50,000 Free Trial Tokens</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>No Credit Card Required</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Grounded on Real Video Lessons</span>
            </div>
          </div>

        </div>

        {/* Hero Interactive Preview Card */}
        <div className="mt-10 sm:mt-16 max-w-5xl mx-auto bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-xl text-left relative">
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 sm:pb-6 border-b border-slate-100 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="bg-emerald-100 text-emerald-800 text-[9px] sm:text-[10px] font-bold px-2 py-0.5 rounded uppercase">Live Output Preview</span>
                <span className="text-[11px] sm:text-xs text-slate-500">Scenario: Industrial IoT System for Manufacturing Units</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-1">Objection: "Bhaiya budget nahi hai, 30% discount do tabhi baat banegi!"</h3>
            </div>
            <button 
              onClick={onLaunchApp}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200 flex items-center gap-1 shrink-0 self-start sm:self-center min-h-[34px]"
            >
              <span>Try In Your Industry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mt-5 sm:mt-6">
            {/* Stab Box */}
            <div className="bg-rose-50/70 border-l-4 border-rose-500 p-4 sm:p-5 rounded-r-2xl">
              <span className="text-[11px] sm:text-xs font-bold text-rose-700 uppercase tracking-wider block mb-1">
                🗡️ Step 1: The STAB (Exposing Current Bleeding)
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                "Aap 30% discount maang rahe hain taaki ₹3 Lakh bachein, lekin factory dispatch aur inventory reconciliation mismatch se aapka <strong>₹2.5 Lakh har mahine silently leak</strong> ho raha hai!"
              </p>
            </div>

            {/* Twist Box */}
            <div className="bg-amber-50/70 border-l-4 border-amber-500 p-4 sm:p-5 rounded-r-2xl">
              <span className="text-[11px] sm:text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                🌀 Step 2: The TWIST (Cost of 6–12 Month Delay)
              </span>
              <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                "Agar agle 6 mahine me yeh leak control nahi kiya, toh <strong>₹15 Lakh se zyada net profit</strong> khatam ho jayega. Aaj ₹3 Lakh bachaane ke chakkar me salana ₹15 Lakh gawana Lala dhandhe ki sabse badi galti hai!"
              </p>
            </div>
          </div>

          {/* 6KLH Formula Strip */}
          <div className="mt-4 sm:mt-5 bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl p-3.5 sm:p-4">
            <span className="text-[11px] sm:text-xs font-bold text-slate-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <span>⏱️</span> 6KLH Breakdown Grounding:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 text-xs">
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block mb-0.5 text-[10px] sm:text-xs">KAB-KAB</span>
                <span className="text-slate-800 font-semibold text-[11px] sm:text-xs">Har shift transition & monthly GST audit ke waqt</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-slate-400 font-bold block mb-0.5 text-[10px] sm:text-xs">KAHAN-KAHAN</span>
                <span className="text-slate-800 font-semibold text-[11px] sm:text-xs">Factory weighing balance aur dispatch logbook me</span>
              </div>
              <div className="bg-white p-3 rounded-xl border border-slate-200">
                <span className="text-emerald-700 font-bold block mb-0.5 text-[10px] sm:text-xs">KITNA-KITNA</span>
                <span className="text-emerald-700 font-black text-xs sm:text-sm">₹1.8 Lakh lost monthly</span>
              </div>
            </div>
          </div>

        </div>

        {/* Social Proof Stats */}
        <div className="mt-10 sm:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6 pt-8 sm:pt-12 border-t border-slate-200">
          <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-4xl font-black text-slate-900 font-mono">10,000+</span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium block mt-0.5 sm:mt-1">Business Owners Coached</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-4xl font-black text-emerald-700 font-mono">26</span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium block mt-0.5 sm:mt-1">Amazon Bestseller Books</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-4xl font-black text-slate-900 font-mono">100%</span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium block mt-0.5 sm:mt-1">Buyer Token Accounted</span>
          </div>

          <div className="p-3 sm:p-4 bg-white rounded-xl sm:rounded-2xl border border-slate-200 shadow-xs">
            <span className="text-2xl sm:text-4xl font-black text-emerald-700 font-mono">4 Tiers</span>
            <span className="text-[11px] sm:text-xs text-slate-500 font-medium block mt-0.5 sm:mt-1">Free to Lifetime Ownership</span>
          </div>
        </div>

      </section>

      {/* How It Works Section */}
      <section id="features" className="py-14 sm:py-20 bg-white border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Simple 3-Step Process
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Engineered for Real-World Closing Scenarios
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Generic AI gives robotic polite replies that get sales reps ignored. Coach Manuj Bajaj's system arms you with psychological leverage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
            
            {/* Step 1 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-700 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-base sm:text-lg mb-4 sm:mb-6">
                  1
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Input Your Deal Context</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Enter your product or service, target industry (e.g. textile, pharma, SaaS), ticket size, and the exact objections prospects throw at you.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Preset chips for 1-click setup</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-700 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-base sm:text-lg mb-4 sm:mb-6">
                  2
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Video Transcript Grounding</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Our RAG pipeline matches your situation against hours of Coach Manuj's webinars and coaching transcripts to pull out his exact words and analogies.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>Retrieval-Augmented Generation</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-100 text-emerald-700 rounded-xl sm:rounded-2xl flex items-center justify-center font-black text-base sm:text-lg mb-4 sm:mb-6">
                  3
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">Deploy Stab, Twist & 6KLH</h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Receive structured scripts, high-ticket buyer fear answers, and live rupee delay calculations you can immediately share over WhatsApp or PDF.
                </p>
              </div>
              <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200 text-xs font-semibold text-emerald-700 flex items-center gap-1">
                <span>1-Click WhatsApp & PDF export</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Methodology Section */}
      <section id="methodology" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
          
          <div className="space-y-4 sm:space-y-6">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              The 6KLH Secret
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight leading-tight">
              "Numbers Do Not Negotiate." <br />
              <span className="text-emerald-700">The 6KLH Leakage Formula</span>
            </h2>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Traditional Indian promoters ("Lala mindset") operate with extreme risk aversion and default negotiating tactics ("Bhav-taav"). When you talk about features, they ask for a discount.
            </p>
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              When you use 6KLH arithmetic, you demonstrate that delaying the decision costs them ten times more than the total cost of your solution.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">K1</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">KAB-KAB (When does money leak?)</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Pinpoint specific operational time triggers like shift transitions, GST reconciliation, or seasonal audit deadlines.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">K2</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">KAHAN-KAHAN (Where does the loss happen?)</h4>
                  <p className="text-xs text-slate-600 mt-0.5">Identify physical and digital leakage points: dispatch gates, manual ledger entries, or customer support disputes.</p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 bg-white border border-slate-200 rounded-xl">
                <span className="w-7 h-7 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">K3</span>
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-slate-900">KITNA-KITNA (How much hard cash is lost?)</h4>
                  <p className="text-xs text-slate-600 mt-0.5">State exact rupee (₹) values. For example: "₹1.5 Lakh per month in delayed invoicing", wiping out negotiations.</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Visual: Calculator Mock */}
          <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-xl space-y-4 sm:space-y-6">
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-900 flex items-center gap-2 text-sm sm:text-base">
                <Calculator className="w-5 h-5 text-emerald-600" />
                <span>Cost of Inaction Calculator</span>
              </h3>
              <span className="text-[10px] sm:text-xs text-emerald-700 font-bold bg-emerald-50 px-2.5 py-1 rounded-full">
                Built-in Tool
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4 text-xs">
              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Deal / Investment Value:</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">₹10,00,000 (₹10 Lakh)</span>
              </div>

              <div className="p-3.5 sm:p-4 bg-slate-50 rounded-xl sm:rounded-2xl border border-slate-200 flex justify-between items-center">
                <span className="text-slate-600 font-medium">Monthly Leakage (15%):</span>
                <span className="text-xs sm:text-sm font-bold text-slate-900 font-mono">₹1,50,000 / month</span>
              </div>

              <div className="p-4 sm:p-5 bg-rose-50 border border-rose-200 rounded-xl sm:rounded-2xl space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-rose-700 uppercase">4-Month Prospect Delay Loss</span>
                <div className="text-xl sm:text-3xl font-black text-rose-800 font-mono">
                  ₹6,00,000 (₹6 Lakh Lost)
                </div>
                <p className="text-[10px] sm:text-[11px] text-rose-700/80">
                  Total cash drained from the business if the prospect says "Diwali baad dekhenge".
                </p>
              </div>

              <div className="p-4 sm:p-5 bg-emerald-50 border border-emerald-200 rounded-xl sm:rounded-2xl space-y-1">
                <span className="text-[10px] sm:text-xs font-bold text-emerald-800 uppercase">Annual Preventable Loss</span>
                <div className="text-xl sm:text-3xl font-black text-emerald-700 font-mono">
                  ₹18,00,000 (₹18 Lakh Recovered)
                </div>
                <p className="text-[10px] sm:text-[11px] text-emerald-800/80">
                  Direct net profit returned to the owner by installing the system today.
                </p>
              </div>
            </div>

            <button
              onClick={onLaunchApp}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 sm:py-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 min-h-[44px]"
            >
              <span>Calculate For Your Deals In The App</span>
              <ArrowRight className="w-4 h-4" />
            </button>

          </div>

        </div>

      </section>

      {/* Pricing Section (4 Tiers) */}
      <section id="pricing" className="py-14 sm:py-20 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16 space-y-2 sm:space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
              Transparent Monetization
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-950 tracking-tight">
              Predictable Plans. Fair Token Accounting.
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Tokens are consumed directly from the subscriber's account. Choose between a free trial, recurring subscription, or a one-time perpetual pass.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            
            {/* Plan 1: Always Free */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Always Free</h3>
                <p className="text-xs text-slate-500 mt-0.5">Explore the core features</p>

                <div className="my-4 sm:my-6 pb-4 sm:pb-6 border-b border-slate-200">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹0</span>
                  <span className="text-xs text-slate-500 font-normal"> / forever</span>
                  <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                    🪙 5,000 tokens / month
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6 sm:mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>~3 full objection reports/mo</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Basic Stab & Twist scripts</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>6KLH leakage formulas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Standard support</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan('always_free')}
                className="w-full bg-white hover:bg-slate-100 text-slate-800 font-bold py-2.5 sm:py-3 rounded-xl border border-slate-300 text-xs transition-colors min-h-[42px]"
              >
                Activate Free Plan
              </button>
            </div>

            {/* Plan 2: Free 1-Month Trial */}
            <div className="bg-slate-50 border-2 border-emerald-500/50 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-sm relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Zero Risk Trial
              </span>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">1-Month Trial</h3>
                <p className="text-xs text-slate-500 mt-0.5">30-day full evaluation</p>

                <div className="my-4 sm:my-6 pb-4 sm:pb-6 border-b border-slate-200">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹0</span>
                  <span className="text-xs text-slate-500 font-normal"> / 30 days</span>
                  <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                    🪙 50,000 tokens grant
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6 sm:mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>~25 comprehensive reports</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Video transcript RAG grounding</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>6KLH Inaction Calculator</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>WhatsApp & PDF report export</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan('free_trial')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 rounded-xl text-xs transition-colors shadow-xs min-h-[42px]"
              >
                Start 1-Month Trial
              </button>
            </div>

            {/* Plan 3: Monthly Pro */}
            <div className="bg-white border-2 border-emerald-600 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-lg relative">
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[9px] sm:text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-xs">
                Most Popular
              </span>

              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">Monthly Pro</h3>
                <p className="text-xs text-slate-500 mt-0.5">For active sales reps & SDRs</p>

                <div className="my-4 sm:my-6 pb-4 sm:pb-6 border-b border-slate-200">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹2,999</span>
                  <span className="text-xs text-slate-500 font-normal"> / month</span>
                  <div className="mt-2 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg inline-block">
                    🪙 250,000 tokens / month
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6 sm:mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>~125 reports auto-renewed</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Priority RAG search pipeline</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Custom buyer persona tuning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Cancel or downgrade anytime</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan('monthly')}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2.5 sm:py-3 rounded-xl text-xs transition-colors shadow-sm min-h-[42px]"
              >
                Upgrade to Monthly Pro
              </button>
            </div>

            {/* Plan 4: One-Time Lifetime */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-6 flex flex-col justify-between shadow-xs hover:border-slate-300 transition-all">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900">One-Time Lifetime</h3>
                <p className="text-xs text-slate-500 mt-0.5">No recurring fees ever</p>

                <div className="my-4 sm:my-6 pb-4 sm:pb-6 border-b border-slate-200">
                  <span className="text-2xl sm:text-3xl font-black text-slate-900 font-mono">₹9,999</span>
                  <span className="text-xs text-slate-500 font-normal"> one-time</span>
                  <div className="mt-2 text-xs font-bold text-amber-800 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg inline-block">
                    🪙 750,000 unexpiring tokens
                  </div>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 mb-6 sm:mb-8">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>~375 reports lifetime pool</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>All present & future video libraries</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Commercial client rights</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Direct priority roadmap input</span>
                  </li>
                </ul>
              </div>

              <button
                onClick={() => onSelectPlan('one_time')}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-2.5 sm:py-3 rounded-xl text-xs transition-colors shadow-xs min-h-[42px]"
              >
                Get Lifetime Pass
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* About Coach Manuj Bajaj */}
      <section id="about" className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-12 shadow-xl flex flex-col md:flex-row items-center gap-6 sm:gap-8">
          <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-emerald-500 shadow-xl shrink-0">
            <img 
              src="https://picsum.photos/seed/manuj_coach/400/400" 
              alt="Coach Manuj Bajaj"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] sm:text-xs font-bold uppercase px-3 py-1 rounded-full">
              <Award className="w-4 h-4 shrink-0" />
              <span>Sales Master Coach Credentials</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black tracking-tight">
              Coach Manuj Bajaj
            </h3>
            <p className="text-slate-300 text-xs sm:text-base max-w-2xl leading-relaxed">
              With 15+ years of sales coaching experience across India, author of 26 bestselling sales and business books, and trusted mentor to 10,000+ enterprise founders. This application was built to bring his live masterclass teachings to every salesperson's pocket.
            </p>
            <div className="pt-2 flex flex-wrap gap-2 sm:gap-4 text-xs text-emerald-300 font-semibold justify-center md:justify-start">
              <span>🏆 26 Amazon Bestsellers</span>
              <span className="hidden sm:inline">•</span>
              <span>👥 10,000+ Business Owners</span>
              <span className="hidden sm:inline">•</span>
              <span>💼 15+ Years Enterprise Sales</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-xs text-slate-500 text-center sm:text-left">
          <div className="flex items-center gap-2 font-semibold text-slate-800">
            <span>Sales Objection Assistant SaaS</span>
            <span>•</span>
            <span className="text-emerald-700">Coach Manuj Bajaj</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
            <button onClick={() => handleNavClick('#features')} className="hover:text-slate-900">Features</button>
            <button onClick={() => handleNavClick('#methodology')} className="hover:text-slate-900">Methodology</button>
            <button onClick={() => handleNavClick('#pricing')} className="hover:text-slate-900">Pricing</button>
            <button onClick={onOpenLogin} className="hover:text-slate-900 font-semibold">Sign In</button>
          </div>

          <p>© 2026 Manuj Bajaj Sales Systems. All rights reserved.</p>
        </div>
      </footer>

    </div>
  );
}

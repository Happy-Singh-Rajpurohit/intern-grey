import React, { useState } from 'react';
import { Sparkles, Coins, Briefcase, Building, Layers, DollarSign, Users, FileText, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function ObjectionForm({ onGenerate, loading, onOpenPricing }) {
  const { user } = useAuth();

  const [product, setProduct] = useState('');
  const [targetIndustry, setTargetIndustry] = useState('');
  const [businessModel, setBusinessModel] = useState('B2B');
  const [dealSize, setDealSize] = useState('₹5 Lakh–₹20 Lakh');
  const [buyerProfile, setBuyerProfile] = useState('Business owner / entrepreneur');
  const [additionalContext, setAdditionalContext] = useState('');
  const [validationError, setValidationError] = useState('');

  const businessModels = ['B2B', 'B2C', 'B2B2C', 'Manufacturing', 'Distribution / Retail', 'Institutional / Govt', 'Export / OEM', 'Franchise'];
  const dealSizes = ['Under ₹1 Lakh', '₹1 Lakh–₹5 Lakh', '₹5 Lakh–₹20 Lakh', '₹20 Lakh–₹1 Crore', '₹1 Crore+'];
  const buyerProfiles = ['Business owner / entrepreneur', 'CEO / C-suite', 'Procurement manager', 'Department head / VP', 'Individual consumer'];

  const handleLoadSample = () => {
    setProduct('Automated Warehouse Inventory & Billing IoT System');
    setTargetIndustry('Traditional Indian Auto-Parts Manufacturing');
    setBusinessModel('B2B');
    setDealSize('₹5 Lakh–₹20 Lakh');
    setBuyerProfile('Business owner / entrepreneur');
    setAdditionalContext('Promoters complain of stock shrinkage and delayed reconciliation, but always bargain for 40% discount and say local software works fine.');
    setValidationError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!product.trim() || !targetIndustry.trim()) {
      setValidationError('Please enter both Product/Service and Target Industry.');
      return;
    }

    if (user && user.token_balance < 100) {
      setValidationError('Insufficient tokens! Upgrade your plan or purchase tokens to generate reports.');
      return;
    }

    setValidationError('');
    onGenerate({
      product,
      targetIndustry,
      businessModel,
      dealSize,
      buyerProfile,
      additionalContext
    });
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 sm:p-10 shadow-sm space-y-6 sm:space-y-8">
      
      {/* Header with Sample Loader */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 pb-4 sm:pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-emerald-50 text-emerald-800 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded border border-emerald-200">
              Objection Generator
            </span>
            <span className="text-[11px] sm:text-xs text-slate-500">Grounded via Video RAG</span>
          </div>
          <h2 className="text-lg sm:text-2xl font-black text-slate-900 tracking-tight">
            Configure Your Sales Scenario
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 sm:mt-1">
            Fill in your deal context to generate custom Stab & Twist rebuttals and 6KLH rupee leakage formulas.
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSample}
          className="text-xs bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 px-3 sm:px-3.5 py-2 rounded-xl transition-colors font-bold flex items-center gap-1.5 shrink-0 min-h-[38px]"
        >
          <span>⚡</span>
          <span>Load Live Industry Example</span>
        </button>
      </div>

      {validationError && (
        <div className="p-4 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-2xl flex items-center justify-between gap-2 font-medium">
          <span>{validationError}</span>
          {user && user.token_balance < 100 && (
            <button
              onClick={onOpenPricing}
              className="underline font-bold text-rose-800 hover:text-rose-900"
            >
              Upgrade Plan Now
            </button>
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Row 1: Product & Industry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Briefcase className="w-4 h-4 text-emerald-600" />
              Your Product / Service <span className="text-emerald-600">*</span>
            </label>
            <input
              type="text"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
              placeholder="e.g. Enterprise HRMS Software, Industrial Solar Panels, B2B Logistics..."
              className="w-full bg-slate-50/70 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
              <Building className="w-4 h-4 text-emerald-600" />
              Target Industry / Sector <span className="text-emerald-600">*</span>
            </label>
            <input
              type="text"
              value={targetIndustry}
              onChange={(e) => setTargetIndustry(e.target.value)}
              placeholder="e.g. Textile Mills in Surat, Real Estate Developers, Pharma Distributors..."
              className="w-full bg-slate-50/70 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none"
              required
            />
          </div>
        </div>

        {/* Row 2: Business Model Chips */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-1.5">
            <Layers className="w-4 h-4 text-emerald-600" />
            Business Model
          </label>
          <div className="flex flex-wrap gap-2 sm:gap-2.5">
            {businessModels.map((model) => (
              <button
                key={model}
                type="button"
                onClick={() => setBusinessModel(model)}
                className={`px-2.5 sm:px-3.5 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all border min-h-[36px] flex items-center justify-center ${
                  businessModel === model
                    ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                {model}
              </button>
            ))}
          </div>
        </div>

        {/* Row 3: Deal Size & Buyer Persona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 sm:mb-3 flex items-center gap-1.5">
              <DollarSign className="w-4 h-4 text-emerald-600" />
              Typical Ticket Size (INR)
            </label>
            <div className="flex flex-wrap gap-2">
              {dealSizes.map((size) => (
                <button
                  key={size}
                  type="button"
                  onClick={() => setDealSize(size)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all border min-h-[36px] flex items-center justify-center ${
                    dealSize === size
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs font-bold'
                      : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 sm:mb-3 flex items-center gap-1.5">
              <Users className="w-4 h-4 text-emerald-600" />
              Primary Buyer Profile
            </label>
            <div className="flex flex-wrap gap-2">
              {buyerProfiles.map((buyer) => (
                <button
                  key={buyer}
                  type="button"
                  onClick={() => setBuyerProfile(buyer)}
                  className={`px-2.5 sm:px-3 py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-semibold transition-all border min-h-[36px] flex items-center justify-center ${
                    buyerProfile === buyer
                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300 shadow-xs font-bold'
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  {buyer}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Row 4: Additional Context */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5">
            <FileText className="w-4 h-4 text-emerald-600" />
            Specific Objections or Context <span className="text-slate-400 font-normal lowercase">(optional)</span>
          </label>
          <textarea
            value={additionalContext}
            onChange={(e) => setAdditionalContext(e.target.value)}
            rows="3"
            placeholder="e.g. Clients repeatedly say 'Local vendors do it for half price' or 'Diwali ke baad sochenge'..."
            className="w-full bg-slate-50/70 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl px-4 py-3 text-sm text-slate-900 placeholder-slate-400 transition-all outline-none resize-none"
          />
        </div>

        {/* Submit & Token Indicator */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <Coins className="w-4 h-4 text-emerald-600" />
            <span>Estimated Cost: <strong className="text-slate-800 font-mono">~400–750 tokens</strong> per full report</span>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold px-8 py-3.5 rounded-xl transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            {loading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Generating Sales Defense...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                <span>Generate Objection Intelligence</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );
}

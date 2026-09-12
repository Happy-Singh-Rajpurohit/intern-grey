import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { ArrowLeft, Lock, Mail, User, Sparkles, Check, ShieldCheck } from 'lucide-react';

export default function LoginPage({ onBackToHome, onSuccess }) {
  const { login, register, loginWithDemo } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectTrial, setSelectTrial] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (isRegister) {
        await register(name, email, password, selectTrial);
      } else {
        await login(email, password);
      }
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithDemo();
      if (onSuccess) onSuccess();
    } catch (err) {
      setError('Demo login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col justify-center py-6 sm:py-12 px-3 sm:px-6 lg:px-8">
      
      {/* Back to Home Button */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md px-1 mb-4">
        <button
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors p-2 rounded-lg"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Product Home</span>
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md px-1">
        
        {/* Header & Avatar */}
        <div className="text-center mb-6 sm:mb-8">
          <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden border-2 border-emerald-600 shadow-xs mx-auto mb-2.5 sm:mb-3">
            <img 
              src="https://picsum.photos/seed/manuj_coach/200/200" 
              alt="Manuj Bajaj" 
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            {isRegister ? 'Create Your Account' : 'Sign in to Sales Assistant'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isRegister 
              ? 'Start with 50,000 free trial tokens or always-free tier' 
              : 'Enter your credentials to access your token wallet and saved reports'}
          </p>
        </div>

        {/* Card Container with responsive padding */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 sm:px-10 shadow-lg space-y-5 sm:space-y-6">
          
          {/* Quick Demo Access Button */}
          <button
            type="button"
            onClick={handleQuickDemo}
            disabled={loading}
            className="w-full bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold py-3 px-3.5 rounded-xl text-xs transition-colors flex items-center justify-center gap-2 shadow-xs min-h-[44px]"
          >
            <Sparkles className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="text-center">⚡ Instant Demo Login (50,000 Trial Tokens)</span>
          </button>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-slate-200"></div>
            <span className="flex-shrink mx-3 text-[10px] uppercase text-slate-400 font-bold tracking-wider">Or Use Email</span>
            <div className="flex-grow border-t border-slate-200"></div>
          </div>

          {error && (
            <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-xl font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            {isRegister && (
              <div>
                <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                  Full Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your Name"
                    className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition-all"
                    required
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition-all"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-600 focus:ring-1 focus:ring-emerald-600 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-900 placeholder-slate-400 outline-none transition-all"
                  required
                />
              </div>
            </div>

            {isRegister && (
              <label className="flex items-center gap-2 text-slate-700 text-xs pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  checked={selectTrial}
                  onChange={(e) => setSelectTrial(e.target.checked)}
                  className="rounded accent-emerald-600 w-4 h-4"
                />
                <span>Include <strong>Free 1-Month Trial</strong> with 50,000 tokens</span>
              </label>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded-xl transition-all shadow-sm hover:shadow text-xs flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : isRegister ? (
                'Create Account & Get Tokens'
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Toggle between Login and Register */}
          <div className="pt-2 text-center text-xs text-slate-500 border-t border-slate-100">
            {isRegister ? (
              <span>
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(false); setError(''); }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Sign In
                </button>
              </span>
            ) : (
              <span>
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => { setIsRegister(true); setError(''); }}
                  className="text-emerald-700 font-bold hover:underline"
                >
                  Create Account (Free Trial)
                </button>
              </span>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}

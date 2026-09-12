import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { X, Lock, Mail, User, Sparkles, ShieldCheck } from 'lucide-react';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, loginWithDemo } = useAuth();
  const [isRegister, setIsRegister] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectTrial, setSelectTrial] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

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
      onClose();
    } catch (err) {
      setError(err.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickDemo = async () => {
    setLoading(true);
    setError('');
    try {
      await loginWithDemo();
      onClose();
    } catch (err) {
      setError('Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative">
        
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-white bg-slate-800 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-3">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-white">
            {isRegister ? 'Create Subscriber Account' : 'Welcome Back'}
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            {isRegister 
              ? 'Start with 50,000 free trial tokens or always-free tier' 
              : 'Sign in to access your token wallet and custom reports'}
          </p>
        </div>

        {/* 1-Click Quick Demo Login Button */}
        <button
          type="button"
          onClick={handleQuickDemo}
          disabled={loading}
          className="w-full mb-5 bg-gradient-to-r from-emerald-950 to-slate-800 hover:from-emerald-900 hover:to-slate-700 border border-emerald-500/40 text-emerald-300 font-bold py-2.5 px-4 rounded-xl text-xs transition-all flex items-center justify-center gap-2 shadow-sm"
        >
          <Sparkles className="w-4 h-4 text-emerald-400" />
          <span>Instant Demo Login (50,000 Trial Tokens Preloaded)</span>
        </button>

        <div className="relative flex py-2 items-center mb-4">
          <div className="flex-grow border-t border-slate-800"></div>
          <span className="flex-shrink mx-3 text-[10px] uppercase text-slate-500 font-semibold tracking-wider">Or Email Login</span>
          <div className="flex-grow border-t border-slate-800"></div>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          {isRegister && (
            <div>
              <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your Name"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-emerald-500 outline-none"
                  required
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@company.com"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 font-bold uppercase tracking-wider mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-3" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-10 pr-3.5 py-2.5 text-slate-100 placeholder-slate-500 focus:border-emerald-500 outline-none"
                required
              />
            </div>
          </div>

          {isRegister && (
            <label className="flex items-center gap-2 text-slate-300 text-[11px] pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={selectTrial}
                onChange={(e) => setSelectTrial(e.target.checked)}
                className="rounded accent-emerald-500 w-4 h-4"
              />
              <span>Activate <strong>Free 1-Month Trial</strong> with 50,000 bonus tokens</span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 rounded-xl transition-all shadow-md shadow-emerald-600/30 flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {loading ? (
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : isRegister ? (
              'Create Account'
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        <div className="mt-5 text-center text-xs text-slate-400">
          {isRegister ? (
            <span>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(false); setError(''); }}
                className="text-emerald-400 font-bold hover:underline"
              >
                Sign In
              </button>
            </span>
          ) : (
            <span>
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => { setIsRegister(true); setError(''); }}
                className="text-emerald-400 font-bold hover:underline"
              >
                Create Account
              </button>
            </span>
          )}
        </div>

      </div>
    </div>
  );
}

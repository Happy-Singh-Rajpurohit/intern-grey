import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Coins, Zap, History, TrendingDown, TrendingUp, ArrowUpRight, ShieldCheck } from 'lucide-react';

export default function TokenWallet({ onOpenPricing }) {
  const { user, tokenHistory } = useAuth();

  const getPlanDetails = (plan) => {
    switch (plan) {
      case 'monthly':
        return { name: 'Monthly Pro Subscription', limit: 250000, color: 'text-emerald-800' };
      case 'one_time':
        return { name: 'One-Time Lifetime Pass', limit: 750000, color: 'text-amber-800' };
      case 'free_trial':
        return { name: 'Free 1-Month Trial Pass', limit: 50000, color: 'text-blue-800' };
      default:
        return { name: 'Always Free Tier', limit: 5000, color: 'text-slate-800' };
    }
  };

  const planInfo = getPlanDetails(user?.plan);
  const percentUsed = Math.min(100, Math.round(((planInfo.limit - (user?.token_balance || 0)) / planInfo.limit) * 100));
  const estimatedReports = Math.floor((user?.token_balance || 0) / 500);

  return (
    <div className="space-y-8">
      
      {/* Wallet Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Card 1: Balance */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Live Token Balance</span>
            <div className="p-2 bg-emerald-50 text-emerald-600 rounded-xl border border-emerald-200">
              <Coins className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <span className="text-2xl sm:text-4xl font-black text-slate-900 font-mono">
              {user?.token_balance?.toLocaleString() || 0}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              Active tokens available in your subscriber wallet
            </span>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 flex items-center justify-between text-xs">
            <span className="text-slate-500">Reports remaining:</span>
            <span className="text-emerald-700 font-bold font-mono">~{estimatedReports} reports</span>
          </div>
        </div>

        {/* Card 2: Subscription Plan */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Subscription</span>
            <div className="p-2 bg-blue-50 text-blue-600 rounded-xl border border-blue-200">
              <Zap className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <span className={`text-lg sm:text-xl font-black ${planInfo.color}`}>
              {planInfo.name}
            </span>
            <span className="text-xs text-slate-500 block mt-1">
              {user?.plan === 'free_trial' && user?.trial_expires_at
                ? `Expires on: ${new Date(user.trial_expires_at).toLocaleDateString()}`
                : 'Auto-replenishes every billing cycle'}
            </span>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100">
            <button
              onClick={onOpenPricing}
              className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 group"
            >
              <span>Change / Upgrade Plan</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* Card 3: Token Quota Meter */}
        <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Tier Capacity</span>
            <div className="p-2 bg-amber-50 text-amber-600 rounded-xl border border-amber-200">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-3 sm:mt-4">
            <div className="flex justify-between text-xs text-slate-500 mb-2 font-mono">
              <span>{user?.token_balance?.toLocaleString()} left</span>
              <span>{planInfo.limit.toLocaleString()} max</span>
            </div>
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
              <div 
                className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.max(5, Math.min(100, 100 - percentUsed))}%` }}
              />
            </div>
            <span className="text-[11px] text-slate-500 block mt-2">
              Subscriber-side accounting guarantees zero surprise API bills.
            </span>
          </div>
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-100 text-[11px] text-slate-400">
            Fair usage enforced atomically
          </div>
        </div>

      </div>

      {/* Transaction History Table */}
      <div className="bg-white border border-slate-200 rounded-2xl sm:rounded-3xl p-4 sm:p-8 shadow-sm">
        <div className="flex items-center justify-between mb-4 sm:mb-6 pb-3 sm:pb-4 border-b border-slate-100">
          <div>
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              Token Ledger Audit Trail
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Every token deduction and top-up is recorded with full audit transparency
            </p>
          </div>
        </div>

        {tokenHistory.length === 0 ? (
          <div className="p-8 sm:p-12 text-center text-slate-400 text-xs">
            No token transactions recorded yet.
          </div>
        ) : (
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full text-left text-xs min-w-[500px]">
              <thead className="bg-slate-50 text-slate-600 font-bold uppercase tracking-wider border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 rounded-l-xl">Date & Time</th>
                  <th className="py-3 px-4">Activity Description</th>
                  <th className="py-3 px-4 text-right">Tokens</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Balance After</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {tokenHistory.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-3.5 px-4 text-slate-500 font-mono whitespace-nowrap">
                      {new Date(tx.created_at).toLocaleString('en-IN', {
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </td>
                    <td className="py-3.5 px-4 text-slate-900 font-semibold">
                      {tx.reason}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold whitespace-nowrap">
                      {tx.amount < 0 ? (
                        <span className="text-rose-600 flex items-center justify-end gap-1">
                          <TrendingDown className="w-3.5 h-3.5" />
                          {tx.amount.toLocaleString()}
                        </span>
                      ) : (
                        <span className="text-emerald-700 flex items-center justify-end gap-1">
                          <TrendingUp className="w-3.5 h-3.5" />
                          +{tx.amount.toLocaleString()}
                        </span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono text-slate-700 font-bold">
                      {tx.balance_after?.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
}

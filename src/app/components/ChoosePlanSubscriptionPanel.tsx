import { Clock, History, Loader2, RefreshCw, ShieldCheck } from 'lucide-react';
import { useState } from 'react';

import type { SubscriptionMeResult } from '../api/subscription-api';
import {
  activePlanTitle,
  formatPaymentRow,
  paymentStatusColor,
  planStatusLabel,
} from '../lib/subscription-display';

type TabKey = 'plan' | 'history';

type ChoosePlanSubscriptionPanelProps = {
  data: SubscriptionMeResult | null;
  loading: boolean;
  onRefresh: () => void;
};

export function ChoosePlanSubscriptionPanel({
  data,
  loading,
  onRefresh,
}: ChoosePlanSubscriptionPanelProps) {
  const [activeTab, setActiveTab] = useState<TabKey>('plan');

  const entitlements = data?.entitlements;
  const subscription = data?.subscription;
  const payments = data?.payments ?? [];
  const isActive = Boolean(entitlements?.fullAccess);

  return (
    <section className="mt-8 w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab('plan')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'plan'
                ? 'bg-[#00a897] text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            <ShieldCheck className="size-3.5" />
            My Plan
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('history')}
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
              activeTab === 'history'
                ? 'bg-[#00a897] text-white shadow-sm'
                : 'bg-white text-slate-600 ring-1 ring-slate-200 hover:bg-slate-50'
            }`}
          >
            <History className="size-3.5" />
            History
          </button>
        </div>

        <button
          type="button"
          onClick={onRefresh}
          disabled={loading}
          className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-60"
        >
          {loading ? (
            <Loader2 className="size-3.5 animate-spin" />
          ) : (
            <RefreshCw className="size-3.5" />
          )}
          Refresh
        </button>
      </div>

      {loading && !data ? (
        <div className="flex items-center justify-center py-10">
          <Loader2 className="size-6 animate-spin text-[#00a897]" />
        </div>
      ) : activeTab === 'plan' ? (
        <div className="pt-4">
          <div
            className={`rounded-xl border p-4 ${
              isActive ? 'border-emerald-200 bg-emerald-50/50' : 'border-slate-200 bg-white'
            }`}
          >
            {isActive ? (
              <span className="inline-flex rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                Active
              </span>
            ) : null}
            <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-500">
              Current plan
            </p>
            <p className="mt-1 text-xl font-bold text-slate-950">
              {activePlanTitle(entitlements, subscription)}
            </p>
            <p className="mt-1 text-sm text-slate-600">{planStatusLabel(entitlements)}</p>
            {subscription?.expires_at ? (
              <p className="mt-2 inline-flex items-center gap-1.5 text-sm text-slate-600">
                <Clock className="size-4 text-[#00a897]" />
                Valid till {String(subscription.expires_at).slice(0, 10)}
              </p>
            ) : null}
          </div>
        </div>
      ) : (
        <div className="pt-4">
          {payments.length === 0 ? (
            <p className="rounded-xl border border-dashed border-slate-200 bg-white px-4 py-8 text-center text-sm text-slate-500">
              No payments yet. Your transactions will appear here after checkout.
            </p>
          ) : (
            <ul className="space-y-2">
              {payments.map((item) => {
                const row = formatPaymentRow(item);
                return (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900">{row.plan}</p>
                      <p className="text-xs text-slate-500">{row.date} · {row.gateway}</p>
                      {row.gatewayStatus ? (
                        <p className="text-xs text-slate-500">Gateway: {row.gatewayStatus}</p>
                      ) : null}
                      <p className="truncate text-xs text-slate-400">Payment id: {row.txn}</p>
                    </div>
                    <p className="text-sm font-bold text-slate-900">{row.amount}</p>
                    <span
                      className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-semibold ${paymentStatusColor(item)}`}
                    >
                      {row.status}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}

export function ActivePlanBadge({ planType }: { planType: 'trial_2day' | 'yearly' }) {
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
      {planType === 'trial_2day' ? 'Your trial' : 'Your plan'}
    </span>
  );
}

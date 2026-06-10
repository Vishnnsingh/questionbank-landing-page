import { formatInr } from './plan-catalog';
import type { PaymentHistoryItem, SubscriptionEntitlements, SubscriptionInfo } from '../api/subscription-api';

export function activePlanTitle(
  entitlements?: SubscriptionEntitlements | null,
  subscription?: SubscriptionInfo | null,
) {
  if (entitlements?.fullAccess && entitlements.tier === 'trial_2day') {
    return '2-Day Trial';
  }
  if (entitlements?.fullAccess && entitlements.tier === 'yearly') {
    const cls = subscription?.class_plan === '12' ? '12' : '10';
    return `Class ${cls} — 1 Year`;
  }
  if (entitlements?.status === 'expired') {
    return 'Plan expired';
  }
  return 'No active plan';
}

export function planStatusLabel(entitlements?: SubscriptionEntitlements | null) {
  if (entitlements?.fullAccess) return 'Full access unlocked in app';
  if (entitlements?.status === 'expired') return 'Renew to continue full access';
  return 'Subscribe to unlock the app';
}

export function paymentPlanLabel(planType: string) {
  if (planType === 'trial_2day') return '2-Day Trial';
  if (planType === 'yearly') return 'Yearly Plan';
  return planType;
}

export function paymentStatusColor(status: string) {
  const key = String(status || '').toLowerCase();
  if (key === 'paid') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (key === 'failed' || key === 'cancelled') return 'text-red-700 bg-red-50 border-red-200';
  return 'text-slate-600 bg-slate-50 border-slate-200';
}

export function formatPaymentRow(item: PaymentHistoryItem) {
  return {
    plan: paymentPlanLabel(item.plan_type),
    amount: formatInr(Number(item.amount_inr || 0)),
    date: item.created_at ? String(item.created_at).slice(0, 10) : '—',
    status: item.status_label || item.status,
    gateway: item.gateway || (item.payment_provider === 'cashfree' ? 'Cashfree' : 'Razorpay'),
    txn: item.transaction_id || '—',
  };
}

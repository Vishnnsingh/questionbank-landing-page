import { formatInr } from './plan-catalog';
import type { PaymentHistoryItem, SubscriptionEntitlements, SubscriptionInfo } from '../api/subscription-api';
import { paymentStateFromRow, paymentStatusLabel as gatewayPaymentLabel } from './payment-gateway-status';

export function activePlanTitle(
  entitlements?: SubscriptionEntitlements | null,
  subscription?: SubscriptionInfo | null,
) {
  if (entitlements?.fullAccess && entitlements.tier === 'trial_2day') {
    const left = entitlements.trialDaysLeft;
    if (left != null) return `Trial — ${left} day${left === 1 ? '' : 's'} left`;
    return 'Trial';
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
  if (planType === 'trial_2day') return 'Trial';
  if (planType === 'yearly') return 'Yearly Plan';
  return planType;
}

export function paymentStatusColor(item: PaymentHistoryItem | string) {
  const state =
    typeof item === 'string'
      ? item.toLowerCase() === 'paid'
        ? 'success'
        : item.toLowerCase() === 'failed' || item.toLowerCase() === 'cancelled'
          ? 'failed'
          : 'pending'
      : paymentStateFromRow(item);
  if (state === 'success') return 'text-emerald-700 bg-emerald-50 border-emerald-200';
  if (state === 'failed') return 'text-red-700 bg-red-50 border-red-200';
  return 'text-amber-700 bg-amber-50 border-amber-200';
}

export function formatPaymentRow(item: PaymentHistoryItem) {
  const gatewayStatus = item.gateway_status ? String(item.gateway_status).toUpperCase() : '';
  return {
    plan: paymentPlanLabel(item.plan_type),
    amount: formatInr(Number(item.amount_inr || 0)),
    date: item.transaction_at || item.created_at
      ? new Date(item.transaction_at || item.created_at).toLocaleString('en-IN', {
          timeZone: 'Asia/Kolkata',
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        })
      : '—',
    status: gatewayPaymentLabel(item),
    gatewayStatus,
    gateway: item.gateway || (item.payment_provider === 'cashfree' ? 'Cashfree' : 'Razorpay'),
    txn: item.transaction_id || '—',
    txnLabel:
      item.cashfree_payment_id || item.razorpay_payment_id
        ? 'Payment id'
        : item.cashfree_order_id || item.razorpay_order_id
          ? 'Order id'
          : 'Reference id',
  };
}

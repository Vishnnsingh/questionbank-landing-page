import type { PaymentHistoryItem, WebVerifyResult } from '../api/subscription-api';

export type PaymentUiState = 'success' | 'failed' | 'pending';

export function paymentStateFromRow(row?: PaymentHistoryItem | null): PaymentUiState {
  if (!row) return 'pending';
  if (row.payment_state === 'success' || row.payment_state === 'failed' || row.payment_state === 'pending') {
    return row.payment_state;
  }
  const gateway = String(row.gateway_status || '').trim().toUpperCase();
  if (
    gateway === 'FAILED' ||
    gateway === 'CANCELLED' ||
    gateway === 'CANCELED' ||
    gateway === 'EXPIRED' ||
    gateway === 'REFUND' ||
    gateway === 'REFUNDED' ||
    gateway === 'USER_DROPPED'
  ) {
    return 'failed';
  }
  if (gateway === 'PAID' || gateway === 'SUCCESS' || gateway === 'CAPTURED') {
    return 'success';
  }
  const status = String(row.status || '').toLowerCase();
  if (status === 'paid') return 'success';
  if (status === 'failed' || status === 'cancelled') return 'failed';
  return 'pending';
}

export function paymentStatusLabel(row?: PaymentHistoryItem | null): string {
  const gateway = String(row?.gateway_status || '').trim().toUpperCase();
  const db = String(row?.status || '').toLowerCase();
  // Cashfree + Razorpay open unpaid → Pending; expired → Failed.
  if (
    gateway === 'ACTIVE' ||
    gateway === 'CREATED' ||
    gateway === 'PENDING' ||
    (db === 'created' && gateway !== 'EXPIRED')
  ) {
    return 'Pending';
  }
  if (gateway === 'EXPIRED') return 'Failed';
  if (row?.status_label) {
    const label = String(row.status_label).toLowerCase();
    if (label === 'active' || label === 'created' || label === 'pending') return 'Pending';
    if (label === 'expired') return 'Failed';
    return row.status_label;
  }
  if (gateway === 'REFUND' || gateway === 'REFUNDED') return 'Refunded';
  if (gateway === 'CANCELLED' || gateway === 'CANCELED' || gateway === 'USER_DROPPED') {
    return 'Cancelled';
  }
  if (
    gateway === 'PROCESSING' ||
    gateway === 'ATTEMPTED' ||
    gateway === 'BANK_APPROVAL_PENDING'
  ) {
    return 'Processing';
  }
  const state = paymentStateFromRow(row);
  if (state === 'success') return 'Success';
  if (state === 'failed') return 'Failed';
  return 'Pending';
}

export function gatewayStatusMessage(gatewayStatus: string, paymentState: PaymentUiState): string {
  const gw = String(gatewayStatus || '').trim().toUpperCase();
  if (paymentState === 'success') {
    return gw ? `Payment successful (${gw}).` : 'Payment successful.';
  }
  if (paymentState === 'failed') {
    if (gw === 'CANCELLED' || gw === 'CANCELED') {
      return 'Payment cancelled. No charge was completed.';
    }
    if (gw === 'EXPIRED') return 'Payment session expired. Please try again.';
    return gw ? `Payment failed (${gw}).` : 'Payment failed. Please try again.';
  }
  return gw
    ? gw === 'ACTIVE'
      ? 'Payment is pending. Complete checkout to finish…'
      : `Payment is ${gw.toLowerCase().replace(/_/g, ' ')}. Please wait…`
    : 'Payment is still processing. Please wait…';
}

export function resolveVerifyFeedback(result: WebVerifyResult) {
  // Webhook already activated — treat as success (never error).
  if (result.already_paid && result.payment_state !== 'failed') {
    const gw = result.gateway_status || result.order_status || result.subscription_status || 'PAID';
    return {
      state: 'success' as const,
      gatewayStatus: gw,
      message: result.message || gatewayStatusMessage(gw, 'success'),
    };
  }

  if (result.payment_state) {
    const state = result.payment_state;
    const gw = result.gateway_status || result.order_status || result.subscription_status || '';
    return {
      state,
      gatewayStatus: gw,
      message: result.message || gatewayStatusMessage(gw, state),
    };
  }

  if (result.pending) {
    const gw = result.gateway_status || result.order_status || result.subscription_status || '';
    return {
      state: 'pending' as const,
      gatewayStatus: gw,
      message: result.message || gatewayStatusMessage(gw, 'pending'),
    };
  }

  // Do not treat existing fullAccess as this checkout succeeding —
  // that caused Failed/Refunded Cashfree payments to show as Success.
  const gw = result.gateway_status || result.order_status || result.subscription_status || '';
  return {
    state: 'pending' as const,
    gatewayStatus: gw,
    message: result.message || gatewayStatusMessage(gw, 'pending'),
  };
}

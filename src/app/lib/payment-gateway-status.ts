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
  if (row?.status_label) return row.status_label;
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
    ? `Payment is ${gw.toLowerCase().replace(/_/g, ' ')}. Please wait…`
    : 'Payment is still processing. Please wait…';
}

export function resolveVerifyFeedback(result: WebVerifyResult) {
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

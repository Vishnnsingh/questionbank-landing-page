import {
  apiClient,
  authHeaders,
  getApiErrorMessage,
  type ApiPayload,
} from './client';

export type WebCheckoutResult = {
  checkout_mode: 'cashfree_web';
  payment_provider: 'cashfree';
  order_id: string;
  payment_session_id: string;
  cashfree_mode: 'sandbox' | 'production';
  amount_paise: number;
  amount_inr: number;
  plan_type: 'trial_2day' | 'yearly';
  payment_id: string;
  description: string;
};

export type WebVerifyResult = {
  pending?: boolean;
  order_status?: string;
  message?: string;
  subscription?: {
    status?: string;
    plan_type?: string;
    expires_at?: string;
  };
};

export async function createWebCheckout(
  accessToken: string,
  planType: 'trial_2day' | 'yearly',
): Promise<WebCheckoutResult> {
  try {
    const { data } = await apiClient.post<ApiPayload<WebCheckoutResult>>(
      '/api/v1/web-payments/checkout',
      { plan_type: planType },
      { headers: authHeaders(accessToken) },
    );
    const checkout = data?.data;
    if (!checkout?.payment_session_id || !checkout?.order_id) {
      throw new Error('Invalid checkout response.');
    }
    return checkout;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not start payment.'));
  }
}

export async function verifyWebPayment(
  accessToken: string,
  orderId: string,
): Promise<WebVerifyResult> {
  try {
    const { data } = await apiClient.post<ApiPayload<WebVerifyResult>>(
      '/api/v1/web-payments/verify',
      { order_id: orderId },
      { headers: authHeaders(accessToken) },
    );
    return data?.data ?? {};
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Payment verification failed.'));
  }
}

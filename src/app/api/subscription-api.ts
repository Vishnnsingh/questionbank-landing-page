import {
  apiClient,
  authHeaders,
  getApiErrorMessage,
  type ApiPayload,
} from './client';
import type { PlanCatalog } from '../lib/plan-catalog';

export type WebCheckoutResult = {
  checkout_mode: 'cashfree_web' | 'cashfree_subscription';
  payment_provider: 'cashfree';
  order_id?: string;
  subscription_id?: string;
  payment_session_id?: string;
  auth_link?: string | null;
  cashfree_mode: 'sandbox' | 'production';
  amount_paise: number;
  amount_inr: number;
  plan_type: 'trial_2day' | 'yearly';
  payment_id: string;
  description: string;
  recurring?: boolean;
};

export type SubscriptionEntitlements = {
  tier?: string;
  fullAccess?: boolean;
  autoRenew?: boolean;
  status?: string;
  planType?: string;
  classPlan?: string | null;
  expiresAt?: string | null;
  trialDaysLeft?: number | null;
  yearlyDaysLeft?: number | null;
};

export type SubscriptionInfo = {
  plan_type?: string;
  status?: string;
  class_plan?: string | null;
  started_at?: string | null;
  expires_at?: string | null;
  auto_renew?: boolean;
};

export type PaymentHistoryItem = {
  id: string;
  plan_type: string;
  amount_inr: number;
  status: string;
  status_label: string;
  payment_state?: 'success' | 'failed' | 'pending';
  gateway_status?: string;
  payment_provider?: string;
  gateway?: string;
  transaction_id?: string | null;
  created_at?: string;
};

export type SubscriptionMeResult = {
  entitlements: SubscriptionEntitlements;
  subscription: SubscriptionInfo | null;
  catalog?: PlanCatalog;
  payments: PaymentHistoryItem[];
};

export type WebVerifyResult = {
  pending?: boolean;
  payment_state?: 'success' | 'failed' | 'pending';
  gateway_status?: string;
  order_status?: string;
  subscription_status?: string;
  message?: string;
  entitlements?: SubscriptionEntitlements;
  subscription?: SubscriptionInfo;
  payments?: PaymentHistoryItem[];
};

export type PublicPlansCatalogResult = {
  class: '10' | '12';
  settings?: Record<string, unknown>;
  catalog: PlanCatalog;
};

export async function fetchPublicPlansCatalog(classValue: string): Promise<PublicPlansCatalogResult> {
  try {
    const cls = String(classValue || '').replace(/\D/g, '') === '12' ? '12' : '10';
    const { data } = await apiClient.get<ApiPayload<PublicPlansCatalogResult>>(
      '/api/v1/user-app/subscriptions/plans-catalog',
      { params: { class: cls } },
    );
    const payload = data?.data;
    if (!payload?.catalog) {
      throw new Error('Invalid plan catalog response.');
    }
    return payload;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load plan catalog.'));
  }
}

export async function fetchSubscriptionMe(accessToken: string): Promise<SubscriptionMeResult> {
  try {
    const { data } = await apiClient.get<ApiPayload<SubscriptionMeResult>>(
      '/api/v1/user-app/subscriptions/me',
      { headers: authHeaders(accessToken) },
    );
    const payload = data?.data;
    if (!payload?.entitlements) {
      throw new Error('Invalid subscription response.');
    }
    return {
      entitlements: payload.entitlements,
      subscription: payload.subscription ?? null,
      catalog: payload.catalog ?? undefined,
      payments: Array.isArray(payload.payments) ? payload.payments : [],
    };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load subscription.'));
  }
}

export async function updateAutoRenew(
  accessToken: string,
  autoRenew: boolean,
): Promise<SubscriptionMeResult> {
  // Auto-payment temporarily disabled
  void accessToken;
  void autoRenew;
  throw new Error('Auto-payment is temporarily unavailable.');
  /*
  try {
    const { data } = await apiClient.patch<ApiPayload<SubscriptionMeResult>>(
      '/api/v1/user-app/subscriptions/auto-renew',
      { auto_renew: autoRenew },
      { headers: authHeaders(accessToken) },
    );
    const payload = data?.data;
    if (!payload?.entitlements) {
      throw new Error('Invalid auto-renew response.');
    }
    return {
      entitlements: payload.entitlements,
      subscription: payload.subscription ?? null,
      catalog: payload.catalog ?? undefined,
      payments: Array.isArray(payload.payments) ? payload.payments : [],
    };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not update auto-pay.'));
  }
  */
}

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
    const hasOrder = checkout?.payment_session_id && checkout?.order_id;
    const hasSubscription = checkout?.auth_link || checkout?.subscription_id;
    if (!hasOrder && !hasSubscription) {
      throw new Error('Invalid checkout response.');
    }
    return checkout;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not start payment.'));
  }
}

export async function verifyWebPayment(
  accessToken: string,
  params: { orderId?: string; subscriptionId?: string },
): Promise<WebVerifyResult> {
  try {
    const { data } = await apiClient.post<ApiPayload<WebVerifyResult>>(
      '/api/v1/web-payments/verify',
      {
        order_id: params.orderId,
        subscription_id: params.subscriptionId,
      },
      { headers: authHeaders(accessToken) },
    );
    return data?.data ?? {};
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Payment verification failed.'));
  }
}

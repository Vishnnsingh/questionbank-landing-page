import type { PlanType } from './plan-catalog';

const PAYMENT_USER_KEY = 'Prepmagic_payment_user';
const PLAN_KEY = 'Prepmagic_selected_plan';
const PENDING_LOGIN_EMAIL_KEY = 'Prepmagic_pending_login_email';

export type PaymentUserContext = {
  class: '10' | '12';
  fullName: string;
  email: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: number;
};

export type SelectedPlanContext = {
  planType: PlanType;
  class: '10' | '12';
};

export function savePaymentUserContext(context: PaymentUserContext) {
  sessionStorage.setItem(PAYMENT_USER_KEY, JSON.stringify(context));
}

export function updatePaymentTokens(tokens: {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}) {
  const current = readPaymentUserContext();
  if (!current) return;
  savePaymentUserContext({
    ...current,
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
    expiresAt: tokens.expiresAt,
  });
}

export function clearPaymentUserContext() {
  sessionStorage.removeItem(PAYMENT_USER_KEY);
}

export function clearSelectedPlan() {
  sessionStorage.removeItem(PLAN_KEY);
}

export function clearPaymentSession() {
  clearPaymentUserContext();
  clearSelectedPlan();
}

export function readPaymentUserContext(): PaymentUserContext | null {
  try {
    const raw = sessionStorage.getItem(PAYMENT_USER_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PaymentUserContext;
    if (!parsed?.class || !parsed?.email) return null;
    return parsed;
  } catch {
    return null;
  }
}

/** @deprecated use savePaymentUserContext */
export function saveSignupContext(context: Omit<PaymentUserContext, 'accessToken' | 'refreshToken'>) {
  savePaymentUserContext(context);
}

/** @deprecated use readPaymentUserContext */
export function readSignupContext(): PaymentUserContext | null {
  return readPaymentUserContext();
}

export function saveSelectedPlan(context: SelectedPlanContext) {
  sessionStorage.setItem(PLAN_KEY, JSON.stringify(context));
}

export function readSelectedPlan(): SelectedPlanContext | null {
  try {
    const raw = sessionStorage.getItem(PLAN_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as SelectedPlanContext;
  } catch {
    return null;
  }
}

export function savePendingLoginEmail(email: string) {
  sessionStorage.setItem(PENDING_LOGIN_EMAIL_KEY, email.trim().toLowerCase());
}

export function readPendingLoginEmail(): string {
  return sessionStorage.getItem(PENDING_LOGIN_EMAIL_KEY) || '';
}

export function clearPendingLoginEmail() {
  sessionStorage.removeItem(PENDING_LOGIN_EMAIL_KEY);
}

const PENDING_ONBOARD_KEY = 'Prepmagic_pending_onboard';

export type PendingOnboardCredentials = {
  email: string;
  password: string;
};

export function savePendingOnboardCredentials(creds: PendingOnboardCredentials) {
  sessionStorage.setItem(
    PENDING_ONBOARD_KEY,
    JSON.stringify({
      email: creds.email.trim().toLowerCase(),
      password: creds.password,
    }),
  );
}

export function readPendingOnboardCredentials(): PendingOnboardCredentials | null {
  try {
    const raw = sessionStorage.getItem(PENDING_ONBOARD_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as PendingOnboardCredentials;
    if (!parsed?.email || !parsed?.password) return null;
    return {
      email: String(parsed.email).trim().toLowerCase(),
      password: String(parsed.password),
    };
  } catch {
    return null;
  }
}

export function clearPendingOnboardCredentials() {
  sessionStorage.removeItem(PENDING_ONBOARD_KEY);
}


import type { AuthMeUser, LoginResult } from '../api/auth-api';
import {
  savePaymentUserContext,
  savePendingOnboardCredentials,
  clearPendingLoginEmail,
} from './signup-context';
import { DEFAULT_TENANT_ID, setSessionTenantId } from './tenant-rbac';

function normalizeClass(value: string | undefined): '10' | '12' {
  return String(value || '').replace(/\D/g, '') === '12' ? '12' : '10';
}

export function profileNeedsOnboarding(profile: AuthMeUser): boolean {
  return profile.onboarding_completed === false;
}

export function saveSessionForPaymentFlow(
  login: Pick<LoginResult, 'accessToken' | 'refreshToken' | 'expiresIn' | 'fullName'>,
  profile: AuthMeUser,
  fallbackEmail?: string,
) {
  const profileEmail = String(profile.email || fallbackEmail || '').trim().toLowerCase();
  savePaymentUserContext({
    class: normalizeClass(profile.class),
    fullName: String(profile.full_name || login.fullName || 'Student').trim(),
    email: profileEmail,
    accessToken: login.accessToken,
    refreshToken: login.refreshToken,
    expiresAt: Date.now() + (login.expiresIn ?? 3600) * 1000,
  });
  setSessionTenantId(DEFAULT_TENANT_ID);
  clearPendingLoginEmail();
}

/** After login + OTP: onboarding first if incomplete, else payment choose-plan. */
export function redirectAfterAuthenticatedLogin(
  login: Pick<LoginResult, 'accessToken' | 'refreshToken' | 'expiresIn' | 'fullName'>,
  profile: AuthMeUser,
  options?: { email?: string; password?: string },
) {
  const email = String(profile.email || options?.email || '').trim().toLowerCase();

  if (profileNeedsOnboarding(profile)) {
    if (email && options?.password) {
      savePendingOnboardCredentials({ email, password: options.password });
    }
    window.location.href = '/onboarding';
    return;
  }

  saveSessionForPaymentFlow(login, profile, options?.email);
  window.location.href = '/choose-plan';
}

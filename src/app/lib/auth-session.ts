import { logoutUser, refreshAccessToken } from '../api/auth-api';
import {
  clearPaymentSession,
  readPaymentUserContext,
  updatePaymentTokens,
} from './signup-context';

const REFRESH_BUFFER_MS = 60_000;

export function hasPaymentAuthSession() {
  const user = readPaymentUserContext();
  return Boolean(user?.accessToken || user?.refreshToken);
}

export async function ensureValidAccessToken(): Promise<string | null> {
  const user = readPaymentUserContext();
  if (!user) return null;
  if (!user.accessToken && !user.refreshToken) return null;

  const expiresAt = user.expiresAt ?? 0;
  const accessStillValid =
    Boolean(user.accessToken) && Date.now() < expiresAt - REFRESH_BUFFER_MS;

  if (accessStillValid && user.accessToken) {
    return user.accessToken;
  }

  if (!user.refreshToken) {
    return user.accessToken ?? null;
  }

  const refreshed = await refreshAccessToken(user.refreshToken);
  updatePaymentTokens({
    accessToken: refreshed.accessToken,
    refreshToken: refreshed.refreshToken,
    expiresAt: Date.now() + (refreshed.expiresIn ?? 3600) * 1000,
  });

  return refreshed.accessToken;
}

export async function performPaymentLogout(): Promise<void> {
  const user = readPaymentUserContext();
  const accessToken = user?.accessToken;

  clearPaymentSession();

  if (accessToken) {
    try {
      await logoutUser(accessToken);
    } catch {
      // Session may already be invalid — local cleanup still applies.
    }
  }

  window.location.href = '/login';
}

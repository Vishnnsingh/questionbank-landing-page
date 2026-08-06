import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { API_BASE } from '../config/env';
import { DEFAULT_TENANT_ID, getSessionTenantId } from '../lib/tenant-rbac';

export { API_BASE };

export type ApiPayload<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

export const apiClient = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const isRetryableNetworkError = (error: unknown) => {
  if (!axios.isAxiosError(error) || error.response) return false;
  const code = String(error.code || '');
  const msg = String(error.message || '').toLowerCase();
  return (
    code === 'ECONNABORTED' ||
    code === 'ERR_NETWORK' ||
    code === 'ETIMEDOUT' ||
    code === 'ECONNRESET' ||
    code === 'ERR_CANCELED' ||
    msg.includes('network error') ||
    msg.includes('timeout') ||
    msg.includes('aborted') ||
    msg.includes('failed to fetch') ||
    msg.includes('socket hang up')
  );
};

/**
 * Auth POSTs: short per-attempt timeout + fresh retries.
 * Avoids Chrome "Queueing / Stalled" hangs behind 6 busy TCP sockets.
 */
export async function withNetworkRetry<T>(
  requestFn: (opts: { timeout: number; headers: Record<string, string> }) => Promise<T>,
  { retries = 3, baseDelayMs = 500, attemptTimeoutMs = 22000 } = {},
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestFn({
        timeout: attemptTimeoutMs,
        headers: {
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache',
          'X-Client-Retry': String(attempt),
        },
      });
    } catch (error) {
      lastError = error;
      if (!isRetryableNetworkError(error) || attempt === retries) {
        throw error;
      }
      await sleep(baseDelayMs * (attempt + 1) + Math.floor(Math.random() * 200));
    }
  }
  throw lastError;
}

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config as
      | (AxiosRequestConfig & { __retryCount?: number })
      | undefined;
    if (!config || !isRetryableNetworkError(error)) {
      return Promise.reject(error);
    }
    const count = config.__retryCount || 0;
    if (count >= 3) {
      return Promise.reject(error);
    }
    config.__retryCount = count + 1;
    // Prefer a fresh shorter timeout on retries (stalled sockets / Wi‑Fi change)
    config.timeout = 22000;
    config.headers = {
      ...(config.headers || {}),
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'X-Client-Retry': String(count + 1),
    };
    await sleep(500 * (count + 1));
    return apiClient.request(config);
  },
);

apiClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  const token =
    typeof config.headers.Authorization === 'string'
      ? config.headers.Authorization.replace(/^Bearer\s+/i, '').trim()
      : '';
  if (token) {
    config.headers['X-Tenant-Id'] = getSessionTenantId() || DEFAULT_TENANT_ID;
  }
  return config;
});

export function getApiErrorMessage(error: unknown, fallback: string) {
  if (axios.isAxiosError(error)) {
    const payload = error.response?.data as ApiPayload | undefined;
    if (payload?.message) return String(payload.message);
    if (isRetryableNetworkError(error)) {
      return 'Network timeout. Check Wi‑Fi / mobile data and try again.';
    }
    if (error.message) return error.message;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

export function authHeaders(accessToken: string) {
  return {
    Authorization: `Bearer ${accessToken}`,
    'X-Tenant-Id': getSessionTenantId() || DEFAULT_TENANT_ID,
  };
}

export type { AxiosError };

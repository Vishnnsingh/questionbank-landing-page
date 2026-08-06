import axios, { type AxiosError, type AxiosRequestConfig } from 'axios';
import { API_BASE, API_BASE_CANDIDATES } from '../config/env';
import { DEFAULT_TENANT_ID, getSessionTenantId } from '../lib/tenant-rbac';

export { API_BASE };

export type ApiPayload<T = unknown> = {
  success?: boolean;
  message?: string;
  data?: T;
};

let baseIndex = 0;

function currentBase(): string {
  const list = API_BASE_CANDIDATES.length
    ? API_BASE_CANDIDATES
    : [API_BASE];
  return list[baseIndex % list.length] || API_BASE;
}

function rotateBase(): string {
  if (API_BASE_CANDIDATES.length <= 1) return currentBase();
  baseIndex = (baseIndex + 1) % API_BASE_CANDIDATES.length;
  const next = currentBase();
  apiClient.defaults.baseURL = next;
  return next;
}

export const apiClient = axios.create({
  baseURL: currentBase(),
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
    msg.includes('timed out') ||
    msg.includes('aborted') ||
    msg.includes('failed to fetch') ||
    msg.includes('socket hang up')
  );
};

/**
 * Auth POSTs: short attempts + rotate API host (Vercel proxy ↔ direct VPS).
 */
export async function withNetworkRetry<T>(
  requestFn: (opts: {
    timeout: number;
    headers: Record<string, string>;
    baseURL: string;
  }) => Promise<T>,
  { retries = 4, baseDelayMs = 400, attemptTimeoutMs = 20000 } = {},
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      return await requestFn({
        timeout: attemptTimeoutMs,
        baseURL: currentBase(),
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
      rotateBase();
      await sleep(baseDelayMs * (attempt + 1) + Math.floor(Math.random() * 150));
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
    config.timeout = 20000;
    config.baseURL = rotateBase();
    config.headers = {
      ...(config.headers || {}),
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache',
      'X-Client-Retry': String(count + 1),
    };
    await sleep(400 * (count + 1));
    return apiClient.request(config);
  },
);

apiClient.interceptors.request.use((config) => {
  config.headers = config.headers || {};
  config.baseURL = config.baseURL || currentBase();
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

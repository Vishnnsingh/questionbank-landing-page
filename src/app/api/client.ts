import axios, { type AxiosError } from 'axios';
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
    msg.includes('network error') ||
    msg.includes('timeout')
  );
};

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const config = error?.config as
      | (typeof error.config & { __retryCount?: number })
      | undefined;
    if (!config || !isRetryableNetworkError(error)) {
      return Promise.reject(error);
    }
    const count = config.__retryCount || 0;
    if (count >= 2) {
      return Promise.reject(error);
    }
    config.__retryCount = count + 1;
    await sleep(700 * (count + 1));
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

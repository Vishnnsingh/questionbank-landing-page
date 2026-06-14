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
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

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

import axios, { type AxiosError } from 'axios';

export const API_BASE = (import.meta.env.VITE_API_BASE_URL || 'http://localhost:5001').replace(
  /\/+$/,
  '',
);

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
  };
}

export type { AxiosError };

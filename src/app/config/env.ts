function readEnv(name: string): string {
  return String(import.meta.env[name] ?? '').trim();
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

const LOOPBACK = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

/** Production API — never fall back to localhost in deploy builds. */
const PRODUCTION_API_BASE = 'https://api.prepmagic.in';
const PRODUCTION_SITE_URL = 'https://prepmagic.in';

/**
 * When the site is opened via PC LAN IP on a phone (Wi‑Fi), and env still has
 * loopback API, rewrite to page hostname (local dev only).
 * Production .env should set VITE_API_BASE_URL=https://api.prepmagic.in
 */
function resolveApiBase(configured: string): string {
  const raw = stripTrailingSlash(configured || PRODUCTION_API_BASE);
  if (typeof window === 'undefined') return raw;
  try {
    const url = new URL(
      /^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//.test(raw) ? raw : `http://${raw}`,
    );
    const pageHost = String(window.location.hostname || '').toLowerCase();
    const apiHost = String(url.hostname || '').toLowerCase();
    if (LOOPBACK.has(apiHost) && pageHost && !LOOPBACK.has(pageHost)) {
      url.hostname = pageHost;
      return stripTrailingSlash(url.toString());
    }
  } catch {
    /* keep configured */
  }
  return raw;
}

export const API_BASE = resolveApiBase(
  readEnv('VITE_API_BASE_URL') || PRODUCTION_API_BASE,
);
export const SITE_URL = stripTrailingSlash(
  readEnv('VITE_SITE_URL') || PRODUCTION_SITE_URL,
);
export const SUPPORT_EMAIL =
  readEnv('VITE_SUPPORT_EMAIL') || 'support@prepmagic.in';
export const CASHFREE_SDK_URL =
  readEnv('VITE_CASHFREE_SDK_URL') ||
  'https://sdk.cashfree.com/js/v3/cashfree.js';
export const SCHEMA_ORG_URL = stripTrailingSlash(
  readEnv('VITE_SCHEMA_ORG_URL') || 'https://schema.org',
);

export const SCHEMA_IN_STOCK = `${SCHEMA_ORG_URL}/InStock`;
export const SCHEMA_NEW_CONDITION = `${SCHEMA_ORG_URL}/NewCondition`;

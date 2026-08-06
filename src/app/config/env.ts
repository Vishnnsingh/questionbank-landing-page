function readEnv(name: string): string {
  return String(import.meta.env[name] ?? '').trim();
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

const LOOPBACK = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

const DIRECT_API = 'https://api.prepmagic.in';
const SITE = 'https://prepmagic.in';

/**
 * On production landing host, force same-origin API so the browser never needs
 * the bare VPS IP (which some Wi‑Fi time out). Vercel rewrites /api/* → backend.
 */
function resolveApiBase(configured: string): string {
  if (typeof window !== 'undefined') {
    const pageHost = String(window.location.hostname || '').toLowerCase();
    if (pageHost === 'prepmagic.in' || pageHost === 'www.prepmagic.in') {
      return stripTrailingSlash(window.location.origin);
    }
  }

  const raw = stripTrailingSlash(configured || DIRECT_API);
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
    /* keep */
  }
  return raw;
}

export const API_BASE = resolveApiBase(
  readEnv('VITE_API_BASE_URL') || DIRECT_API,
);

/** Direct backend + same-origin — rotate on connection timeout. */
export const API_BASE_CANDIDATES = (() => {
  const list = [
    API_BASE,
    SITE,
    DIRECT_API,
  ].map(stripTrailingSlash);
  return [...new Set(list.filter(Boolean))];
})();

export const SITE_URL = stripTrailingSlash(
  readEnv('VITE_SITE_URL') || SITE,
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

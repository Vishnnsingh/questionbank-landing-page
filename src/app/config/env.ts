function readEnv(name: string): string {
  return String(import.meta.env[name] ?? '').trim();
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

const LOOPBACK = new Set(['localhost', '127.0.0.1', '0.0.0.0', '::1']);

/**
 * When the site is opened via PC LAN IP on a phone (Wi‑Fi), Vite env still has
 * `http://localhost:5001` — that hits the phone, not the API. Rewrite loopback
 * API host to the page hostname so login works on the same machine/network.
 */
function resolveApiBase(configured: string): string {
  const raw = stripTrailingSlash(configured || 'http://localhost:5001');
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

export const API_BASE = resolveApiBase(readEnv('VITE_API_BASE_URL'));
export const SITE_URL = stripTrailingSlash(readEnv('VITE_SITE_URL'));
export const SUPPORT_EMAIL = readEnv('VITE_SUPPORT_EMAIL');
export const CASHFREE_SDK_URL = readEnv('VITE_CASHFREE_SDK_URL');
export const SCHEMA_ORG_URL = stripTrailingSlash(readEnv('VITE_SCHEMA_ORG_URL'));

export const SCHEMA_IN_STOCK = `${SCHEMA_ORG_URL}/InStock`;
export const SCHEMA_NEW_CONDITION = `${SCHEMA_ORG_URL}/NewCondition`;

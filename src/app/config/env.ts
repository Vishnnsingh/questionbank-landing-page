function readEnv(name: string): string {
  return String(import.meta.env[name] ?? '').trim();
}

function stripTrailingSlash(value: string): string {
  return value.replace(/\/+$/, '');
}

export const API_BASE = stripTrailingSlash(readEnv('VITE_API_BASE_URL'));
export const SITE_URL = stripTrailingSlash(readEnv('VITE_SITE_URL'));
export const SUPPORT_EMAIL = readEnv('VITE_SUPPORT_EMAIL');
export const CASHFREE_SDK_URL = readEnv('VITE_CASHFREE_SDK_URL');
export const SCHEMA_ORG_URL = stripTrailingSlash(readEnv('VITE_SCHEMA_ORG_URL'));

export const SCHEMA_IN_STOCK = `${SCHEMA_ORG_URL}/InStock`;
export const SCHEMA_NEW_CONDITION = `${SCHEMA_ORG_URL}/NewCondition`;

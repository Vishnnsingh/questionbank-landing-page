const TENANT_KEY = 'qb_tenant_id';

export const DEFAULT_TENANT_ID =
  import.meta.env.VITE_DEFAULT_TENANT_ID || 'Prepmagic';

export function getSessionTenantId() {
  return sessionStorage.getItem(TENANT_KEY) || DEFAULT_TENANT_ID;
}

export function setSessionTenantId(tenantId?: string) {
  const value = String(tenantId || '').trim();
  if (value) {
    sessionStorage.setItem(TENANT_KEY, value);
    return;
  }
  sessionStorage.removeItem(TENANT_KEY);
}

export function clearSessionTenant() {
  sessionStorage.removeItem(TENANT_KEY);
}

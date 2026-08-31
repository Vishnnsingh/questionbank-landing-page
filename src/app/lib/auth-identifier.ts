export type AuthIdentifier =
  | { email: string; mobile_number?: never }
  | { mobile_number: string; email?: never };

export type ResetIdentifier = AuthIdentifier & {
  channel: 'email' | 'whatsapp';
};

export function resolveLoginIdentifier(raw: string): AuthIdentifier | null {
  const trimmed = String(raw || '').trim();
  let digits = trimmed.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);

  if (/^[6-9]\d{9}$/.test(digits) && !trimmed.includes('@')) {
    return { mobile_number: digits };
  }
  if (trimmed.includes('@')) {
    return { email: trimmed.toLowerCase() };
  }
  if (/^[6-9]\d{9}$/.test(digits)) {
    return { mobile_number: digits };
  }
  return null;
}

export function resolveResetIdentifier(raw: string): ResetIdentifier | null {
  const login = resolveLoginIdentifier(raw);
  if (!login) return null;
  if ('mobile_number' in login && login.mobile_number) {
    return { mobile_number: login.mobile_number, channel: 'whatsapp' };
  }
  if ('email' in login && login.email) {
    return { email: login.email, channel: 'email' };
  }
  return null;
}

export function looksLikeMobileInput(raw: string): boolean {
  const trimmed = String(raw || '').trim();
  if (trimmed.includes('@')) return false;
  let digits = trimmed.replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);
  return digits.length > 0;
}

export function maskAuthTarget(raw: string, channel: 'email' | 'whatsapp'): string {
  if (channel === 'whatsapp') {
    const digits = String(raw || '').replace(/\D/g, '').slice(-10);
    if (/^[6-9]\d{9}$/.test(digits)) {
      return `+91 ${digits.slice(0, 2)}****${digits.slice(-2)}`;
    }
    return 'your WhatsApp number';
  }
  const email = String(raw || '').trim().toLowerCase();
  return email.replace(/(.{2}).+(@.+)/, '$1***$2') || 'your email';
}

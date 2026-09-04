export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 15;
/** Existing accounts may still be 16 characters. */
export const LOGIN_PASSWORD_MAX_LENGTH = 16;

export const STRONG_PASSWORD_MESSAGE = 'Password must be 6–15 characters.';

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type PasswordChecks = {
  length: boolean;
};

export function isStrongPassword(password: string): boolean {
  const pwd = String(password || '').trim();
  return pwd.length >= PASSWORD_MIN_LENGTH && pwd.length <= PASSWORD_MAX_LENGTH;
}

export function assessPasswordStrength(password: string): {
  strength: PasswordStrength;
  checks: PasswordChecks;
  isValid: boolean;
} {
  const pwd = String(password || '');
  const len = pwd.length;
  const checks: PasswordChecks = {
    length: len >= PASSWORD_MIN_LENGTH && len <= PASSWORD_MAX_LENGTH,
  };

  let strength: PasswordStrength = 'weak';
  if (checks.length && len >= 12) strength = 'strong';
  else if (checks.length && len >= 10) strength = 'medium';

  return { strength, checks, isValid: isStrongPassword(pwd) };
}

export const PASSWORD_RULES = ['6 to 15 characters (letters, numbers, symbols, or mix)'] as const;

export function isValidLoginPassword(password: string): boolean {
  const pwd = String(password || '').trim();
  return pwd.length >= PASSWORD_MIN_LENGTH && pwd.length <= LOGIN_PASSWORD_MAX_LENGTH;
}

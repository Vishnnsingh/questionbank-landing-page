export const PASSWORD_MIN_LENGTH = 8;
export const PASSWORD_MAX_LENGTH = 8;

export const STRONG_PASSWORD_MESSAGE =
  'Password must be exactly 8 characters and include uppercase, lowercase, a number, and a special character';

const STRONG_PASSWORD_PATTERN =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8}$/;

export type PasswordStrength = 'weak' | 'medium' | 'strong';

export type PasswordChecks = {
  length: boolean;
  lower: boolean;
  upper: boolean;
  digit: boolean;
  special: boolean;
};

export function isStrongPassword(password: string): boolean {
  const pwd = String(password || '').trim();
  if (pwd.length !== PASSWORD_MIN_LENGTH) return false;
  return STRONG_PASSWORD_PATTERN.test(pwd);
}

export function assessPasswordStrength(password: string): {
  strength: PasswordStrength;
  checks: PasswordChecks;
  isValid: boolean;
} {
  const pwd = String(password || '');
  const checks: PasswordChecks = {
    length: pwd.length === PASSWORD_MIN_LENGTH,
    lower: /[a-z]/.test(pwd),
    upper: /[A-Z]/.test(pwd),
    digit: /\d/.test(pwd),
    special: /[^A-Za-z0-9]/.test(pwd),
  };

  const passed = Object.values(checks).filter(Boolean).length;
  let strength: PasswordStrength = 'weak';

  if (checks.length && checks.lower && checks.upper && checks.digit && checks.special) {
    strength = 'strong';
  } else if (passed >= 3 && pwd.length >= PASSWORD_MIN_LENGTH) {
    strength = 'medium';
  }

  return { strength, checks, isValid: isStrongPassword(pwd) };
}

export const PASSWORD_RULES = [
  'Exactly 8 characters',
  'One uppercase letter (A–Z)',
  'One lowercase letter (a–z)',
  'One number (0–9)',
  'One special character (!@#$…)',
] as const;

export function isValidLoginPassword(password: string): boolean {
  const pwd = String(password || '').trim();
  return pwd.length === PASSWORD_MIN_LENGTH;
}

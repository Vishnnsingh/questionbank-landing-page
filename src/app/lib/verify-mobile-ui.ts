const RESEND_SECONDS = 60;

export type OtpSendErrorKind = 'cooldown' | 'whatsapp' | 'other';

export function classifyOtpSendError(message: string): OtpSendErrorKind {
  const msg = String(message || '').trim().toLowerCase();
  if (!msg) return 'other';
  if (/wait 1 minute|too many requests|429/.test(msg)) return 'cooldown';
  if (
    /please enter your whatsapp number|not a whatsapp|not registered on whatsapp|undeliverable|incapable of receiving|invalid recipient/i.test(
      msg,
    )
  ) {
    return 'whatsapp';
  }
  return 'other';
}

export function otpSendErrorMessage(kind: OtpSendErrorKind): string {
  if (kind === 'whatsapp') return 'Please enter your WhatsApp number.';
  return 'Please try again.';
}

export { RESEND_SECONDS as VERIFY_MOBILE_RESEND_SECONDS };

export function formatVerifyCountdown(seconds: number) {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

export function authErrorAlertVariant(message: string): 'warning' | 'error' {
  const msg = String(message || '').trim().toLowerCase();
  if (/per day|try again tomorrow|too many requests|429/.test(msg)) {
    return 'warning';
  }
  return 'error';
}

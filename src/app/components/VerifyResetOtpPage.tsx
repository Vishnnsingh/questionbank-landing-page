import { FormEvent, useEffect, useRef, useState } from 'react';
import { ChevronLeft, MessageCircle } from 'lucide-react';

import { forgotPassword, verifyResetOtp } from '../api/auth-api';
import { maskAuthTarget } from '../lib/auth-identifier';
import {
  authErrorAlertVariant,
  classifyOtpSendError,
  formatVerifyCountdown,
  VERIFY_MOBILE_RESEND_SECONDS,
} from '../lib/verify-mobile-ui';
import {
  readPendingResetIdentifier,
  savePasswordResetToken,
  savePendingResetIdentifier,
} from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlertModal,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authCompactInputClass,
} from './auth-ui';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const OTP_SIZE = 6;
const RESEND_SECONDS = VERIFY_MOBILE_RESEND_SECONDS;

function readQuery() {
  const params = new URLSearchParams(window.location.search);
  const channel = params.get('channel') === 'whatsapp' ? 'whatsapp' : 'email';
  return {
    channel: channel as 'email' | 'whatsapp',
    email: String(params.get('email') || '').trim().toLowerCase(),
    mobile: String(params.get('mobile') || '').replace(/\D/g, '').slice(0, 10),
  };
}

export function VerifyResetOtpPage() {
  const query = readQuery();
  const pending = readPendingResetIdentifier();
  const channel = query.channel || pending?.channel || 'email';
  const email = query.email || pending?.email || '';
  const mobile = query.mobile || pending?.mobileNumber || '';
  const viaWhatsApp = channel === 'whatsapp';

  const targetRaw = viaWhatsApp ? mobile : email;
  const maskedTarget = maskAuthTarget(targetRaw, channel);

  const [otp, setOtp] = useState('');
  const [alert, setAlert] = useState<{
    title: string;
    message: string;
    variant: 'error' | 'warning';
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (viaWhatsApp && !/^[6-9]\d{9}$/.test(mobile)) {
      window.location.href = '/forgot-password';
      return;
    }
    if (!viaWhatsApp && !email.includes('@')) {
      window.location.href = '/forgot-password';
    }
  }, [viaWhatsApp, mobile, email]);

  useEffect(() => {
    setOtp('');
    setCountdown(RESEND_SECONDS);
    const focusTimer = window.setTimeout(() => otpInputRef.current?.focus(), 200);
    return () => window.clearTimeout(focusTimer);
  }, [viaWhatsApp, mobile, email]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = window.setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [countdown]);

  const resendOtp = async () => {
    if (isSending || countdown > 0) return;
    setAlert(null);
    try {
      setIsSending(true);
      await forgotPassword(
        viaWhatsApp ? { mobile_number: mobile } : { email },
      );
      setCountdown(RESEND_SECONDS);
      setOtp('');
      window.setTimeout(() => otpInputRef.current?.focus(), 80);
    } catch (err) {
      const raw = err instanceof Error ? err.message : '';
      if (classifyOtpSendError(raw) === 'cooldown') {
        setCountdown(RESEND_SECONDS);
        return;
      }
      const message = err instanceof Error ? err.message : 'Could not resend code.';
      setAlert({
        title: 'Could not resend OTP',
        message,
        variant: authErrorAlertVariant(message),
      });
    } finally {
      setIsSending(false);
    }
  };

  const handleBack = () => {
    window.location.href = '/forgot-password';
  };

  const handleVerify = async (event?: FormEvent) => {
    event?.preventDefault();
    if (isVerifying) return;

    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      setAlert({
        title: 'Invalid OTP',
        message: 'Enter the 6-digit code we sent you.',
        variant: 'warning',
      });
      return;
    }

    setAlert(null);
    setIsVerifying(true);
    try {
      const result = await verifyResetOtp(
        viaWhatsApp
          ? { mobile_number: mobile, otp: code }
          : { email, otp: code },
      );
      savePasswordResetToken(result.reset_token);
      savePendingResetIdentifier({
        email: email || undefined,
        mobileNumber: mobile || undefined,
        channel,
      });
      window.location.href = '/reset-password';
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Verification failed.';
      setAlert({
        title: 'Verification failed',
        message,
        variant: authErrorAlertVariant(message),
      });
    } finally {
      setIsVerifying(false);
    }
  };

  useEffect(() => {
    if (otp.length !== OTP_SIZE || isVerifying) return;
    void handleVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp]);

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="paymentLogin" />
      <SideNav />

      <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto my-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)]">
            <div className="h-1.5 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-3 inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#00a897] shadow-sm transition hover:bg-slate-50"
                  aria-label="Go back"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="mb-4 border-b border-slate-100 pb-4">
                  <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Type the verification code we have sent
                    {viaWhatsApp ? ' to your WhatsApp number' : ' to your email'}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#00a897]">{maskedTarget}</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  {viaWhatsApp ? (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      <MessageCircle className="size-4 text-[#25D366]" />
                      OTP sent on WhatsApp. Enter the 6-digit code below.
                    </div>
                  ) : null}

                  <input
                    ref={otpInputRef}
                    className={`${authCompactInputClass} text-center text-lg tracking-[0.35em]`}
                    value={otp}
                    onChange={(e) =>
                      setOtp(e.target.value.replace(/\D/g, '').slice(0, OTP_SIZE))
                    }
                    placeholder="6-digit OTP"
                    inputMode="numeric"
                    maxLength={OTP_SIZE}
                    autoComplete="one-time-code"
                  />

                  <AuthPrimaryButton loading={isVerifying} loadingText="Verifying…">
                    Verify
                  </AuthPrimaryButton>

                  <button
                    type="button"
                    className="w-full text-center text-xs font-bold text-[#00a897] disabled:opacity-45"
                    onClick={() => void resendOtp()}
                    disabled={isSending || countdown > 0}
                  >
                    {isSending
                      ? 'Sending…'
                      : countdown > 0
                        ? `Resend OTP (${formatVerifyCountdown(countdown)})`
                        : 'Resend OTP'}
                  </button>

                  <AuthFooterLink
                    text="Wrong details?"
                    linkText="Change email or mobile"
                    href="/forgot-password"
                  />
                </form>
              </div>

              <div className="hidden lg:block">
                <AuthLoginVisualPanel embedded />
              </div>
            </div>
          </div>
        </div>
      </main>

      <AuthAlertModal
        open={Boolean(alert)}
        title={alert?.title || ''}
        message={alert?.message || ''}
        variant={alert?.variant || 'error'}
        onClose={() => setAlert(null)}
      />
    </div>
  );
}

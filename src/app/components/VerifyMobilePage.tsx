import { FormEvent, useEffect, useRef, useState } from 'react';
import { MessageCircle, Sparkles, Timer } from 'lucide-react';

import {
  sendMobileOtp,
  verifyLoginMobileOtp,
  verifyMobileOtp,
} from '../api/auth-api';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthPageBackground,
  AuthPrimaryButton,
  authCompactInputClass,
} from './auth-ui';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import {
  clearPendingLoginMobileVerify,
  readPendingLoginMobileVerify,
} from '../lib/signup-context';

const OTP_SIZE = 6;
const RESEND_SECONDS = 60;

function formatCountdown(seconds: number) {
  const s = Math.max(0, seconds);
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}:${String(r).padStart(2, '0')}`;
}

function readQuery() {
  const params = new URLSearchParams(window.location.search);
  return {
    mode: (params.get('mode') || 'signup').toLowerCase(),
    mobile: String(params.get('mobile') || '').replace(/\D/g, '').slice(0, 10),
    email: String(params.get('email') || '').trim().toLowerCase(),
  };
}

export function VerifyMobilePage() {
  const query = readQuery();
  const isLoginMode = query.mode === 'login';
  const pendingLogin = readPendingLoginMobileVerify();
  const mobile = query.mobile || pendingLogin?.mobileNumber || '';

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(RESEND_SECONDS);
  const [initialSent, setInitialSent] = useState(false);
  const sentOnMount = useRef(false);
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  const maskedMobile = mobile
    ? `+91 ${mobile.slice(0, 2)}****${mobile.slice(-2)}`
    : 'your WhatsApp number';

  useEffect(() => {
    if (!mobile || !/^[6-9]\d{9}$/.test(mobile)) {
      window.location.href = isLoginMode ? '/login' : '/signup';
      return;
    }
    if (isLoginMode && !pendingLogin?.loginPendingToken) {
      window.location.href = '/login';
    }
  }, [mobile, isLoginMode, pendingLogin]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = window.setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [countdown]);

  const sendOtp = async ({ force }: { force?: boolean } = {}) => {
    if (isSending || !mobile) return;
    if (!force && countdown > 0 && initialSent) return;

    setError('');
    try {
      setIsSending(true);
      await sendMobileOtp(mobile, 'mobile_verify');
      setInitialSent(true);
      setCountdown(RESEND_SECONDS);
      setTimeout(() => otpInputRef.current?.focus(), 80);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send OTP.');
    } finally {
      setIsSending(false);
    }
  };

  useEffect(() => {
    if (sentOnMount.current || !mobile) return;
    sentOnMount.current = true;
    void sendOtp({ force: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile]);

  const handleVerify = async (event?: FormEvent) => {
    event?.preventDefault();
    if (isVerifying) return;

    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from WhatsApp.');
      return;
    }

    setError('');
    setIsVerifying(true);
    try {
      if (isLoginMode) {
        const token = pendingLogin?.loginPendingToken;
        if (!token) {
          throw new Error('Login session expired. Please sign in again.');
        }
        const login = await verifyLoginMobileOtp({
          loginPendingToken: token,
          mobileNumber: mobile,
          otp: code,
        });
        clearPendingLoginMobileVerify();

        const { fetchAuthMe } = await import('../api/auth-api');
        const { savePaymentUserContext, clearPendingLoginEmail } = await import('../lib/signup-context');
        const { DEFAULT_TENANT_ID, setSessionTenantId } = await import('../lib/tenant-rbac');

        const profile = await fetchAuthMe(login.accessToken);
        savePaymentUserContext({
          class: String(profile.class || '10').replace(/\D/g, '') === '12' ? '12' : '10',
          fullName: String(profile.full_name || login.fullName || 'Student').trim(),
          email: String(profile.email || pendingLogin?.email || '').trim().toLowerCase(),
          accessToken: login.accessToken,
          refreshToken: login.refreshToken,
          expiresAt: Date.now() + (login.expiresIn ?? 3600) * 1000,
        });
        setSessionTenantId(DEFAULT_TENANT_ID);
        clearPendingLoginEmail();
        window.location.href = '/choose-plan';
        return;
      }

      await verifyMobileOtp(mobile, code, 'mobile_verify');
      window.location.href = '/onboarding';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Verification failed.');
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
      <SEO page="signup" />
      <SideNav />

      <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto my-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)]">
            <div className="h-1.5 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />

            <div className="grid lg:grid-cols-[0.95fr_1.05fr]">
              <div className="flex flex-col justify-center px-5 py-5 sm:px-7 sm:py-6 lg:px-8 lg:py-7">
                <div className="mb-4 border-b border-slate-100 pb-4">
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
                    <Sparkles className="size-3.5 text-[#00a897]" />
                    WhatsApp verify
                  </div>
                  <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Verify mobile number
                  </h1>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Type the verification code we have sent to your WhatsApp number
                  </p>
                  <p className="mt-1 text-sm font-bold text-[#00a897]">{maskedMobile}</p>
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

                  {isSending && !initialSent ? (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      <MessageCircle className="size-4 text-[#25D366]" />
                      Sending code on WhatsApp…
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

                  <div className="flex items-center justify-center gap-2 text-xs font-semibold text-slate-600">
                    <Timer className="size-4 text-slate-500" />
                    {countdown > 0
                      ? `Resend available in ${formatCountdown(countdown)}`
                      : 'You can resend the code now'}
                  </div>

                  <AuthPrimaryButton loading={isVerifying} loadingText="Verifying…">
                    Verify
                  </AuthPrimaryButton>

                  <button
                    type="button"
                    className="w-full text-center text-xs font-bold text-[#00a897] disabled:opacity-45"
                    onClick={() => void sendOtp({ force: true })}
                    disabled={isSending || countdown > 0}
                  >
                    {isSending
                      ? 'Sending…'
                      : countdown > 0
                        ? `Resend OTP (${formatCountdown(countdown)})`
                        : 'Resend OTP on WhatsApp'}
                  </button>
                </form>
              </div>

              <div className="hidden lg:block">
                <AuthLoginVisualPanel embedded />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

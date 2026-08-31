import { FormEvent, useCallback, useEffect, useRef, useState } from 'react';
import { ChevronLeft, MessageCircle } from 'lucide-react';

import {
  sendMobileOtp,
  updateVerifyMobileNumber,
  verifyLoginMobileOtp,
  verifyMobileOtp,
} from '../api/auth-api';
import {
  classifyOtpSendError,
  formatVerifyCountdown,
  otpSendErrorMessage,
  VERIFY_MOBILE_RESEND_SECONDS,
} from '../lib/verify-mobile-ui';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthField,
  AuthPageBackground,
  AuthPrimaryButton,
  authCompactInputClass,
} from './auth-ui';
import { SEO } from './SEO';
import { SideNav } from './SideNav';
import {
  clearPendingLoginMobileVerify,
  readPendingLoginMobileVerify,
  savePendingLoginMobileVerify,
} from '../lib/signup-context';

const OTP_SIZE = 6;
const RESEND_SECONDS = VERIFY_MOBILE_RESEND_SECONDS;

function formatIndianMobileInput(text: string) {
  let digits = String(text || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length > 10) digits = digits.slice(1);
  return digits.slice(0, 10);
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

  const initialMobile = query.mobile || pendingLogin?.mobileNumber || '';
  const [mobile, setMobile] = useState(initialMobile);
  const [editMobile, setEditMobile] = useState(initialMobile);
  const [loginToken, setLoginToken] = useState(pendingLogin?.loginPendingToken || '');

  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [countdown, setCountdown] = useState(isLoginMode ? RESEND_SECONDS : 0);
  const [sendFailed, setSendFailed] = useState(false);
  const [otpSent, setOtpSent] = useState(isLoginMode);
  const otpInputRef = useRef<HTMLInputElement | null>(null);
  const sentOnMount = useRef(false);

  const maskedMobile = mobile
    ? `+91 ${mobile.slice(0, 2)}****${mobile.slice(-2)}`
    : 'your WhatsApp number';

  const showOtpInput = otpSent && !sendFailed;

  useEffect(() => {
    if (!initialMobile || !/^[6-9]\d{9}$/.test(initialMobile)) {
      window.location.replace(isLoginMode ? '/login' : '/signup');
      return;
    }
    if (isLoginMode && !readPendingLoginMobileVerify()?.loginPendingToken) {
      window.location.replace('/login');
    }
  }, [initialMobile, isLoginMode]);

  useEffect(() => {
    if (!isLoginMode) return;
    const pending = readPendingLoginMobileVerify();
    if (!pending?.loginPendingToken || !pending?.mobileNumber) return;

    setLoginToken(pending.loginPendingToken);
    setMobile(pending.mobileNumber);
    setEditMobile(pending.mobileNumber);
    setOtpSent(true);
    setSendFailed(false);
    setError('');
    setOtp('');
    setCountdown(RESEND_SECONDS);

    const focusTimer = window.setTimeout(() => otpInputRef.current?.focus(), 200);
    return () => window.clearTimeout(focusTimer);
  }, [isLoginMode]);

  useEffect(() => {
    if (countdown <= 0) return;
    const t = window.setInterval(() => {
      setCountdown((c) => (c > 0 ? c - 1 : 0));
    }, 1000);
    return () => window.clearInterval(t);
  }, [countdown]);

  const persistMobileUpdate = async (nextMobile: string) => {
    if (nextMobile === mobile) return;
    const updated = await updateVerifyMobileNumber({
      new_mobile_number: nextMobile,
      email: isLoginMode ? undefined : query.email || pendingLogin?.email,
      login_pending_token: isLoginMode ? loginToken : undefined,
    });
    setMobile(updated.mobile_number);
    setEditMobile(updated.mobile_number);
    if (updated.login_pending_token) {
      setLoginToken(updated.login_pending_token);
      savePendingLoginMobileVerify({
        loginPendingToken: updated.login_pending_token,
        mobileNumber: updated.mobile_number,
        email: pendingLogin?.email,
        password: pendingLogin?.password,
      });
    }
    const params = new URLSearchParams(window.location.search);
    params.set('mobile', updated.mobile_number);
    window.history.replaceState({}, '', `/verify-mobile?${params.toString()}`);
  };

  const sendOtp = useCallback(
    async (options?: { force?: boolean }) => {
      const force = options?.force ?? false;
      if (isSending) return;
      if (!force && countdown > 0 && otpSent && !sendFailed) return;

      const targetMobile = sendFailed ? formatIndianMobileInput(editMobile) : mobile;

      if (!/^[6-9]\d{9}$/.test(targetMobile)) {
        setError('Please enter a valid 10-digit WhatsApp number.');
        setSendFailed(true);
        setOtpSent(false);
        return;
      }

      setError('');
      setIsSending(true);
      try {
        if (sendFailed || targetMobile !== mobile) {
          await persistMobileUpdate(targetMobile);
        }
        await sendMobileOtp(targetMobile, 'mobile_verify');
        setSendFailed(false);
        setOtpSent(true);
        setCountdown(RESEND_SECONDS);
        setOtp('');
        window.setTimeout(() => otpInputRef.current?.focus(), 80);
      } catch (err) {
        const raw = err instanceof Error ? err.message : '';
        const kind = classifyOtpSendError(raw);
        if (kind === 'cooldown') {
          setCountdown(RESEND_SECONDS);
          setError('');
          if (isLoginMode || otpSent) {
            setOtpSent(true);
            setSendFailed(false);
          }
          return;
        }
        setOtp('');
        setError(otpSendErrorMessage(kind));
        if (kind === 'whatsapp') {
          setSendFailed(true);
          setOtpSent(false);
        }
      } finally {
        setIsSending(false);
      }
    },
    [
      countdown,
      editMobile,
      isLoginMode,
      isSending,
      mobile,
      otpSent,
      sendFailed,
    ],
  );

  useEffect(() => {
    if (isLoginMode) return;
    if (sentOnMount.current || !mobile) return;
    if (!/^[6-9]\d{9}$/.test(mobile)) return;
    sentOnMount.current = true;
    void sendOtp({ force: true });
  }, [isLoginMode, mobile, sendOtp]);

  const handleBack = () => {
    if (isLoginMode) {
      clearPendingLoginMobileVerify();
    }
    window.location.href = isLoginMode ? '/login' : '/signup';
  };

  const handleVerify = async (event?: FormEvent) => {
    event?.preventDefault();
    if (isVerifying || !showOtpInput) return;

    const code = otp.trim();
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit code from WhatsApp.');
      return;
    }

    setError('');
    setIsVerifying(true);
    try {
      if (isLoginMode) {
        const token = loginToken || pendingLogin?.loginPendingToken;
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
        const { redirectAfterAuthenticatedLogin } = await import('../lib/auth-post-login');

        const profile = await fetchAuthMe(login.accessToken);
        redirectAfterAuthenticatedLogin(login, profile, {
          email: pendingLogin?.email || profile.email,
          password: pendingLogin?.password,
        });
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
    if (!showOtpInput || otp.length !== OTP_SIZE || isVerifying) return;
    void handleVerify();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, showOtpInput]);

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
                <button
                  type="button"
                  onClick={handleBack}
                  className="mb-3 inline-flex size-9 items-center justify-center rounded-full border border-slate-200 bg-white text-[#00a897] shadow-sm transition hover:bg-slate-50"
                  aria-label="Go back"
                >
                  <ChevronLeft className="size-5" />
                </button>

                <div className="mb-4 border-b border-slate-100 pb-4">
                  {sendFailed ? (
                    <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                      Please enter your WhatsApp number.
                    </p>
                  ) : (
                    <>
                      <p className="text-xs leading-relaxed text-slate-600 sm:text-sm">
                        Type the verification code we have sent to your WhatsApp number
                      </p>
                      <p className="mt-1 text-sm font-bold text-[#00a897]">{maskedMobile}</p>
                    </>
                  )}
                </div>

                <form onSubmit={handleVerify} className="space-y-4">
                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

                  {sendFailed ? (
                    <AuthField label="WhatsApp number" htmlFor="verify_mobile_edit">
                      <div className="relative">
                        <input
                          id="verify_mobile_edit"
                          type="tel"
                          className={authCompactInputClass}
                          value={editMobile}
                          onChange={(e) =>
                            setEditMobile(formatIndianMobileInput(e.target.value))
                          }
                          placeholder="10-digit WhatsApp number"
                          inputMode="numeric"
                          autoComplete="tel"
                        />
                        <MessageCircle
                          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#25D366]"
                          aria-hidden
                        />
                      </div>
                    </AuthField>
                  ) : null}

                  {isSending ? (
                    <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                      <MessageCircle className="size-4 text-[#25D366]" />
                      Sending code on WhatsApp…
                    </div>
                  ) : null}

                  {showOtpInput ? (
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
                  ) : null}

                  {showOtpInput ? (
                    <AuthPrimaryButton loading={isVerifying} loadingText="Verifying…">
                      Verify
                    </AuthPrimaryButton>
                  ) : null}

                  <button
                    type="button"
                    className="w-full text-center text-xs font-bold text-[#00a897] disabled:opacity-45"
                    onClick={() => void sendOtp({ force: true })}
                    disabled={isSending || countdown > 0}
                  >
                    {isSending
                      ? 'Sending…'
                      : countdown > 0
                        ? `Resend OTP (${formatVerifyCountdown(countdown)})`
                        : sendFailed
                          ? 'Send OTP on WhatsApp'
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

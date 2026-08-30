import { FormEvent, useEffect, useRef, useState } from 'react';
import { CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';

import { registerUser, sendMobileOtp, verifyMobileOtp } from '../api/auth-api';
import { isStrongPassword, STRONG_PASSWORD_MESSAGE } from '../lib/password-policy';
import { savePendingOnboardCredentials } from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authCompactInputClass,
  authFieldLabelClass,
} from './auth-ui';
import { PasswordInput } from './PasswordInput';
import { PasswordStrengthHint } from './PasswordStrengthHint';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const labelClass = authFieldLabelClass;
const signupInputClass = authCompactInputClass;

function formatIndianMobileInput(text: string) {
  let digits = String(text || '').replace(/\D/g, '');
  if (digits.startsWith('91') && digits.length > 10) digits = digits.slice(2);
  if (digits.startsWith('0') && digits.length > 10) digits = digits.slice(1);
  return digits.slice(0, 10);
}

export function SignUpPage() {
  const [fullName, setFullName] = useState('');
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [mobileVerified, setMobileVerified] = useState(false);
  const [mobileVerifyToken, setMobileVerifyToken] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const lastSentMobile = useRef('');
  const otpInputRef = useRef<HTMLInputElement | null>(null);

  const mobile = formatIndianMobileInput(mobileNumber);
  const isValidMobile = /^[6-9]\d{9}$/.test(mobile);
  const showOtpField = otpSent && !mobileVerified;

  const sendOtpToWhatsApp = async (number: string, { force }: { force?: boolean } = {}) => {
    if (isSendingOtp || mobileVerified) return;
    if (!/^[6-9]\d{9}$/.test(number)) return;
    if (!force && lastSentMobile.current === number && otpSent) return;

    setError('');
    setInfo('');
    try {
      setIsSendingOtp(true);
      await sendMobileOtp(number);
      lastSentMobile.current = number;
      setOtpSent(true);
      setOtp('');
      setInfo('OTP sent on WhatsApp. Enter the 6-digit code.');
      setTimeout(() => otpInputRef.current?.focus(), 80);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send OTP. Try again.');
    } finally {
      setIsSendingOtp(false);
    }
  };

  // 10-digit number complete → auto-send WhatsApp OTP
  useEffect(() => {
    if (!isValidMobile || mobileVerified) return;
    if (lastSentMobile.current === mobile && otpSent) return;
    if (isSendingOtp || isVerifyingOtp || isSaving) return;
    const t = window.setTimeout(() => {
      void sendOtpToWhatsApp(mobile);
    }, 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mobile, isValidMobile, mobileVerified]);

  const handleMobileChange = (value: string) => {
    const next = formatIndianMobileInput(value);
    setMobileNumber(next);
    if (next !== lastSentMobile.current) {
      lastSentMobile.current = '';
      setOtpSent(false);
      setOtp('');
      setMobileVerified(false);
      setMobileVerifyToken('');
      setInfo('');
    }
  };

  const handleVerifyOtp = async () => {
    if (isVerifyingOtp || mobileVerified) return;
    const code = String(otp || '').trim();
    if (!isValidMobile) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!/^\d{6}$/.test(code)) {
      setError('Enter the 6-digit OTP from WhatsApp.');
      return;
    }

    setError('');
    try {
      setIsVerifyingOtp(true);
      const res = await verifyMobileOtp(mobile, code);
      setMobileVerifyToken(res.mobile_verify_token);
      setMobileVerified(true);
      setOtpSent(false);
      setOtp('');
      setInfo('Mobile number verified.');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'OTP verification failed.');
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  // Auto-verify when 6 digits entered
  useEffect(() => {
    if (!showOtpField || mobileVerified) return;
    if (String(otp).length !== 6) return;
    if (isVerifyingOtp || isSendingOtp) return;
    void handleVerifyOtp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [otp, showOtpField]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setError('');

    const trimmedName = fullName.trim();
    const trimmedMobile = formatIndianMobileInput(mobileNumber);
    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();

    if (!trimmedName || !trimmedMobile || !normalizedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      setError('Please complete all required fields.');
      return;
    }
    if (trimmedName.length < 2 || trimmedName.length > 120) {
      setError('Full name must be between 2 and 120 characters.');
      return;
    }
    if (!/^[6-9]\d{9}$/.test(trimmedMobile)) {
      setError('Please enter a valid 10-digit mobile number.');
      return;
    }
    if (!mobileVerified || !mobileVerifyToken) {
      setError('Please verify your mobile number with WhatsApp OTP first.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isStrongPassword(trimmedPassword)) {
      setError(STRONG_PASSWORD_MESSAGE);
      return;
    }
    if (trimmedPassword !== trimmedConfirmPassword) {
      setError('Password and confirm password do not match.');
      return;
    }

    setIsSaving(true);
    try {
      await registerUser({
        full_name: trimmedName,
        mobile_number: trimmedMobile,
        email: normalizedEmail,
        password: trimmedPassword,
        confirm_password: trimmedConfirmPassword,
        role: 'student',
        mobile_verify_token: mobileVerifyToken,
      });

      savePendingOnboardCredentials({
        email: normalizedEmail,
        password: trimmedPassword,
      });
      window.location.href = '/onboarding';
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

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
                    Step 1 of 2
                  </div>
                  <h1 className="mt-3 text-xl font-bold tracking-tight text-slate-950 sm:text-2xl">
                    Create account
                  </h1>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600 sm:text-sm">
                    Verify mobile on WhatsApp, then complete email and password.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-3">
                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}
                  {!error && info ? <AuthAlert variant="success">{info}</AuthAlert> : null}

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="full_name">
                        Full name
                      </label>
                      <input
                        id="full_name"
                        className={signupInputClass}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="Enter your full name"
                        autoComplete="name"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className={labelClass} htmlFor="mobile_number">
                        Mobile
                      </label>
                      <div
                        className={`flex overflow-hidden rounded-xl border bg-slate-50/60 focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00a897]/15 ${
                          mobileVerified
                            ? 'border-[#00a897] focus-within:border-[#00a897]'
                            : 'border-slate-200/90 focus-within:border-[#00a897]'
                        }`}
                      >
                        <span className="flex items-center border-r border-slate-200/90 px-2.5 text-xs font-medium text-slate-600">
                          +91
                        </span>
                        <input
                          id="mobile_number"
                          className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm outline-none"
                          value={mobileNumber}
                          onChange={(e) => handleMobileChange(e.target.value)}
                          placeholder="9876543210"
                          inputMode="numeric"
                          maxLength={10}
                          autoComplete="tel"
                          disabled={mobileVerified}
                        />
                        {mobileVerified ? (
                          <span className="flex items-center gap-1 px-3 text-xs font-bold text-[#00a897]">
                            <CheckCircle2 className="size-3.5" />
                            Verified
                          </span>
                        ) : mobile.length > 0 ? (
                          <button
                            type="button"
                            className="flex items-center gap-1.5 px-3 text-[#25D366] disabled:opacity-50"
                            onClick={() => void sendOtpToWhatsApp(mobile, { force: true })}
                            disabled={isSendingOtp || !isValidMobile}
                            title="Send OTP on WhatsApp"
                          >
                            <MessageCircle className="size-4" />
                            <span className="hidden text-[11px] font-bold sm:inline">
                              {isSendingOtp ? 'Sending…' : 'WhatsApp'}
                            </span>
                          </button>
                        ) : null}
                      </div>
                    </div>

                    {showOtpField ? (
                      <div className="sm:col-span-2 space-y-2">
                        <div className="flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">
                          <MessageCircle className="size-4 text-[#25D366]" />
                          {isSendingOtp
                            ? 'Sending OTP on WhatsApp…'
                            : 'OTP sent on WhatsApp. Enter the 6-digit code.'}
                        </div>
                        <label className={labelClass} htmlFor="whatsapp_otp">
                          WhatsApp OTP
                        </label>
                        <div className="flex gap-2">
                          <input
                            ref={otpInputRef}
                            id="whatsapp_otp"
                            className={signupInputClass}
                            value={otp}
                            onChange={(e) =>
                              setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))
                            }
                            placeholder="6-digit OTP"
                            inputMode="numeric"
                            maxLength={6}
                            autoComplete="one-time-code"
                          />
                          <button
                            type="button"
                            onClick={() => void handleVerifyOtp()}
                            disabled={isVerifyingOtp || otp.length !== 6}
                            className="shrink-0 rounded-xl bg-[#00a897] px-4 text-sm font-bold text-white disabled:opacity-50"
                          >
                            {isVerifyingOtp ? '…' : 'Verify'}
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs font-bold text-[#00a897]"
                          onClick={() => void sendOtpToWhatsApp(mobile, { force: true })}
                          disabled={isSendingOtp}
                        >
                          {isSendingOtp ? 'Resending…' : 'Resend OTP on WhatsApp'}
                        </button>
                      </div>
                    ) : null}

                    <div>
                      <label className={labelClass} htmlFor="email">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        className={signupInputClass}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                      />
                    </div>

                    <div className="hidden sm:block" aria-hidden />

                    <div>
                      <label className={`${labelClass} flex items-center gap-1.5`} htmlFor="password">
                        Password
                      </label>
                      <PasswordInput
                        id="password"
                        value={password}
                        onChange={setPassword}
                        placeholder="8–16 characters"
                        autoComplete="new-password"
                        compact
                      />
                      <PasswordStrengthHint password={password} />
                    </div>

                    <div>
                      <label className={labelClass} htmlFor="confirm_password">
                        Confirm password
                      </label>
                      <PasswordInput
                        id="confirm_password"
                        value={confirmPassword}
                        onChange={setConfirmPassword}
                        placeholder="Re-enter password"
                        autoComplete="new-password"
                        compact
                      />
                    </div>
                  </div>

                  <AuthPrimaryButton
                    loading={isSaving}
                    loadingText="Creating account…"
                    disabled={!mobileVerified}
                  >
                    Continue
                  </AuthPrimaryButton>

                  {!mobileVerified ? (
                    <p className="text-center text-[11px] font-medium text-slate-500">
                      Mobile WhatsApp OTP verification is required to create account.
                    </p>
                  ) : null}

                  <AuthFooterLink
                    text="Already have an account?"
                    linkText="Login for payment"
                    href="/login"
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
    </div>
  );
}

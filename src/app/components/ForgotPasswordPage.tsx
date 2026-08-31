import { Lock, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { forgotPassword } from '../api/auth-api';
import { looksLikeMobileInput, resolveResetIdentifier } from '../lib/auth-identifier';
import { savePendingResetIdentifier } from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlertModal,
  AuthField,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authInputClass,
} from './auth-ui';
import { authErrorAlertVariant } from '../lib/verify-mobile-ui';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

export function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [alert, setAlert] = useState<{
    title: string;
    message: string;
    variant: 'error' | 'warning';
  } | null>(null);
  const showIndianMobile = looksLikeMobileInput(identifier);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setAlert(null);

    const resolved = resolveResetIdentifier(identifier.trim());
    if (!resolved) {
      setAlert({
        title: 'Missing details',
        message: 'Please enter your registered email or 10-digit mobile number.',
        variant: 'warning',
      });
      return;
    }

    setIsSaving(true);
    try {
      await forgotPassword(
        'mobile_number' in resolved && resolved.mobile_number
          ? { mobile_number: resolved.mobile_number }
          : { email: resolved.email },
      );
      savePendingResetIdentifier({
        email: resolved.email,
        mobileNumber: resolved.mobile_number,
        channel: resolved.channel,
      });
      const params = new URLSearchParams({
        channel: resolved.channel,
      });
      if (resolved.email) params.set('email', resolved.email);
      if (resolved.mobile_number) params.set('mobile', resolved.mobile_number);
      window.location.href = `/verify-reset-otp?${params.toString()}`;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Could not send reset code.';
      setAlert({
        title: 'Could not send OTP',
        message,
        variant: authErrorAlertVariant(message),
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="relative flex min-h-screen flex-col bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="paymentLogin" />
      <SideNav />

      <main className="relative flex flex-1 flex-col px-4 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="mx-auto my-auto w-full max-w-7xl">
          <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)]">
            <div className="h-1.5 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />

            <div className="grid lg:grid-cols-[1.15fr_0.85fr]">
              <div className="hidden lg:block">
                <AuthLoginVisualPanel embedded />
              </div>

              <div className="flex flex-col justify-center px-6 py-7 sm:px-8 sm:py-8 lg:px-10 lg:py-9">
                <div className="mb-5 border-b border-slate-100 pb-5">
                  <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] text-teal-800">
                    <Sparkles className="size-3.5 text-[#00a897]" />
                    Reset password
                  </div>
                  <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                    Forgot password
                  </h1>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Enter your registered email or mobile number. We&apos;ll send a 6-digit OTP
                    (email or WhatsApp) valid for 5 minutes.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <AuthField label="Email or mobile number" htmlFor="reset_identifier">
                    {showIndianMobile ? (
                      <div className="flex overflow-hidden rounded-xl border border-slate-200/90 bg-slate-50/60 focus-within:border-[#00a897] focus-within:bg-white focus-within:ring-2 focus-within:ring-[#00a897]/15">
                        <span
                          className="flex shrink-0 items-center gap-1.5 border-r border-slate-200/90 px-2.5 py-3.5 text-xs font-semibold text-slate-700"
                          aria-label="India country code"
                        >
                          <span className="text-base leading-none" aria-hidden>
                            🇮🇳
                          </span>
                          +91
                        </span>
                        <input
                          id="reset_identifier"
                          type="text"
                          className="min-w-0 flex-1 bg-transparent px-3 py-3.5 text-sm outline-none"
                          value={identifier}
                          onChange={(e) => setIdentifier(e.target.value)}
                          placeholder="Email or 10-digit mobile"
                          autoComplete="username"
                        />
                      </div>
                    ) : (
                      <input
                        id="reset_identifier"
                        type="text"
                        className={authInputClass}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Email or 10-digit mobile"
                        autoComplete="username"
                      />
                    )}
                  </AuthField>

                  <AuthPrimaryButton loading={isSaving} loadingText="Sending OTP…">
                    <Lock className="size-4" />
                    Send OTP
                  </AuthPrimaryButton>

                  <AuthFooterLink text="Remember your password?" linkText="Back to login" href="/login" />
                </form>
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

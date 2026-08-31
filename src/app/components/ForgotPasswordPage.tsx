import { Lock, MessageCircle, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { forgotPassword } from '../api/auth-api';
import { looksLikeMobileInput, resolveResetIdentifier } from '../lib/auth-identifier';
import { savePendingResetIdentifier } from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthField,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authInputClass,
} from './auth-ui';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

export function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const showWhatsAppHint = looksLikeMobileInput(identifier);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setError('');
    setInfo('');

    const resolved = resolveResetIdentifier(identifier.trim());
    if (!resolved) {
      setError('Please enter your registered email or 10-digit mobile number.');
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
      setError(err instanceof Error ? err.message : 'Could not send reset code.');
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
                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}
                  {!error && info ? <AuthAlert variant="success">{info}</AuthAlert> : null}

                  <AuthField label="Email or mobile number" htmlFor="reset_identifier">
                    <div className="relative">
                      <input
                        id="reset_identifier"
                        type="text"
                        className={authInputClass}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Email or 10-digit mobile"
                        autoComplete="username"
                      />
                      {showWhatsAppHint ? (
                        <MessageCircle
                          className="pointer-events-none absolute right-3 top-1/2 size-5 -translate-y-1/2 text-[#25D366]"
                          aria-hidden
                        />
                      ) : null}
                    </div>
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
    </div>
  );
}

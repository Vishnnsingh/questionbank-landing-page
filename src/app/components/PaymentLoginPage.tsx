import { CheckCircle2, LogIn, ShieldCheck, Sparkles } from 'lucide-react';
import { FormEvent, useEffect, useState } from 'react';

import { fetchAuthMe, loginUser } from '../api/auth-api';
import { looksLikeMobileInput, resolveLoginIdentifier } from '../lib/auth-identifier';
import { redirectAfterAuthenticatedLogin } from '../lib/auth-post-login';
import { isValidLoginPassword } from '../lib/password-policy';
import {
  clearPendingLoginMobileVerify,
  readPendingLoginEmail,
  savePendingLoginMobileVerify,
  savePendingOnboardCredentials,
} from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthField,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
  authInputClass,
} from './auth-ui';
import { PasswordInput } from './PasswordInput';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

export function PaymentLoginPage() {
  const pendingEmail = readPendingLoginEmail();
  const [identifier, setIdentifier] = useState(pendingEmail);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const showSignupSuccess = Boolean(pendingEmail);
  const showIndianMobile = looksLikeMobileInput(identifier);

  useEffect(() => {
    clearPendingLoginMobileVerify();
  }, []);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setError('');

    const trimmedIdentifier = identifier.trim();
    const trimmedPassword = password.trim();
    const resolved = resolveLoginIdentifier(trimmedIdentifier);

    if (!trimmedIdentifier || !trimmedPassword) {
      setError('Please enter your email or mobile number and password.');
      return;
    }
    if (!resolved) {
      setError('Enter a valid email address or 10-digit mobile number.');
      return;
    }
    if ('email' in resolved && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(resolved.email)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isValidLoginPassword(trimmedPassword)) {
      setError('Password must be 6–16 characters.');
      return;
    }

    setIsSaving(true);
    try {
      const login = await loginUser(trimmedIdentifier, trimmedPassword);
      const loginEmail =
        'email' in resolved && resolved.email ? resolved.email : undefined;

      if (login.needs_mobile_verify) {
        const mobile = String(login.mobile_number || '').replace(/\D/g, '').slice(0, 10);
        const token = String(login.login_pending_token || '').trim();
        const accountEmail =
          String(login.email || '').trim().toLowerCase() ||
          (loginEmail ?? '');
        if (!token || !/^[6-9]\d{9}$/.test(mobile)) {
          throw new Error('Could not start mobile verification. Try again.');
        }
        savePendingLoginMobileVerify({
          loginPendingToken: token,
          mobileNumber: mobile,
          email: accountEmail || undefined,
          password: trimmedPassword,
        });
        const params = new URLSearchParams({
          mode: 'login',
          mobile,
        });
        window.location.href = `/verify-mobile?${params.toString()}`;
        return;
      }

      const profile = await fetchAuthMe(login.accessToken);
      redirectAfterAuthenticatedLogin(login, profile, {
        email: loginEmail,
        password: trimmedPassword,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      if (/onboarding/i.test(message)) {
        const resolvedId = resolveLoginIdentifier(trimmedIdentifier);
        const onboardEmail =
          resolvedId && 'email' in resolvedId && resolvedId.email
            ? resolvedId.email
            : trimmedIdentifier.toLowerCase();
        savePendingOnboardCredentials({
          email: onboardEmail,
          password: trimmedPassword,
        });
        window.location.href = '/onboarding';
        return;
      }
      setError(message);
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
                    Login for payment
                  </div>
                  <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">Welcome back</h1>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Sign in with email or mobile to choose a plan and pay securely.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {showSignupSuccess ? (
                    <AuthAlert variant="success">
                      <span className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#00a897]" />
                        Account ready. Sign in to choose a plan.
                      </span>
                    </AuthAlert>
                  ) : null}

                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

                  <AuthField label="Email or mobile number" htmlFor="login_identifier">
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
                          id="login_identifier"
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
                        id="login_identifier"
                        type="text"
                        className={authInputClass}
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="Email or 10-digit mobile"
                        autoComplete="username"
                      />
                    )}
                  </AuthField>

                  <AuthField label="Password" htmlFor="login_password">
                    <PasswordInput
                      id="login_password"
                      value={password}
                      onChange={setPassword}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                    />
                  </AuthField>

                  <div className="flex justify-end">
                    <a
                      href="/forgot-password"
                      className="text-xs font-semibold text-[#00a897] transition hover:text-teal-700"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <p className="flex items-center gap-2 text-xs text-slate-500">
                    <ShieldCheck className="size-4 shrink-0 text-[#00a897]" />
                    Secure UPI payment after login
                  </p>

                  <AuthPrimaryButton loading={isSaving} loadingText="Signing in…">
                    <LogIn className="size-4" />
                    Login &amp; choose plan
                  </AuthPrimaryButton>

                  <AuthFooterLink text="New user?" linkText="Create account" href="/signup" />
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

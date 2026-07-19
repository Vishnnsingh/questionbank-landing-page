import { CheckCircle2, LogIn, ShieldCheck, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { fetchAuthMe, loginUser } from '../api/auth-api';
import { isValidLoginPassword } from '../lib/password-policy';
import {
  clearPendingLoginEmail,
  readPendingLoginEmail,
  savePaymentUserContext,
  savePendingOnboardCredentials,
} from '../lib/signup-context';
import { DEFAULT_TENANT_ID, setSessionTenantId } from '../lib/tenant-rbac';
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

function normalizeClass(value: string | undefined): '10' | '12' {
  return String(value || '').replace(/\D/g, '') === '12' ? '12' : '10';
}

export function PaymentLoginPage() {
  const pendingEmail = readPendingLoginEmail();
  const [email, setEmail] = useState(pendingEmail);
  const [password, setPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const showSignupSuccess = Boolean(pendingEmail);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setError('');

    const normalizedEmail = email.trim().toLowerCase();
    const trimmedPassword = password.trim();

    if (!normalizedEmail || !trimmedPassword) {
      setError('Please enter email and password.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
      setError('Please enter a valid email address.');
      return;
    }
    if (!isValidLoginPassword(trimmedPassword)) {
      setError('Password must be 8–16 characters.');
      return;
    }

    setIsSaving(true);
    try {
      const login = await loginUser(normalizedEmail, trimmedPassword);
      const profile = await fetchAuthMe(login.accessToken);

      savePaymentUserContext({
        class: normalizeClass(profile.class),
        fullName: String(profile.full_name || login.fullName || 'Student').trim(),
        email: String(profile.email || normalizedEmail).trim().toLowerCase(),
        accessToken: login.accessToken,
        refreshToken: login.refreshToken,
        expiresAt: Date.now() + (login.expiresIn ?? 3600) * 1000,
      });
      setSessionTenantId(DEFAULT_TENANT_ID);

      clearPendingLoginEmail();
      window.location.href = '/choose-plan';
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Login failed. Please try again.';
      if (/onboarding/i.test(message)) {
        savePendingOnboardCredentials({
          email: normalizedEmail,
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
                    Sign in to choose a plan and pay securely.
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

                  <AuthField label="Email" htmlFor="login_email">
                    <input
                      id="login_email"
                      type="email"
                      className={authInputClass}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      autoComplete="email"
                    />
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

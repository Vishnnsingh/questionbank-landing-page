import { CheckCircle2, Sparkles } from 'lucide-react';
import { FormEvent, useState } from 'react';

import { resetPasswordWithToken } from '../api/auth-api';
import {
  isStrongPassword,
  PASSWORD_MAX_LENGTH,
  STRONG_PASSWORD_MESSAGE,
} from '../lib/password-policy';
import {
  clearPasswordResetToken,
  clearPendingResetIdentifier,
  readPasswordResetToken,
} from '../lib/signup-context';
import { AuthLoginVisualPanel } from './AuthAppShowcase';
import {
  AuthAlert,
  AuthField,
  AuthFooterLink,
  AuthPageBackground,
  AuthPrimaryButton,
} from './auth-ui';
import { PasswordInput } from './PasswordInput';
import { PasswordStrengthHint } from './PasswordStrengthHint';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

export function ResetPasswordPage() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (isSaving) return;

    setError('');

    const token = readPasswordResetToken();
    if (!token) {
      setError('Session expired. Start again from forgot password.');
      return;
    }
    if (!isStrongPassword(newPassword)) {
      setError(STRONG_PASSWORD_MESSAGE);
      return;
    }
    if (newPassword !== confirmPassword) {
      setError('New password and confirm password must match.');
      return;
    }

    setIsSaving(true);
    try {
      await resetPasswordWithToken({
        token,
        newPassword,
        confirmNewPassword: confirmPassword,
      });
      clearPasswordResetToken();
      clearPendingResetIdentifier();
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 1500);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reset password.');
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
                    New password
                  </div>
                  <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950">
                    Create new password
                  </h1>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">
                    Use 6–15 characters. Letters, numbers, symbols, or any mix.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  {success ? (
                    <AuthAlert variant="success">
                      <span className="flex items-start gap-2">
                        <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-[#00a897]" />
                        Password updated. Redirecting to login…
                      </span>
                    </AuthAlert>
                  ) : null}

                  {error ? <AuthAlert variant="error">{error}</AuthAlert> : null}

                  <AuthField label="New password" htmlFor="new_password">
                    <PasswordInput
                      id="new_password"
                      value={newPassword}
                      onChange={setNewPassword}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                      maxLength={PASSWORD_MAX_LENGTH}
                    />
                    <PasswordStrengthHint password={newPassword} />
                  </AuthField>

                  <AuthField label="Confirm password" htmlFor="confirm_password">
                    <PasswordInput
                      id="confirm_password"
                      value={confirmPassword}
                      onChange={setConfirmPassword}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                      maxLength={PASSWORD_MAX_LENGTH}
                    />
                  </AuthField>

                  <AuthPrimaryButton
                    loading={isSaving}
                    loadingText="Saving…"
                    disabled={success}
                  >
                    Reset password
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

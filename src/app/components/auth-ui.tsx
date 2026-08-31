import { Loader2, Sparkles, AlertCircle, CheckCircle2, Info, AlertTriangle } from 'lucide-react';
import type { FormEvent, ReactNode } from 'react';

import { Footer } from './Footer';
import { SideNav } from './SideNav';

export const BRAND_PRIMARY = '#00a897';

export const authInputClass =
  'w-full rounded-xl border border-slate-200/90 bg-slate-50/60 px-4 py-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-[#00a897] focus:bg-white focus:ring-2 focus:ring-[#00a897]/15 disabled:cursor-not-allowed disabled:opacity-60';

/** Native select — same cast as auth inputs + right chevron (signup / onboarding CTAs). */
export const authSelectClass =
  `${authInputClass} cursor-pointer appearance-none bg-no-repeat pr-10 ` +
  `[background-position:right_0.85rem_center] ` +
  `[background-size:0.95rem] ` +
  `[background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%2364758b'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'/%3E%3C/svg%3E")]`;

export const authLabelClass = 'mb-2 block text-sm font-semibold text-slate-800';

/** Compact variant used on signup / onboarding dense grids */
export const authFieldLabelClass = 'mb-1 block text-xs font-semibold text-slate-800';
export const authCompactInputClass = `${authInputClass} py-2.5`;
export const authCompactSelectClass = `${authSelectClass} py-2.5`;

export function AuthPageBackground() {
  return (
    <>
      <div className="pointer-events-none absolute -left-24 top-28 h-72 w-72 rounded-full bg-teal-400/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-1/3 h-80 w-80 rounded-full bg-blue-400/15 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-teal-300/15 blur-3xl" />
    </>
  );
}

export function AuthShell({
  children,
  maxWidth = 'max-w-lg',
}: {
  children: ReactNode;
  maxWidth?: string;
}) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SideNav />
      <div className="relative pb-12 sm:pb-16">
        <main className={`mx-auto ${maxWidth} px-4 sm:px-6 lg:px-8`}>{children}</main>
        <Footer />
      </div>
    </div>
  );
}

export function AuthCard({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white/95 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.14)] backdrop-blur-sm">
      <div className="h-1.5 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />
      {children}
    </div>
  );
}

export function AuthCardBody({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return <div className={`p-6 sm:p-8 ${className}`}>{children}</div>;
}

export function AuthBadge({ children }: { children: ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-800">
      <Sparkles className="size-3.5 text-[#00a897]" />
      {children}
    </div>
  );
}

export function AuthHeader({
  badge,
  title,
  description,
}: {
  badge: string;
  title: string;
  description: string;
}) {
  return (
    <div className="border-b border-slate-100 pb-6">
      <AuthBadge>{badge}</AuthBadge>
      <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">{title}</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">{description}</p>
    </div>
  );
}

export function AuthAlert({
  variant,
  children,
}: {
  variant: 'success' | 'error';
  children: ReactNode;
}) {
  const styles =
    variant === 'success'
      ? 'border-teal-200/80 bg-teal-50/80 text-teal-900'
      : 'border-red-200/80 bg-red-50/80 text-red-800';

  return (
    <div className={`rounded-xl border px-4 py-3 text-sm leading-relaxed ${styles}`}>{children}</div>
  );
}

type AuthAlertModalVariant = 'error' | 'warning' | 'info' | 'success';

const AUTH_ALERT_MODAL_STYLES: Record<
  AuthAlertModalVariant,
  { icon: typeof AlertCircle; iconClass: string; iconWrapClass: string }
> = {
  error: {
    icon: AlertCircle,
    iconClass: 'text-red-600',
    iconWrapClass: 'border-red-100 bg-red-50',
  },
  warning: {
    icon: AlertTriangle,
    iconClass: 'text-amber-600',
    iconWrapClass: 'border-amber-100 bg-amber-50',
  },
  info: {
    icon: Info,
    iconClass: 'text-[#00a897]',
    iconWrapClass: 'border-teal-100 bg-teal-50',
  },
  success: {
    icon: CheckCircle2,
    iconClass: 'text-[#00a897]',
    iconWrapClass: 'border-teal-100 bg-teal-50',
  },
};

export function AuthAlertModal({
  open,
  title,
  message,
  variant = 'error',
  okLabel = 'OK',
  onClose,
}: {
  open: boolean;
  title: string;
  message: string;
  variant?: AuthAlertModalVariant;
  okLabel?: string;
  onClose: () => void;
}) {
  if (!open) return null;

  const theme = AUTH_ALERT_MODAL_STYLES[variant];
  const Icon = theme.icon;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/45 px-4 backdrop-blur-[2px]"
      role="presentation"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[340px] overflow-hidden rounded-[20px] border border-slate-200/90 bg-white px-6 pb-6 pt-2 text-center shadow-[0_24px_60px_-16px_rgba(15,23,42,0.28)]"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="auth-alert-title"
        aria-describedby="auth-alert-message"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-[#00a897] via-teal-500 to-blue-500" />
        <div
          className={`mx-auto mt-5 flex size-[72px] items-center justify-center rounded-full border ${theme.iconWrapClass}`}
        >
          <Icon className={`size-10 ${theme.iconClass}`} aria-hidden />
        </div>
        <h2 id="auth-alert-title" className="mt-4 text-lg font-bold text-slate-950">
          {title}
        </h2>
        <p id="auth-alert-message" className="mt-2 text-sm leading-relaxed text-slate-600">
          {message}
        </p>
        <button
          type="button"
          onClick={onClose}
          className="mt-5 inline-flex h-[46px] w-full items-center justify-center rounded-xl bg-[#00a897] px-6 text-[15px] font-bold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700"
        >
          {okLabel}
        </button>
      </div>
    </div>
  );
}

export function AuthField({
  label,
  htmlFor,
  children,
}: {
  label: string;
  htmlFor: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label className={authLabelClass} htmlFor={htmlFor}>
        {label}
      </label>
      {children}
    </div>
  );
}

export function AuthPrimaryButton({
  children,
  disabled,
  loading,
  loadingText = 'Please wait…',
  type = 'submit',
  onClick,
}: {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  type?: 'submit' | 'button';
  onClick?: () => void;
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a897] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-70"
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" />
          {loadingText}
        </>
      ) : (
        children
      )}
    </button>
  );
}

export function AuthFooterLink({
  text,
  linkText,
  href,
}: {
  text: string;
  linkText: string;
  href: string;
}) {
  return (
    <p className="text-center text-sm text-slate-600">
      {text}{' '}
      <a href={href} className="font-semibold text-[#00a897] transition hover:text-teal-700">
        {linkText}
      </a>
    </p>
  );
}

export function AuthForm({
  onSubmit,
  children,
}: {
  onSubmit: (event: FormEvent) => void;
  children: ReactNode;
}) {
  return (
    <form onSubmit={onSubmit} className="mt-6 space-y-5">
      {children}
    </form>
  );
}

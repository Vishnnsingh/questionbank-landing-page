import { Check, Loader2, LogOut, Sparkles, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import { createWebCheckout } from '../api/subscription-api';
import { ensureValidAccessToken, hasPaymentAuthSession, performPaymentLogout } from '../lib/auth-session';
import { openCashfreeCheckout } from '../lib/cashfree-checkout';
import { formatInr, planCatalogForClass, type PlanType } from '../lib/plan-catalog';
import { readPaymentUserContext, saveSelectedPlan } from '../lib/signup-context';
import {
  AuthCard,
  AuthCardBody,
  AuthPageBackground,
} from './auth-ui';
import { Footer } from './Footer';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const planFeatures = [
  '10 Years Question Bank',
  'Unlimited Mock Tests',
  'Most Repeated Questions',
  'Chapter-wise Practice',
  'Performance Analytics',
];

export function ChoosePlanPage() {
  const [paymentUser, setPaymentUser] = useState(readPaymentUserContext);
  const [selectedPlan, setSelectedPlan] = useState<PlanType | null>(null);
  const [sessionReady, setSessionReady] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [payingPlan, setPayingPlan] = useState<PlanType | null>(null);
  const [payError, setPayError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function bootstrapSession() {
      const user = readPaymentUserContext();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      if (hasPaymentAuthSession()) {
        try {
          await ensureValidAccessToken();
          if (cancelled) return;
          setPaymentUser(readPaymentUserContext());
        } catch {
          if (!cancelled) {
            window.location.href = '/login';
          }
          return;
        }
      }

      if (!cancelled) {
        setSessionReady(true);
      }
    }

    bootstrapSession();
    return () => {
      cancelled = true;
    };
  }, []);

  const catalog = useMemo(
    () => (paymentUser ? planCatalogForClass(paymentUser.class) : null),
    [paymentUser],
  );

  if (!sessionReady || !paymentUser || !catalog) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
        <AuthPageBackground />
        <Loader2 className="relative size-8 animate-spin text-[#00a897]" />
      </div>
    );
  }

  const handleLogout = async () => {
    if (isLoggingOut) return;
    setIsLoggingOut(true);
    await performPaymentLogout();
  };

  const handlePayNow = async (planType: PlanType) => {
    if (payingPlan) return;
    setPayError(null);
    setSelectedPlan(planType);
    saveSelectedPlan({ planType, class: catalog.class });
    setPayingPlan(planType);

    try {
      const accessToken = await ensureValidAccessToken();
      if (!accessToken) {
        window.location.href = '/login';
        return;
      }

      const checkout = await createWebCheckout(accessToken, planType);
      await openCashfreeCheckout(
        checkout.payment_session_id,
        checkout.cashfree_mode === 'production' ? 'production' : 'sandbox',
      );
    } catch (error) {
      setPayError(error instanceof Error ? error.message : 'Could not start payment.');
      setPayingPlan(null);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="choosePlan" />
      <SideNav />

      <main className="relative px-4 pb-10 pt-24 sm:px-6 sm:pb-12 sm:pt-28 lg:px-10">
        <div className="mx-auto mb-10 w-full max-w-4xl sm:mb-12">
          <AuthCard>
            <AuthCardBody>
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-100 pb-6">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-gradient-to-r from-teal-50 to-cyan-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-800">
                <Sparkles className="size-3.5 text-[#00a897]" />
                Choose a plan
              </div>
              <h1 className="mt-5 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl">
                Welcome, {paymentUser.fullName.split(' ')[0] || 'Student'}
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                {formatInr(catalog.trial.displayAmount)} for a 2-day trial, or subscribe yearly for Class{' '}
                {catalog.class}.
              </p>
            </div>
            {hasPaymentAuthSession() ? (
              <button
                type="button"
                onClick={handleLogout}
                disabled={isLoggingOut}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-50/80 px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-white disabled:opacity-70"
              >
                {isLoggingOut ? (
                  <Loader2 className="size-4 animate-spin" />
                ) : (
                  <LogOut className="size-4" />
                )}
                Logout
              </button>
            ) : null}
          </div>

          {payError ? (
            <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {payError}
            </p>
          ) : null}

          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a897] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
              <Sparkles className="size-3.5" />
              Limited · {formatInr(catalog.trial.displayAmount)} only trial
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm">
              <Zap className="size-3.5" />
              1 Year · {formatInr(catalog.yearly.displayAmount)} only
            </span>
            {catalog.yearly.discountPercent ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                Save {catalog.yearly.discountPercent}%
              </span>
            ) : null}
          </div>

          <div className="mt-6 grid gap-5 lg:grid-cols-2">
            <article
              className={`rounded-2xl border bg-white p-6 shadow-sm transition ${
                selectedPlan === 'trial_2day'
                  ? 'border-[#00a897] ring-2 ring-[#00a897]/15 shadow-md'
                  : 'border-slate-200/90 hover:border-teal-200'
              }`}
            >
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#00a897]">
                2-day full trial
              </p>
              <p className="mt-3 text-4xl font-extrabold text-slate-950">
                {formatInr(catalog.trial.displayAmount)}
                <span className="ml-1 text-base font-semibold text-slate-500">only</span>
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{catalog.trial.hint}</p>
              <ul className="mt-5 space-y-2.5">
                {planFeatures.slice(0, 3).map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Check className="size-4 shrink-0 text-[#00a897]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handlePayNow('trial_2day')}
                disabled={Boolean(payingPlan)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00a897] bg-white px-6 py-3.5 text-sm font-semibold text-[#00a897] transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {payingPlan === 'trial_2day' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Opening Cashfree…
                  </>
                ) : (
                  'Pay Now — Trial'
                )}
              </button>
            </article>

            <article
              className={`relative rounded-2xl border bg-gradient-to-br from-white to-teal-50/40 p-6 shadow-sm transition ${
                selectedPlan === 'yearly'
                  ? 'border-[#00a897] ring-2 ring-[#00a897]/15 shadow-md'
                  : 'border-slate-200/90 hover:border-teal-200'
              }`}
            >
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 rounded-full bg-gradient-to-r from-[#00a897] to-teal-600 px-4 py-1 text-xs font-bold text-white shadow-md">
                  <Zap className="size-3.5 fill-current" />
                  Best value
                </span>
              </div>

              <p className="mt-2 text-xs font-bold uppercase tracking-[0.12em] text-teal-800">
                {catalog.yearly.label}
              </p>
              <div className="mt-3 flex flex-wrap items-end gap-2">
                <span className="text-lg text-slate-400 line-through">
                  {formatInr(catalog.yearly.mrpDisplay)}
                </span>
                <span className="text-4xl font-extrabold text-slate-950">
                  {formatInr(catalog.yearly.displayAmount)}
                  <span className="ml-1 text-base font-semibold text-slate-500">only</span>
                </span>
                {catalog.yearly.discountPercent ? (
                  <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-800">
                    {catalog.yearly.discountPercent}% OFF
                  </span>
                ) : null}
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{catalog.yearly.hint}</p>
              <ul className="mt-5 space-y-2.5">
                {planFeatures.map((feature) => (
                  <li key={feature} className="flex items-center gap-2.5 text-sm text-slate-600">
                    <Check className="size-4 shrink-0 text-[#00a897]" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => handlePayNow('yearly')}
                disabled={Boolean(payingPlan)}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a897] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-teal-900/10 transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {payingPlan === 'yearly' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Opening Cashfree…
                  </>
                ) : (
                  'Pay Now — 1 Year'
                )}
              </button>
            </article>
          </div>

          <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
            Auto-payment stays active after trial or yearly plan. Yearly renews when 1 year ends.
          </p>
            </AuthCardBody>
          </AuthCard>
        </div>
      </main>

      <Footer />
    </div>
  );
}

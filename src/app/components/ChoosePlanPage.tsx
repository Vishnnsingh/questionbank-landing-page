import { Check, Loader2, Lock, Sparkles, Zap } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';

import {
  createWebCheckout,
  fetchPublicPlansCatalog,
  fetchSubscriptionMe,
  type SubscriptionMeResult,
} from '../api/subscription-api';
import { ensureValidAccessToken, hasPaymentAuthSession } from '../lib/auth-session';
import { openCashfreeCheckout } from '../lib/cashfree-checkout';
import { formatPaymentUserMessage } from '../lib/payment-messages';
import {
  // catalogAutoPayFooterNote,
  formatInr,
  isTrialPlanAvailable,
  mergePlanCatalog,
  planCatalogForClass,
  type PlanType,
} from '../lib/plan-catalog';
import { readPaymentUserContext, saveSelectedPlan } from '../lib/signup-context';
import {
  AuthCard,
  AuthCardBody,
  AuthPageBackground,
} from './auth-ui';
import { PaymentFeedback } from './PaymentFeedback';
import { ActivePlanBadge, ChoosePlanSubscriptionPanel } from './ChoosePlanSubscriptionPanel';
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
  const [payingPlan, setPayingPlan] = useState<PlanType | null>(null);
  const [payError, setPayError] = useState<string | null>(null);
  const [payPhase, setPayPhase] = useState<'idle' | 'preparing' | 'failed'>('idle');
  const [payStatusMessage, setPayStatusMessage] = useState('');
  const [subscriptionData, setSubscriptionData] = useState<SubscriptionMeResult | null>(null);
  const [subscriptionLoading, setSubscriptionLoading] = useState(false);
  const [publicCatalog, setPublicCatalog] = useState<ReturnType<typeof planCatalogForClass> | null>(null);

  const loadSubscription = async () => {
    if (!hasPaymentAuthSession()) return;
    setSubscriptionLoading(true);
    try {
      const accessToken = await ensureValidAccessToken();
      if (!accessToken) return;
      const data = await fetchSubscriptionMe(accessToken);
      setSubscriptionData(data);
    } catch {
      // Non-blocking — plan cards still work.
    } finally {
      setSubscriptionLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;

    async function bootstrapSession() {
      const user = readPaymentUserContext();
      if (!user) {
        window.location.href = '/login';
        return;
      }

      try {
        const catalogRes = await fetchPublicPlansCatalog(user.class);
        if (!cancelled && catalogRes?.catalog) {
          setPublicCatalog(catalogRes.catalog);
        }
      } catch {
        // Fallback to local defaults in mergePlanCatalog.
      }

      if (hasPaymentAuthSession()) {
        try {
          await ensureValidAccessToken();
          if (cancelled) return;
          setPaymentUser(readPaymentUserContext());
          await loadSubscription();
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

  const catalog = useMemo(() => {
    if (!paymentUser) return null;
    const local = publicCatalog ?? planCatalogForClass(paymentUser.class);
    return mergePlanCatalog(local, subscriptionData?.catalog ?? null);
  }, [paymentUser, subscriptionData?.catalog, publicCatalog]);
  const trialAvailable = catalog ? isTrialPlanAvailable(catalog) : true;
  // Auto-payment temporarily disabled
  // const autoPayFooterNote = useMemo(
  //   () => (catalog ? catalogAutoPayFooterNote(catalog) : null),
  //   [catalog],
  // );

  const isTrialActive = Boolean(
    subscriptionData?.entitlements?.fullAccess &&
      subscriptionData?.entitlements?.tier === 'trial_2day',
  );
  const isYearlyActive = Boolean(
    subscriptionData?.entitlements?.fullAccess &&
      subscriptionData?.entitlements?.tier === 'yearly',
  );

  if (!sessionReady || !paymentUser || !catalog) {
    return (
      <div className="relative flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
        <AuthPageBackground />
        <Loader2 className="relative size-8 animate-spin text-[#00a897]" />
      </div>
    );
  }

  const handlePayNow = async (planType: PlanType) => {
    if (payingPlan) return;
    setPayError(null);
    setPayPhase('preparing');
    setPayStatusMessage('Preparing secure checkout. Please wait…');
    setSelectedPlan(planType);
    saveSelectedPlan({ planType, class: catalog.class });
    setPayingPlan(planType);

    try {
      const accessToken = await ensureValidAccessToken();
      if (!accessToken) {
        window.location.href = '/login';
        return;
      }

      setPayStatusMessage('Opening payment gateway. Do not close this page…');
      const checkout = await createWebCheckout(accessToken, planType);
      await openCashfreeCheckout(checkout);
    } catch (error) {
      const friendly = formatPaymentUserMessage(error, 'Could not start payment. Please try again.');
      setPayPhase('failed');
      setPayStatusMessage(friendly);
      setPayError(friendly);
      setPayingPlan(null);
    }
  };

  const dismissPayOverlay = () => {
    setPayPhase('idle');
    setPayStatusMessage('');
    setPayError(null);
  };

  return (
    <div className="relative min-h-screen bg-slate-50">
      <AuthPageBackground />
      <SEO page="choosePlan" />
      <SideNav />

      <main className="relative w-full px-4 pb-12 pt-6 sm:px-6 sm:pb-14 lg:px-8 lg:pt-8">
        <div className="mx-auto w-full max-w-7xl">
          {/* Page header */}
          <header className="border-b border-slate-200 pb-6 sm:pb-8">
            <div className="inline-flex items-center gap-2 rounded-full border border-teal-100 bg-teal-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] text-teal-800">
              <Sparkles className="size-3.5 text-[#00a897]" />
              Choose a plan
            </div>
            <h1 className="mt-4 text-2xl font-bold tracking-tight text-slate-950 sm:text-3xl lg:text-4xl">
              Welcome, {paymentUser.fullName.split(' ')[0] || 'Student'}
            </h1>
            <p className="mt-2 max-w-3xl text-sm leading-relaxed text-slate-600 sm:text-base">
              {trialAvailable
                ? `${formatInr(catalog.trial.displayAmount)} trial for 2 days, or subscribe yearly now for Class ${catalog.class}.`
                : `Subscribe yearly for Class ${catalog.class}. One-time payment for full access.`}
              {/* Auto-payment copy (temporarily disabled):
                trial: yearly auto-pay after trial
                yearly: Auto-payment renews your plan every year
              */}
            </p>
          </header>

          {payError ? (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {payError}
            </p>
          ) : null}

          {hasPaymentAuthSession() ? (
            <ChoosePlanSubscriptionPanel
              data={subscriptionData}
              loading={subscriptionLoading}
              onRefresh={loadSubscription}
            />
          ) : null}

          <div className="mt-8 flex flex-wrap items-center gap-2">
            {trialAvailable ? (
              <span className="inline-flex items-center gap-1.5 rounded-full bg-[#00a897] px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
                <Sparkles className="size-3.5" />
                Limited · {formatInr(catalog.trial.displayAmount)} only trial
              </span>
            ) : null}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-slate-900 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white">
              <Zap className="size-3.5" />
              1 Year · {formatInr(catalog.yearly.displayAmount)} only
            </span>
            {catalog.yearly.discountPercent ? (
              <span className="inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-bold text-amber-800">
                Save {catalog.yearly.discountPercent}%
              </span>
            ) : null}
          </div>

          <div className="mt-6 grid w-full gap-5 lg:grid-cols-2 lg:gap-6 xl:gap-8">
            <article
              className={`rounded-2xl border bg-white p-6 transition sm:p-7 lg:p-8 ${
                !trialAvailable
                  ? 'border-slate-200 bg-slate-50/80 opacity-95'
                  : isTrialActive || selectedPlan === 'trial_2day'
                    ? 'border-[#00a897] ring-2 ring-[#00a897]/15'
                    : 'border-slate-200 hover:border-teal-200'
              }`}
            >
              {isTrialActive ? (
                <div className="mb-3">
                  <ActivePlanBadge planType="trial_2day" />
                </div>
              ) : null}
              <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#00a897]">
                2-day full trial
              </p>
              {trialAvailable ? (
                <p className="mt-3 text-4xl font-extrabold text-slate-950">
                  {formatInr(catalog.trial.displayAmount)}
                  <span className="ml-1 text-base font-semibold text-slate-500">only</span>
                </p>
              ) : (
                <div className="mt-3 inline-flex items-center gap-2 text-lg font-bold text-slate-400">
                  <Lock className="size-4" />
                  Trial already used
                </div>
              )}
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{catalog.trial.hint}</p>
              {/* Auto-payment temporarily disabled
              <p className="mt-2 inline-flex rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-semibold text-amber-900">
                Yearly auto-pay after trial ends
              </p>
              */}
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
                disabled={Boolean(payingPlan) || !trialAvailable}
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-[#00a897] bg-white px-6 py-3.5 text-sm font-semibold text-[#00a897] transition hover:bg-teal-50 disabled:cursor-not-allowed disabled:opacity-70 disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
              >
                {payingPlan === 'trial_2day' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Opening Cashfree…
                  </>
                ) : trialAvailable ? (
                  'Pay Now — Trial'
                ) : (
                  'Trial unavailable'
                )}
              </button>
            </article>

            <article
              className={`relative rounded-2xl border bg-gradient-to-br from-white to-teal-50/40 p-6 transition sm:p-7 lg:p-8 ${
                isYearlyActive || selectedPlan === 'yearly'
                  ? 'border-[#00a897] ring-2 ring-[#00a897]/15'
                  : 'border-slate-200 hover:border-teal-200'
              }`}
            >
              {isYearlyActive ? (
                <div className="absolute -top-3 right-4">
                  <ActivePlanBadge planType="yearly" />
                </div>
              ) : null}
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
              {/* Auto-payment temporarily disabled
              {catalog.yearly.autoRenew ? (
                <p className="mt-2 inline-flex rounded-full border border-teal-200 bg-teal-50 px-2.5 py-1 text-xs font-semibold text-teal-800">
                  Auto-payment on after yearly payment
                </p>
              ) : null}
              */}
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
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#00a897] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70"
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

          {/* Auto-payment temporarily disabled
          {autoPayFooterNote ? (
            <p className="mt-6 text-center text-xs leading-relaxed text-slate-500 sm:text-left">
              {autoPayFooterNote}
            </p>
          ) : null}
          */}
        </div>
      </main>

      <Footer />

      {payPhase === 'preparing' ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-2 shadow-2xl">
            <AuthCard>
              <AuthCardBody>
                <PaymentFeedback phase="waiting" message={payStatusMessage} showElapsed />
              </AuthCardBody>
            </AuthCard>
          </div>
        </div>
      ) : null}

      {payPhase === 'failed' ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-900/40 px-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-2 shadow-2xl">
            <AuthCard>
              <AuthCardBody>
                <PaymentFeedback
                  phase="failed"
                  message={payStatusMessage}
                  action={
                    <button
                      type="button"
                      onClick={dismissPayOverlay}
                      className="inline-flex items-center justify-center rounded-xl border border-red-200 bg-red-50 px-6 py-3 text-sm font-semibold text-red-700 transition hover:bg-red-100"
                    >
                      OK
                    </button>
                  }
                />
              </AuthCardBody>
            </AuthCard>
          </div>
        </div>
      ) : null}
    </div>
  );
}

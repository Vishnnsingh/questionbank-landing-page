import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

import { verifyWebPayment } from '../api/subscription-api';
import { ensureValidAccessToken } from '../lib/auth-session';
import { AuthCard, AuthCardBody, AuthPageBackground } from './auth-ui';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

type VerifyState = 'loading' | 'pending' | 'success' | 'error';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function PaymentReturnPage() {
  const [state, setState] = useState<VerifyState>('loading');
  const [message, setMessage] = useState('Verifying your payment…');

  useEffect(() => {
    let cancelled = false;

    async function verify() {
      const params = new URLSearchParams(window.location.search);
      const orderId = params.get('order_id')?.trim();
      const subscriptionId = params.get('subscription_id')?.trim();

      if (!orderId && !subscriptionId) {
        if (!cancelled) {
          window.location.href = '/choose-plan';
        }
        return;
      }

      try {
        const accessToken = await ensureValidAccessToken();
        if (!accessToken) {
          window.location.href = '/login';
          return;
        }

        for (let attempt = 0; attempt < 8; attempt += 1) {
          const result = await verifyWebPayment(accessToken, { orderId, subscriptionId });
          if (cancelled) return;

          if (result.pending) {
            setState('pending');
            setMessage(result.message || 'Payment is still processing. Please wait…');
            await sleep(2000);
            continue;
          }

          setState('success');
          setMessage('Payment successful! Your subscription is now active.');
          return;
        }

        setState('error');
        setMessage('Payment verification timed out. Please try again from Choose Plan.');
        setTimeout(() => {
          window.location.href = '/choose-plan';
        }, 2500);
      } catch (err) {
        if (!cancelled) {
          setState('error');
          setMessage(
            err instanceof Error ? err.message : 'Payment verification failed.',
          );
          setTimeout(() => {
            window.location.href = '/choose-plan';
          }, 2500);
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, []);

  const icon =
    state === 'success' ? (
      <CheckCircle2 className="size-14 text-emerald-600" />
    ) : (
      <Loader2 className="size-14 animate-spin text-[#00a897]" />
    );

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="choosePlan" />
      <SideNav />

      <main className="relative flex min-h-[70vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <AuthCard>
            <AuthCardBody>
              <div className="flex flex-col items-center py-6 text-center">
                {icon}
                <h1 className="mt-6 text-2xl font-bold text-slate-950">
                  {state === 'success'
                    ? 'Payment complete'
                    : state === 'error'
                      ? 'Payment issue'
                      : 'Processing payment'}
                </h1>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{message}</p>

                {state === 'success' ? (
                  <a
                    href="/choose-plan"
                    className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#00a897] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                  >
                    Back to plans
                  </a>
                ) : null}

                {state === 'error' ? (
                  <a
                    href="/choose-plan"
                    className="mt-8 inline-flex items-center justify-center rounded-xl bg-[#00a897] px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
                  >
                    Back to Choose Plan
                  </a>
                ) : null}
              </div>
            </AuthCardBody>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}

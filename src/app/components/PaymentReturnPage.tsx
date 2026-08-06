import { useEffect, useState } from 'react';

import { verifyWebPaymentWithRetry } from '../api/subscription-api';
import { ensureValidAccessToken } from '../lib/auth-session';
import { resolveVerifyFeedback } from '../lib/payment-gateway-status';
import { formatPaymentUserMessage } from '../lib/payment-messages';
import { AuthCard, AuthCardBody, AuthPageBackground } from './auth-ui';
import { PaymentFeedback, type PaymentFeedbackPhase } from './PaymentFeedback';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const REDIRECT_DELAY_MS = 2200;

export function PaymentReturnPage() {
  const [phase, setPhase] = useState<PaymentFeedbackPhase>('processing');
  const [message, setMessage] = useState(
    'Processing payment… Waiting for final confirmation. Please do not close this page.',
  );
  const [gatewayStatus, setGatewayStatus] = useState('PROCESSING');

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

        // Keep Processing until poll returns verified success/failed (webhook may settle DB).
        setPhase('processing');
        setMessage('Processing payment… Confirming with server…');
        setGatewayStatus('PROCESSING');

        const result = await verifyWebPaymentWithRetry(
          accessToken,
          { orderId, subscriptionId },
          6,
        );
        if (cancelled) return;

        const feedback = resolveVerifyFeedback(result);
        setGatewayStatus(feedback.gatewayStatus || '');
        setMessage(feedback.message);

        if (feedback.state === 'success' || feedback.state === 'failed') {
          setPhase(feedback.state);
          return;
        }

        setPhase('failed');
        setGatewayStatus(feedback.gatewayStatus || 'PENDING');
        setMessage(
          feedback.message ||
            'Payment is still pending. Webhook will update status — check Choose Plan shortly, or retry.',
        );
      } catch (err) {
        if (!cancelled) {
          setPhase('failed');
          setGatewayStatus('');
          setMessage(
            formatPaymentUserMessage(
              err,
              'Payment verification failed. Please try again from Choose Plan.',
            ),
          );
        }
      }
    }

    verify();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (phase !== 'success' && phase !== 'failed') return;

    const timer = window.setTimeout(() => {
      window.location.href = '/choose-plan';
    }, REDIRECT_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, [phase]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-teal-50/30 to-blue-50">
      <AuthPageBackground />
      <SEO page="choosePlan" />
      <SideNav />

      <main className="relative flex min-h-[70vh] items-center justify-center px-4 py-10">
        <div className="w-full max-w-lg">
          <AuthCard>
            <AuthCardBody>
              <PaymentFeedback
                phase={phase}
                message={message}
                gatewayStatus={gatewayStatus}
                showElapsed={phase === 'waiting' || phase === 'processing'}
                action={
                  phase === 'success' || phase === 'failed' ? (
                    <div className="flex flex-col items-center gap-3">
                      <p className="text-sm text-slate-500">Redirecting to plans…</p>
                      {phase === 'failed' ? (
                        <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row sm:items-center sm:justify-center">
                          <a
                            href="/choose-plan"
                            className="inline-flex items-center justify-center rounded-xl bg-[#00a897] px-6 py-3 text-sm font-semibold text-white"
                          >
                            Retry
                          </a>
                          <a
                            href="/choose-plan"
                            className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                          >
                            Back to plan
                          </a>
                        </div>
                      ) : null}
                    </div>
                  ) : null
                }
              />
            </AuthCardBody>
          </AuthCard>
        </div>
      </main>
    </div>
  );
}

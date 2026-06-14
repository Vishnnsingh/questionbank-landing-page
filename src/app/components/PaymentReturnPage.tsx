import { useEffect, useState } from 'react';

import { verifyWebPayment } from '../api/subscription-api';
import { ensureValidAccessToken } from '../lib/auth-session';
import { resolveVerifyFeedback } from '../lib/payment-gateway-status';
import { formatPaymentUserMessage } from '../lib/payment-messages';
import { AuthCard, AuthCardBody, AuthPageBackground } from './auth-ui';
import { PaymentFeedback, type PaymentFeedbackPhase } from './PaymentFeedback';
import { SEO } from './SEO';
import { SideNav } from './SideNav';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
const REDIRECT_DELAY_MS = 2200;

export function PaymentReturnPage() {
  const [phase, setPhase] = useState<PaymentFeedbackPhase>('waiting');
  const [message, setMessage] = useState('Verifying your payment. Please do not close this page…');
  const [gatewayStatus, setGatewayStatus] = useState('');

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

          const feedback = resolveVerifyFeedback(result);
          setGatewayStatus(feedback.gatewayStatus);
          setMessage(feedback.message);

          if (feedback.state === 'pending') {
            setPhase('waiting');
            await sleep(2000);
            continue;
          }

          setPhase(
            feedback.state === 'success' || feedback.state === 'failed'
              ? feedback.state
              : 'waiting',
          );
          return;
        }

        setPhase('failed');
        setGatewayStatus('TIMEOUT');
        setMessage('Payment verification timed out. Please check Choose Plan or try again.');
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
                showElapsed={phase === 'waiting'}
                action={
                  phase === 'success' || phase === 'failed' ? (
                    <p className="text-sm text-slate-500">Redirecting to plans…</p>
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

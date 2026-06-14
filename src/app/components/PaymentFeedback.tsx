import { CheckCircle2, Loader2, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';

export type PaymentFeedbackPhase = 'waiting' | 'success' | 'failed';

type PaymentFeedbackProps = {
  phase: PaymentFeedbackPhase;
  title?: string;
  message: string;
  gatewayStatus?: string;
  showElapsed?: boolean;
  action?: React.ReactNode;
};

export function PaymentFeedback({
  phase,
  title,
  message,
  gatewayStatus,
  showElapsed = phase === 'waiting',
  action,
}: PaymentFeedbackProps) {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!showElapsed) return;
    setElapsed(0);
    const timer = window.setInterval(() => {
      setElapsed((value) => value + 1);
    }, 1000);
    return () => window.clearInterval(timer);
  }, [showElapsed, phase]);

  const icon =
    phase === 'success' ? (
      <CheckCircle2 className="size-14 text-emerald-600" />
    ) : phase === 'failed' ? (
      <XCircle className="size-14 text-red-600" />
    ) : (
      <Loader2 className="size-14 animate-spin text-[#00a897]" />
    );

  const heading =
    title ||
    (phase === 'success'
      ? 'Payment successful'
      : phase === 'failed'
        ? 'Payment failed'
        : 'Processing payment');

  return (
    <div className="flex flex-col items-center py-6 text-center">
      {icon}
      <h1 className="mt-6 text-2xl font-bold text-slate-950">{heading}</h1>
      <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">{message}</p>

      {gatewayStatus ? (
        <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
          Gateway status: {gatewayStatus}
        </p>
      ) : null}

      {showElapsed && phase === 'waiting' ? (
        <p className="mt-4 text-xs font-medium text-slate-400">
          Please wait… {elapsed}s
        </p>
      ) : null}

      {phase === 'waiting' ? (
        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-teal-100">
          <div className="h-full w-1/3 animate-pulse rounded-full bg-[#00a897]" />
        </div>
      ) : null}

      {action ? <div className="mt-8">{action}</div> : null}
    </div>
  );
}

import { useEffect, useMemo, useState } from 'react';

/** PrepMagic-UI — Counter Section (limited-time offer + countdown) */

const F = {
  white: '#FFFFFF',
  cta: '#0F8F84',
  /** Figma “Offer!” accent (86:837) */
  offerAccent: '#6DCEAE',
  counterLabel: '#A63426',
  counterSecond: '#212121',
  counterUnit: '#A6A6A6',
  timerDivider: '#F2F2F2',
  timerShadow: '0px 1px 30.8px rgba(0, 0, 0, 0.09)',
} as const;

const OFFER_ENDS_AT = new Date('2026-08-28T23:59:59+05:30');

function pad2(n: number) {
  return String(Math.max(0, n)).padStart(2, '0');
}

function useCountdown(target: Date) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, []);
  return useMemo(() => {
    const ms = Math.max(0, target.getTime() - now);
    const s = Math.floor(ms / 1000);
    return {
      days: Math.floor(s / 86400),
      hours: Math.floor((s % 86400) / 3600),
      minutes: Math.floor((s % 3600) / 60),
      seconds: s % 60,
    };
  }, [now, target]);
}

export function CounterSection() {
  const t = useCountdown(OFFER_ENDS_AT);
  const cells = [
    { value: pad2(t.days), label: 'Days', color: F.cta },
    { value: pad2(t.hours), label: 'Hour', color: F.cta },
    { value: pad2(t.minutes), label: 'Minute', color: F.cta },
    { value: pad2(t.seconds), label: 'Second', color: F.counterSecond },
  ];

  return (
    <section
      className="w-full bg-white px-4 pb-16 pt-10 sm:px-6 sm:pb-20 sm:pt-12 lg:px-8"
      aria-labelledby="counter-heading"
    >
      <div className="mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
        <p
          className="text-[14px] font-semibold uppercase tracking-[2px] sm:text-[16px] sm:leading-[21px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.counterLabel,
          }}
        >
          Counter Section
        </p>
        <h2
          id="counter-heading"
          className="mt-[7px] text-[28px] font-semibold leading-tight sm:text-[42px] sm:leading-[56px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: '#000000',
          }}
        >
          Limited-Time{' '}
          <span style={{ color: F.offerAccent }}>Offer!</span>
        </h2>
        <p
          className="mt-[13px] max-w-[679px] text-[15px] leading-[1.5551] sm:text-[18px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: '#000000',
            opacity: 0.8,
          }}
        >
          Get &apos;The Guide&apos; now and enjoy a special one-month free access
          to our upcoming AI-scoring platform with over 5000 test questions. Act
          fast – this offer expires in
        </p>
        <div
          className="mt-[22px] grid w-full max-w-[388px] grid-cols-4 overflow-hidden"
          style={{
            height: 81,
            background: F.white,
            boxShadow: F.timerShadow,
            borderRadius: 6,
          }}
        >
          {cells.map((cell, i) => (
            <div
              key={cell.label}
              className="flex flex-col items-center justify-center"
              style={
                i > 0
                  ? { borderLeft: `1px solid ${F.timerDivider}` }
                  : undefined
              }
            >
              <span
                className="text-[28px] font-semibold leading-[69%] sm:text-[34px]"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: cell.color,
                }}
              >
                {cell.value}
              </span>
              <span
                className="mt-[10px] text-[12px] font-medium"
                style={{
                  fontFamily: "'Inter', system-ui, sans-serif",
                  color: F.counterUnit,
                }}
              >
                {cell.label}
              </span>
            </div>
          ))}
        </div>
        <a
          href="/signup"
          className="mt-[34px] inline-flex h-[56px] w-full max-w-[221px] items-center justify-center text-[16px] font-bold leading-6 text-white transition hover:opacity-95"
          style={{
            background: F.cta,
            borderRadius: 10,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Start 2-day free access
        </a>
      </div>
    </section>
  );
}

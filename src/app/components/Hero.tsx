import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { formatInr } from '../lib/plan-catalog';
import { usePublicPlanPricing } from '../lib/usePublicPlanPricing';

/**
 * PrepMagic-UI Figma (46:361) — full-bleed HERO
 * Trial badge amount/days from /plans-catalog API (same as Choose Plan).
 */

const F = {
  white: '#FFFFFF',
  heroGray: '#F0F0F0',
  gradient:
    'linear-gradient(97.77deg, rgba(20, 184, 166, 0.5) 0%, rgba(208, 247, 234, 0.5) 97.73%)',
  cta: '#0F8F84',
  heading: '#1B2A4A',
  body: '#444444',
  label: '#4B5A78',
  badgeText: '#161618',
  badgeBorder: '#C7D0E6',
  qrBorder: 'rgba(15, 143, 132, 0.5)',
  statValue: '#424750',
  statLabel: '#6B6B6B',
  line: '#979797',
  statsShadow: '0px 20px 50px rgba(226, 217, 220, 0.3)',
  qrShadow: '0px 1.25806px 9.43548px rgba(59, 58, 58, 0.25)',
} as const;

const ASSETS = {
  heroBg: '/image/hero-bg-main.svg',
  heroBgOverlay: '/image/hero-bg-layer2.svg',
  girl: '/image/girl-hero.png',
  qr: '/image/qr-hero.svg',
  ellipse: '/image/ellipse-dot.svg',
} as const;

const STATS = [
  {
    end: 10,
    durationMs: 1200,
    format: (n: number) => `${n}+`,
    label: 'Years Question Bank',
  },
  {
    end: 20000,
    durationMs: 1800,
    format: (n: number) => `${n.toLocaleString('en-IN')}+`,
    label: 'Practice Questions',
  },
  {
    end: 24,
    durationMs: 1000,
    format: (n: number) => `${n}×7`,
    label: 'Learning Access',
  },
] as const;

const CONTENT_MAX = 1130;

function easeOutCubic(t: number) {
  return 1 - (1 - t) ** 3;
}

/** Count 0 → target when card becomes visible (layout/styles unchanged). */
function useCountUp(end: number, durationMs: number, active: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!active) {
      setValue(0);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / durationMs);
      setValue(Math.round(end * easeOutCubic(p)));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, end, durationMs]);

  return value;
}

function StatValue({
  end,
  durationMs,
  format,
  active,
}: {
  end: number;
  durationMs: number;
  format: (n: number) => string;
  active: boolean;
}) {
  const n = useCountUp(end, durationMs, active);
  return <>{format(n)}</>;
}

function DataCountCard({ className = '' }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const start = () => setActive(true);

    if (typeof IntersectionObserver === 'undefined') {
      start();
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          start();
          io.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid w-full grid-cols-3 bg-white max-lg:min-h-[132px] max-lg:h-auto lg:h-[174px] ${className}`}
      style={{
        borderRadius: 18,
        boxShadow: F.statsShadow,
      }}
      data-node-id="86:824"
    >
      {STATS.map((stat, i) => (
        <div
          key={stat.label}
          className="relative flex flex-col items-center justify-center px-1.5 py-5 text-center sm:px-2 sm:py-6 lg:py-0"
        >
          {i > 0 ? (
            <span
              aria-hidden
              className="absolute left-0 top-1/2 w-px -translate-y-1/2 max-lg:h-16 lg:h-[98px]"
              style={{ background: F.line }}
            />
          ) : null}
          <span
            className="font-semibold leading-none max-lg:text-[28px] sm:max-lg:text-[34px] lg:text-[56px] lg:leading-[62px]"
            style={{
              fontFamily: "'Poppins', system-ui, sans-serif",
              color: F.statValue,
            }}
          >
            <StatValue
              end={stat.end}
              durationMs={stat.durationMs}
              format={stat.format}
              active={active}
            />
          </span>
          <span
            className="mt-1.5 text-[11px] leading-snug sm:mt-2 sm:text-[14px] sm:leading-5 lg:text-[16px] lg:leading-6"
            style={{
              fontFamily: "'Inter', system-ui, sans-serif",
              color: F.statLabel,
            }}
          >
            {stat.label}
          </span>
        </div>
      ))}
    </div>
  );
}

function HeroCopy({
  trialDays,
  trialAmount,
  className = '',
  style,
}: {
  trialDays: number;
  trialAmount: number;
  className?: string;
  style?: CSSProperties;
}) {
  const dayWord = trialDays === 1 ? 'day' : 'days';

  return (
    <div className={`text-left ${className}`} style={style}>
      <div
        className="inline-flex h-10 items-center gap-2.5 px-3.5 sm:h-11"
        style={{
          background: F.white,
          border: `1px solid ${F.badgeBorder}`,
          borderRadius: 20,
        }}
      >
        <img
          src={ASSETS.ellipse}
          alt=""
          aria-hidden
          className="size-[7px] shrink-0"
        />
        <span
          className="text-[13px] sm:text-[14px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.badgeText,
          }}
        >
          {trialDays}-{dayWord} free trial in just{' '}
          <span className="font-semibold" style={{ color: F.cta }}>
            {formatInr(trialAmount)}
          </span>
        </span>
      </div>

      <h1
        className="mt-3 max-w-[568px] text-[28px] font-bold leading-[1.25] sm:mt-4 sm:text-[36px] lg:text-[42px] lg:leading-[1.3]"
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          color: F.heading,
        }}
      >
        Prepare Smarter for Boards with{' '}
        <span style={{ color: F.cta }}>30,000+</span> Previous Year Questions
      </h1>

      <p
        className="mt-3 max-w-[460px] text-[15px] leading-[1.5] sm:mt-4 sm:text-[17px] lg:text-[18px]"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: F.body,
        }}
      >
        Discover repeated questions, practice chapter-wise, and focus on topics
        most likely to appear in your exams.
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8 sm:gap-5">
        <a
          href="/signup"
          className="inline-flex h-12 w-[153px] shrink-0 items-center justify-center text-[15px] font-bold text-white transition hover:opacity-95 sm:h-[56px] sm:w-[180px] sm:text-[16px]"
          style={{
            background: F.cta,
            borderRadius: 10,
            fontFamily: "'Inter', system-ui, sans-serif",
          }}
        >
          Register Now
        </a>
        <div
          className="inline-flex h-12 w-[186px] shrink-0 items-center gap-2.5 px-2.5 sm:h-[56px]"
          style={{
            border: `1px solid ${F.qrBorder}`,
            borderRadius: 10,
          }}
        >
          <img
            src={ASSETS.qr}
            alt="QR code to download the Prepmagic app"
            className="size-[36px] shrink-0 object-contain sm:size-[39px]"
            width={39}
            height={39}
            style={{ filter: `drop-shadow(${F.qrShadow})` }}
          />
          <p
            className="text-left text-[12px] font-medium leading-[1.35]"
            style={{
              fontFamily: "'Jost', 'DM Sans', system-ui, sans-serif",
              color: F.badgeText,
            }}
          >
            Scan QR code to
            <br />
            download the app
          </p>
        </div>
      </div>

      <p
        className="mt-4 text-[13px] font-bold sm:mt-5"
        style={{
          fontFamily: "'Inter', system-ui, sans-serif",
          color: F.label,
        }}
      >
        CBSE &amp; Bihar Board · Class 10 &amp; 12
      </p>
    </div>
  );
}

function HeroDesktop({
  trialDays,
  trialAmount,
}: {
  trialDays: number;
  trialAmount: number;
}) {
  const stageH = 720;

  return (
    <div
      className="relative mx-auto hidden w-full max-w-[1440px] overflow-visible lg:block"
      style={{ height: stageH }}
    >
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2"
        style={{ width: CONTENT_MAX, maxWidth: '92%', height: stageH }}
      >
        <div className="absolute left-0 top-10 z-20 max-w-[568px]">
          <HeroCopy trialDays={trialDays} trialAmount={trialAmount} />
        </div>

        <div
          className="pointer-events-none absolute bottom-[52px] right-0 z-[15] overflow-hidden"
          style={{
            width: '38%',
            height: 620,
          }}
          data-node-id="55:531"
        >
          <img
            src={ASSETS.girl}
            alt="Student preparing for board exams with Prepmagic"
            className="h-full w-full object-contain object-bottom"
            style={{ objectPosition: 'center bottom' }}
            draggable={false}
          />
        </div>
      </div>
    </div>
  );
}

function HeroMobile({
  trialDays,
  trialAmount,
}: {
  trialDays: number;
  trialAmount: number;
}) {
  return (
    <div className="relative z-10 w-full overflow-visible lg:hidden">
      <div
        className="relative z-20 mx-auto w-full pt-6 pb-1 sm:pt-8"
        style={{ maxWidth: CONTENT_MAX }}
      >
        <div className="px-[6%] sm:px-8">
          <HeroCopy trialDays={trialDays} trialAmount={trialAmount} />
        </div>
      </div>

      <div
        className="pointer-events-none relative z-[15] mx-auto -mt-8 overflow-hidden sm:-mt-12"
        style={{ maxWidth: CONTENT_MAX, maxHeight: 260 }}
      >
        <div className="flex justify-end overflow-hidden px-[4%]">
          <div
            className="relative w-[52%] max-w-[240px] overflow-hidden sm:w-[40%] sm:max-w-[260px]"
            style={{ maxHeight: 260 }}
          >
            <img
              src={ASSETS.girl}
              alt="Student preparing for board exams with Prepmagic"
              className="relative block h-auto w-full object-contain object-bottom"
              style={{
                maxHeight: 280,
                transform: 'translateY(48px)',
              }}
              draggable={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export function Hero() {
  const { trialDays, trialAmount } = usePublicPlanPricing();

  return (
    <div className="relative w-full overflow-visible">
      <section
        className="relative w-full overflow-visible pb-0"
        style={{ background: F.heroGray }}
        aria-label="Prepmagic hero"
      >
        <div
          className="pointer-events-none absolute inset-x-0 top-0 h-full min-h-[520px] w-full lg:min-h-[720px]"
          aria-hidden
        >
          <div className="absolute inset-0" style={{ background: F.heroGray }} />
          <div className="absolute inset-0" style={{ background: F.gradient }} />
          <img
            src={ASSETS.heroBg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <img
            src={ASSETS.heroBgOverlay}
            alt=""
            className="absolute inset-0 h-full w-full object-cover object-center"
            style={{ opacity: 0.5 }}
          />
        </div>

        <HeroDesktop trialDays={trialDays} trialAmount={trialAmount} />
        <HeroMobile trialDays={trialDays} trialAmount={trialAmount} />
      </section>

      <div
        className="relative z-40 mx-auto w-full -mt-[70px] px-[6%] sm:-mt-[78px] sm:px-8 lg:-mt-[87px] lg:px-0"
        style={{ maxWidth: CONTENT_MAX }}
      >
        <DataCountCard />
      </div>

      <div className="h-10 w-full bg-white sm:h-12 lg:h-14" aria-hidden />
    </div>
  );
}

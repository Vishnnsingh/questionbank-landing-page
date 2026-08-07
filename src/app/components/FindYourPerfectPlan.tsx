import { Check, Flame } from 'lucide-react';
import {
  SCHEMA_IN_STOCK,
  SCHEMA_NEW_CONDITION,
  SCHEMA_ORG_URL,
} from '../config/env';
import { absoluteUrl, PRODUCT_IMAGE_URL, SITE_NAME, products } from '../seo';
import { usePublicPlanPricing } from '../lib/usePublicPlanPricing';
import type { PlanCatalog } from '../lib/plan-catalog';

/**
 * PrepMagic-UI — Choose Your Plan (Figma home pricing cards)
 * Prices from /plans-catalog API; layout matches Class 10 / Class 12 card mock.
 */

const F = {
  sectionBg: '#FFFFFF',
  label: '#A63426',
  heading: '#0F172A',
  body: '#4B5A78',
  /** Card accent — same for CTA, price, Annual Plan, badge */
  brand: '#0F8F84',
  muted: '#6B7280',
  check: '#9CA3AF',
  strike: '#9DA4B5',
  border: '#E5E7EB',
  white: '#FFFFFF',
  cardBg: '#F8F9FC',
  badge: '#F2C94C',
  badgeText: '#1A1A1A',
  cardShadow: '0px 4px 24px rgba(15, 23, 42, 0.06)',
} as const;

/** Same feature list on both cards — left-aligned (not staggered/centered). */
const PLAN_FEATURES = [
  '10 Years Question Bank',
  'AI Exam Prediction',
  'Unlimited Mock Tests',
  'Performance Analytics',
  'Chapter-wise Practice',
] as const;

function planUi(
  catalog: PlanCatalog,
  productIndex: 0 | 1,
  classKey: '10' | '12',
) {
  return {
    classKey,
    forLabel: `For Class ${classKey}`,
    planName: 'Annual Plan',
    salePrice: Number(catalog.yearly.displayAmount) || 0,
    originalPrice: Number(catalog.yearly.mrpDisplay) || 0,
    features: PLAN_FEATURES,
    product: products[productIndex],
  };
}

function PlanCard({
  plan,
  loading,
}: {
  plan: ReturnType<typeof planUi>;
  loading?: boolean;
}) {
  const showStrike = plan.originalPrice > plan.salePrice && plan.salePrice > 0;

  return (
    <article
      itemScope
      itemType={`${SCHEMA_ORG_URL}/Product`}
      className="relative flex w-full max-w-[451px] flex-col rounded-[16px] border-[#BFBFBF] border-2 px-7 pb-8 pt-7 sm:px-8 sm:pb-9 sm:pt-8 md:min-h-[601px]"
      style={{
        borderColor: F.border,
        background: F.cardBg,
        boxShadow: F.cardShadow,
      }}
    >
      {/* Most Popular — half above top edge; gold badge + dark text (Figma) */}
      <span
        className="absolute right-5 z-20 inline-flex h-[24px] -translate-y-1/2 items-center gap-1 rounded-full px-3 text-[11px] font-bold leading-none sm:right-7 sm:text-[12px]"
        style={{
          top: 0,
          fontFamily: "'DM Sans', system-ui, sans-serif",
          background: F.badge,
          color: F.badgeText,
        }}
      >
        <Flame className="size-3" strokeWidth={2.25} aria-hidden />
        Most Popular
      </span>

      {/* Class label — CTA-matched corner radius, white fill */}
      <div className="relative z-10 mb-1 flex min-h-[28px] items-center">
        <span
          className="inline-flex items-center px-3 py-1 text-[12px] font-semibold sm:text-[13px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            background: F.white,
            color: F.brand,
            borderRadius: 10,
          }}
        >
          {plan.forLabel}
        </span>
      </div>

      <meta itemProp="image" content={PRODUCT_IMAGE_URL} />
      <span
        itemProp="brand"
        itemScope
        itemType={`${SCHEMA_ORG_URL}/Brand`}
        className="sr-only"
      >
        <meta itemProp="name" content={SITE_NAME} />
      </span>
      <meta itemProp="name" content={`${plan.forLabel} — ${plan.planName}`} />
      <p className="sr-only" itemProp="description">
        {plan.product.description}
      </p>

      {/* PM logo */}
      <div className="mx-auto mt-4 flex size-[88px] items-center justify-center sm:mt-5 sm:size-[100px]">
        <img
          src="/iconb.png"
          alt=""
          className="h-full w-full object-contain"
          width={100}
          height={100}
        />
      </div>

      {/* Annual Plan — same color as Get Started */}
      <h3
        className="mt-4 text-center text-[22px] font-bold tracking-[-0.01em] sm:text-[24px]"
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          color: F.brand,
        }}
      >
        {plan.planName}
      </h3>

      {/* Dynamic prices from API */}
      <div
        className="mt-3 flex min-h-[44px] flex-wrap items-baseline justify-center gap-x-2 gap-y-1"
        itemProp="offers"
        itemScope
        itemType={`${SCHEMA_ORG_URL}/Offer`}
      >
        <meta itemProp="priceCurrency" content="INR" />
        <meta
          itemProp="price"
          content={plan.salePrice > 0 ? String(plan.salePrice) : undefined}
        />
        <meta itemProp="availability" content={SCHEMA_IN_STOCK} />
        <meta itemProp="itemCondition" content={SCHEMA_NEW_CONDITION} />
        <meta itemProp="url" content={absoluteUrl('/#pricing')} />

        {loading ? (
          <span
            className="inline-block h-9 w-36 animate-pulse rounded-md bg-slate-100"
            aria-hidden
          />
        ) : (
          <>
            {showStrike ? (
              <span
                className="text-[15px] font-semibold line-through sm:text-[16px]"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: F.strike,
                }}
              >
                ₹{plan.originalPrice}
              </span>
            ) : null}

            <span
              className="inline-flex items-baseline font-semibold"
              style={{
                fontFamily: "'DM Sans', system-ui, sans-serif",
                color: F.brand,
              }}
            >
              <span className="text-[34px] leading-none tracking-tight sm:text-[38px]">
                ₹{plan.salePrice || '—'}
              </span>
              <span className="text-[15px] font-semibold sm:text-[16px]">
                /year
              </span>
            </span>
          </>
        )}
      </div>

      {/* Features — left-aligned single column (same line on both cards) */}
      <ul className="mt-7 w-full max-w-[280px] self-center sm:mt-8 sm:max-w-[300px]">
        {plan.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2.5 py-[7px] text-[14px] sm:gap-3 sm:text-[15px]"
            style={{
              fontFamily: "'DM Sans', system-ui, sans-serif",
              color: F.muted,
            }}
          >
            <span className="inline-flex w-5 shrink-0 items-center justify-center">
              <Check
                className="size-4 sm:size-[18px]"
                strokeWidth={2.5}
                style={{ color: F.check }}
                aria-hidden
              />
            </span>
            <span className="min-w-0 flex-1 leading-snug">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Large gap above CTA — same visual breathing room as Figma mock */}
      <a
        href="/signup"
        className="mt-12 flex h-[52px] w-full items-center justify-center text-[15px] font-bold text-white transition hover:opacity-95 sm:mt-14 sm:h-[56px] sm:text-[16px]"
        style={{
          background: F.brand,
          borderRadius: 10,
          fontFamily: "'Inter', 'DM Sans', system-ui, sans-serif",
        }}
      >
        Get Started
      </a>
    </article>
  );
}

export function FindYourPerfectPlan() {
  const { class10, class12, loading } = usePublicPlanPricing();
  const plans = [
    planUi(class10, 0, '10'),
    planUi(class12, 1, '12'),
  ];

  return (
    <section
      id="pricing"
      className="w-full px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20"
      style={{ background: F.sectionBg }}
      aria-labelledby="perfect-plan-heading"
    >
      <div className="mx-auto w-full max-w-[1130px]">
        <p
          className="text-center text-[13px] font-semibold uppercase tracking-[0.14em] sm:text-[14px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.label,
          }}
        >
          FIND YOUR PERFECT PLAN
        </p>

        <h2
          id="perfect-plan-heading"
          className="mx-auto mt-2 text-center text-[28px] font-medium leading-tight tracking-[-0.48px] sm:mt-3 sm:text-[42px] sm:leading-[48px]"
          style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            color: F.heading,
          }}
        >
          Choose Your Plan
        </h2>

        <p
          className="mx-auto mt-3 max-w-[480px] text-center text-[15px] leading-relaxed sm:mt-4 sm:text-[16px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.body,
          }}
        >
          Get access to smart preparation tools, personalized insights, and
          exam-focused practice.
        </p>

        <div className="mx-auto mt-10 flex max-w-[1024px] flex-col items-center justify-center gap-8 md:mt-12 md:flex-row md:items-stretch md:gap-[102px] lg:gap40">
          {plans.map((plan) => (
            <PlanCard key={plan.classKey} plan={plan} loading={loading} />
          ))}
        </div>
      </div>
    </section>
  );
}

/** @deprecated name kept for imports — same as FindYourPerfectPlan */
export function Pricing() {
  return <FindYourPerfectPlan />;
}

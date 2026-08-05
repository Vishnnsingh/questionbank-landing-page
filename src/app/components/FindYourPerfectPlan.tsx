import { Check } from 'lucide-react';
import {
  SCHEMA_IN_STOCK,
  SCHEMA_NEW_CONDITION,
  SCHEMA_ORG_URL,
} from '../config/env';
import { absoluteUrl, PRODUCT_IMAGE_URL, SITE_NAME, products } from '../seo';
import { usePublicPlanPricing } from '../lib/usePublicPlanPricing';
import type { PlanCatalog } from '../lib/plan-catalog';

/**
 * Choose Your Plan — Class 10 / Class 12 prices from /plans-catalog API
 * (same source as login → Choose Plan). CTA: home style #0F8F84 · r10
 */

const F = {
  sectionBg: '#F8F8F8',
  label: '#A63426',
  heading: '#0F172A',
  body: '#4B5A78',
  muted: '#575E71',
  strike: '#9DA4B5',
  price: '#14B8A6',
  cta: '#0F8F84',
  border: '#BFBFBF',
  badge: '#F2C94C',
  badgeText: '#222222',
  white: '#FFFFFF',
} as const;

const PLAN_FEATURES = {
  '10': [
    '10 Years Question Bank',
    'AI Exam Prediction',
    'Unlimited Mock Tests',
    'Performance Analytics',
    'Chapter-wise Practice',
  ],
  '12': [
    '10 Years Question Bank',
    'AI Exam Prediction',
    'Unlimited Mock Tests',
    'Career Guidance',
    'College Information',
  ],
} as const;

function planUi(
  catalog: PlanCatalog,
  productIndex: 0 | 1,
  classKey: '10' | '12',
) {
  return {
    classLabel: `Class ${classKey}`,
    subtitle: 'Annual Plan',
    salePrice: catalog.yearly.displayAmount,
    originalPrice: catalog.yearly.mrpDisplay,
    popular: true,
    features: PLAN_FEATURES[classKey],
    product: products[productIndex],
  };
}

export function FindYourPerfectPlan() {
  const { class10, class12 } = usePublicPlanPricing();
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
          className="text-center text-[14px] font-semibold uppercase tracking-[2px] sm:text-[16px]"
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
          className="mx-auto mt-3 max-w-[464px] text-center text-[15px] leading-relaxed sm:mt-4 sm:text-[16px]"
          style={{
            fontFamily: "'DM Sans', system-ui, sans-serif",
            color: F.body,
          }}
        >
          Get access to smart preparation tools, personalized insights, and
          exam-focused practice.
        </p>

        <div className="mx-auto mt-10 grid max-w-[980px] grid-cols-1 gap-8 md:mt-12 md:grid-cols-2 md:gap-10">
          {plans.map((plan) => (
            <article
              key={plan.classLabel}
              itemScope
              itemType={`${SCHEMA_ORG_URL}/Product`}
              className="relative flex flex-col rounded-[14px] border bg-white px-6 pb-7 pt-8 sm:px-8 sm:pb-8 sm:pt-10"
              style={{
                borderColor: F.border,
                minHeight: 520,
              }}
            >
              {plan.popular ? (
                <div
                  className="absolute -top-3 right-6 flex h-[22px] items-center gap-1.5 rounded-[20px] px-3 sm:right-8"
                  style={{ background: F.badge }}
                >
                  <span
                    className="whitespace-nowrap text-[11px] font-bold"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      color: F.badgeText,
                    }}
                  >
                    Most Popular
                  </span>
                </div>
              ) : null}

              <meta itemProp="image" content={PRODUCT_IMAGE_URL} />
              <span
                itemProp="brand"
                itemScope
                itemType={`${SCHEMA_ORG_URL}/Brand`}
                className="sr-only"
              >
                <meta itemProp="name" content={SITE_NAME} />
              </span>

              <div className="mx-auto size-[120px] overflow-hidden sm:size-[172px]">
                <img
                  src="/iconb.png"
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>

              <h3
                className="mt-4 text-center text-[24px] font-semibold sm:text-[28px]"
                style={{
                  fontFamily: "'Playfair Display', Georgia, serif",
                  color: F.heading,
                }}
              >
                <span itemProp="name">{plan.classLabel}</span>
              </h3>
              <p
                className="mt-1 text-center text-[16px] font-semibold sm:text-[18px]"
                style={{
                  fontFamily: "'DM Sans', system-ui, sans-serif",
                  color: F.muted,
                }}
              >
                {plan.subtitle}
              </p>
              <p className="sr-only" itemProp="description">
                {plan.product.description}
              </p>

              <div
                className="mt-3 flex flex-wrap items-end justify-center gap-x-3 gap-y-1"
                itemProp="offers"
                itemScope
                itemType={`${SCHEMA_ORG_URL}/Offer`}
              >
                <meta itemProp="priceCurrency" content="INR" />
                <meta itemProp="price" content={String(plan.salePrice)} />
                <meta itemProp="availability" content={SCHEMA_IN_STOCK} />
                <meta
                  itemProp="itemCondition"
                  content={SCHEMA_NEW_CONDITION}
                />
                <meta itemProp="url" content={absoluteUrl('/#pricing')} />

                {plan.originalPrice > plan.salePrice ? (
                  <span
                    className="flex items-center gap-0.5 text-[22px] font-semibold line-through"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      color: F.strike,
                    }}
                  >
                    <span className="text-[18px]">₹</span>
                    {plan.originalPrice}
                  </span>
                ) : null}

                <span
                  className="flex items-baseline gap-1 font-semibold"
                  style={{
                    fontFamily: "'DM Sans', system-ui, sans-serif",
                    color: F.price,
                  }}
                >
                  <span className="text-[32px] sm:text-[40px]">₹</span>
                  <span className="text-[32px] leading-none sm:text-[40px]">
                    {plan.salePrice}
                  </span>
                  <span className="text-[18px] sm:text-[22px]">/year</span>
                </span>
              </div>

              <ul className="mt-8 flex flex-1 flex-col gap-[13px]">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2.5 text-[15px] sm:text-[16px]"
                    style={{
                      fontFamily: "'DM Sans', system-ui, sans-serif",
                      color: F.muted,
                    }}
                  >
                    <span
                      className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full text-white"
                      style={{ background: F.cta }}
                      aria-hidden
                    >
                      <Check className="size-3.5" strokeWidth={2.5} />
                    </span>
                    {feature}
                  </li>
                ))}
              </ul>

              <a
                href="/signup"
                className="mt-8 flex h-[56px] w-full items-center justify-center text-[16px] font-bold text-white transition hover:opacity-95"
                style={{
                  background: F.cta,
                  borderRadius: 10,
                  fontFamily: "'Inter', system-ui, sans-serif",
                }}
              >
                Get Started
              </a>
            </article>
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

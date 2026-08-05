export type PlanType = 'trial_2day' | 'yearly';

export type PlanCatalog = {
  class: '10' | '12';
  trial: {
    label: string;
    displayAmount: number;
    durationDays?: number;
    autoRenew: boolean;
    renewsTo?: 'yearly';
    available?: boolean;
    lockedReason?: string | null;
    hint: string;
  };
  yearly: {
    label: string;
    displayAmount: number;
    mrpDisplay: number;
    discountPercent: number;
    autoRenew: boolean;
    hint: string;
  };
};

export function trialDurationDays(
  catalogOrTrial?: { trial?: { durationDays?: number }; durationDays?: number } | number | null,
  fallback = 2,
) {
  const raw =
    typeof catalogOrTrial === 'number'
      ? catalogOrTrial
      : catalogOrTrial?.trial?.durationDays ?? catalogOrTrial?.durationDays;
  const n = Math.round(Number(raw));
  return Number.isFinite(n) && n > 0 ? n : fallback;
}

function trialHint(trial: {
  available?: boolean;
  lockedReason?: string | null;
  autoRenew: boolean;
  renewsTo?: 'yearly';
  displayAmount?: number;
  durationDays?: number;
}) {
  if (trial.available === false) {
    return (
      trial.lockedReason ||
      'Trial already used — one trial per account. Choose the yearly plan.'
    );
  }
  const days = trialDurationDays(trial);
  const trialPay = formatInr(trial.displayAmount ?? 2);
  return `Full access for ${days} day${days === 1 ? '' : 's'} · ${trialPay} · One-time payment`;
}

function yearlyHint(autoRenew: boolean) {
  const base = 'Pay via UPI — GPay, PhonePe, Paytm';
  void autoRenew;
  return base;
}

export function isTrialPlanAvailable(catalog: PlanCatalog) {
  return catalog.trial.available !== false;
}

export function catalogAutoPayFooterNote(_catalog: PlanCatalog) {
  return null;
}

function discountPercent(mrp: number, price: number) {
  if (!mrp || mrp <= price) return 0;
  return Math.round(((mrp - price) / mrp) * 100);
}

export function formatInr(amount: number) {
  return `₹${amount}`;
}

export function planCatalogForClass(classValue: string): PlanCatalog {
  const cls = String(classValue || '').replace(/\D/g, '') === '12' ? '12' : '10';
  const durationDays = 2;

  if (cls === '12') {
    const displayAmount = 249;
    const mrpDisplay = 399;
    const trial = {
      label: `${durationDays}-Day Full Trial`,
      displayAmount: 2,
      durationDays,
      autoRenew: false,
      renewsTo: 'yearly' as const,
      available: true,
      lockedReason: null,
    };
    return {
      class: '12',
      trial: {
        ...trial,
        hint: trialHint(trial),
      },
      yearly: {
        label: 'Class 12 — 1 Year',
        displayAmount,
        mrpDisplay,
        discountPercent: discountPercent(mrpDisplay, displayAmount),
        autoRenew: false,
        hint: yearlyHint(false),
      },
    };
  }

  const displayAmount = 199;
  const mrpDisplay = 299;
  const trial = {
    label: `${durationDays}-Day Full Trial`,
    displayAmount: 2,
    durationDays,
    autoRenew: false,
    renewsTo: 'yearly' as const,
    available: true,
    lockedReason: null,
  };
  return {
    class: '10',
    trial: {
      ...trial,
      hint: trialHint(trial),
    },
    yearly: {
      label: 'Class 10 — 1 Year',
      displayAmount,
      mrpDisplay,
      discountPercent: discountPercent(mrpDisplay, displayAmount),
      autoRenew: false,
      hint: yearlyHint(false),
    },
  };
}

export function mergePlanCatalog(
  local: PlanCatalog,
  apiCatalog?: Partial<PlanCatalog> | null,
): PlanCatalog {
  if (!apiCatalog) return local;

  const trial = {
    ...local.trial,
    ...apiCatalog.trial,
    displayAmount: apiCatalog.trial?.displayAmount ?? local.trial.displayAmount,
    durationDays: apiCatalog.trial?.durationDays ?? local.trial.durationDays,
    label: apiCatalog.trial?.label ?? local.trial.label,
  };

  return {
    ...local,
    ...apiCatalog,
    class: local.class,
    trial: {
      ...trial,
      hint: trialHint(trial),
    },
    yearly: {
      ...local.yearly,
      ...apiCatalog.yearly,
      hint: yearlyHint(apiCatalog.yearly?.autoRenew ?? local.yearly.autoRenew),
    },
  };
}

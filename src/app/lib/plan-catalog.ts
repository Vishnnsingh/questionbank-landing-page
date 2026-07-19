export type PlanType = 'trial_2day' | 'yearly';

export type PlanCatalog = {
  class: '10' | '12';
  trial: {
    label: string;
    displayAmount: number;
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

function trialHint(trial: {
  available?: boolean;
  lockedReason?: string | null;
  autoRenew: boolean;
  renewsTo?: 'yearly';
  displayAmount?: number;
}) {
  if (trial.available === false) {
    return (
      trial.lockedReason ||
      'Trial already used — one trial per account. Choose the yearly plan.'
    );
  }
  const trialPay = formatInr(trial.displayAmount ?? 2);
  // Auto-payment temporarily disabled
  // if (trial.autoRenew && trial.renewsTo === 'yearly') {
  //   return `Full access for 2 days · ${trialPay} now · Yearly auto-pay after trial ends`;
  // }
  return `Full access for 2 days · ${trialPay} · One-time payment`;
}

function yearlyHint(autoRenew: boolean) {
  const base = 'Pay via UPI — GPay, PhonePe, Paytm';
  // Auto-payment temporarily disabled
  // if (!autoRenew) return base;
  // return `${base} · Auto-payment on — renews every year`;
  void autoRenew;
  return base;
}

export function isTrialPlanAvailable(catalog: PlanCatalog) {
  return catalog.trial.available !== false;
}

export function catalogAutoPayFooterNote(_catalog: PlanCatalog) {
  // Auto-payment temporarily disabled
  return null;
  /*
  const parts: string[] = [];
  if (catalog.trial.autoRenew && catalog.trial.renewsTo === 'yearly') {
    parts.push(
      `Trial: pay ${formatInr(catalog.trial.displayAmount)} now. Yearly plan auto-charges when the 2-day trial ends (if auto-pay stays on)`,
    );
  }
  if (catalog.yearly.autoRenew) {
    parts.push('Yearly plan: auto-payment renews every year after you subscribe');
  }
  if (!parts.length) return null;
  return `${parts.join('. ')}.`;
  */
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

  if (cls === '12') {
    const displayAmount = 249;
    const mrpDisplay = 499;
    const trial = {
      label: '2-Day Full Trial',
      displayAmount: 2,
      // Auto-payment temporarily disabled
      autoRenew: false,
      // autoRenew: true,
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
        // autoRenew: true,
        hint: yearlyHint(false),
      },
    };
  }

  const displayAmount = 199;
  const mrpDisplay = 399;
  const trial = {
    label: '2-Day Full Trial',
    displayAmount: 2,
    autoRenew: false,
    // autoRenew: true,
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
      // autoRenew: true,
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

export type PlanType = 'trial_2day' | 'yearly';

export type PlanCatalog = {
  class: '10' | '12';
  trial: {
    label: string;
    displayAmount: number;
    hint: string;
  };
  yearly: {
    label: string;
    displayAmount: number;
    mrpDisplay: number;
    discountPercent: number;
    hint: string;
  };
};

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
    return {
      class: '12',
      trial: {
        label: '2-Day Full Trial',
        displayAmount: 2,
        hint: 'Full access for 2 days · Auto-renew to yearly after trial',
      },
      yearly: {
        label: 'Class 12 — 1 Year',
        displayAmount,
        mrpDisplay,
        discountPercent: discountPercent(mrpDisplay, displayAmount),
        hint: 'Pay via UPI — GPay, PhonePe, Paytm',
      },
    };
  }

  const displayAmount = 199;
  const mrpDisplay = 399;
  return {
    class: '10',
    trial: {
      label: '2-Day Full Trial',
      displayAmount: 2,
      hint: 'Full access for 2 days · Auto-renew to yearly after trial',
    },
    yearly: {
      label: 'Class 10 — 1 Year',
      displayAmount,
      mrpDisplay,
      discountPercent: discountPercent(mrpDisplay, displayAmount),
      hint: 'Pay via UPI — GPay, PhonePe, Paytm',
    },
  };
}

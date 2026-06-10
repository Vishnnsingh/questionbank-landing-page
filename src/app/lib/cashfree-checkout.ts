import type { WebCheckoutResult } from '../api/subscription-api';

type CashfreeMode = 'sandbox' | 'production';

const CASHFREE_SDK_URL = 'https://sdk.cashfree.com/js/v3/cashfree.js';

type CashfreeInstance = {
  checkout: (options: {
    paymentSessionId: string;
    redirectTarget?: '_self' | '_blank' | '_top' | '_modal';
  }) => Promise<void>;
};

type CashfreeFactory = (options: { mode: CashfreeMode }) => CashfreeInstance;

declare global {
  interface Window {
    Cashfree?: CashfreeFactory;
  }
}

let sdkPromise: Promise<CashfreeFactory> | null = null;

function loadCashfreeSdk(): Promise<CashfreeFactory> {
  if (sdkPromise) return sdkPromise;

  sdkPromise = new Promise((resolve, reject) => {
    if (typeof window === 'undefined') {
      reject(new Error('Cashfree checkout is only available in the browser.'));
      return;
    }

    if (window.Cashfree) {
      resolve(window.Cashfree);
      return;
    }

    const existing = document.querySelector(`script[src="${CASHFREE_SDK_URL}"]`);
    const script = existing ?? document.createElement('script');
    if (!existing) {
      script.src = CASHFREE_SDK_URL;
      script.async = true;
      (document.head || document.body).appendChild(script);
    }

    script.addEventListener('load', () => {
      if (window.Cashfree) {
        resolve(window.Cashfree);
      } else {
        sdkPromise = null;
        reject(new Error('Cashfree SDK failed to load.'));
      }
    });

    script.addEventListener('error', () => {
      sdkPromise = null;
      reject(new Error('Could not load Cashfree SDK.'));
    });
  });

  return sdkPromise;
}

export async function openCashfreeCheckout(checkout: WebCheckoutResult): Promise<void> {
  const mode: CashfreeMode =
    checkout.cashfree_mode === 'production' ? 'production' : 'sandbox';

  if (checkout.auth_link) {
    window.location.href = checkout.auth_link;
    return;
  }

  const paymentSessionId = String(checkout.payment_session_id || '').trim();
  if (!paymentSessionId) {
    throw new Error('Invalid Cashfree checkout session.');
  }

  const Cashfree = await loadCashfreeSdk();
  const cashfree = Cashfree({ mode });
  await cashfree.checkout({
    paymentSessionId,
    redirectTarget: '_self',
  });
}

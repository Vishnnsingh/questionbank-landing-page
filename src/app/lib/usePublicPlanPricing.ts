import { useEffect, useState } from 'react';
import { fetchPublicPlansCatalog } from '../api/subscription-api';
import {
  mergePlanCatalog,
  planCatalogForClass,
  trialDurationDays,
  type PlanCatalog,
} from './plan-catalog';

export type PublicPlanPricing = {
  loading: boolean;
  trialDays: number;
  trialAmount: number;
  class10: PlanCatalog;
  class12: PlanCatalog;
};

/**
 * Public /plans-catalog API (class 10 + 12) for home hero + pricing.
 * Falls back to local defaults until / if the request fails.
 */
export function usePublicPlanPricing(): PublicPlanPricing {
  const local10 = planCatalogForClass('10');
  const local12 = planCatalogForClass('12');

  const [class10, setClass10] = useState<PlanCatalog>(local10);
  const [class12, setClass12] = useState<PlanCatalog>(local12);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [res10, res12] = await Promise.all([
          fetchPublicPlansCatalog('10'),
          fetchPublicPlansCatalog('12'),
        ]);
        if (cancelled) return;
        if (res10?.catalog) {
          setClass10(mergePlanCatalog(local10, res10.catalog));
        }
        if (res12?.catalog) {
          setClass12(mergePlanCatalog(local12, res12.catalog));
        }
      } catch {
        // Keep local defaults (same as Choose Plan page).
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- load once on mount
  }, []);

  return {
    loading,
    trialDays: trialDurationDays(class10),
    trialAmount: Number(class10.trial.displayAmount) || 2,
    class10,
    class12,
  };
}

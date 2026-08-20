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

type CatalogPair = { class10: PlanCatalog; class12: PlanCatalog };

const CATALOG_TTL_MS = 5 * 60 * 1000;
let catalogCache: { at: number; data: CatalogPair } | null = null;
let catalogInflight: Promise<CatalogPair> | null = null;

async function loadPublicPlanCatalogs(): Promise<CatalogPair> {
  const local10 = planCatalogForClass('10');
  const local12 = planCatalogForClass('12');
  const now = Date.now();
  if (catalogCache && now - catalogCache.at < CATALOG_TTL_MS) {
    return catalogCache.data;
  }
  if (catalogInflight) return catalogInflight;

  catalogInflight = (async () => {
    try {
      const [res10, res12] = await Promise.all([
        fetchPublicPlansCatalog('10'),
        fetchPublicPlansCatalog('12'),
      ]);
      const data: CatalogPair = {
        class10: res10?.catalog ? mergePlanCatalog(local10, res10.catalog) : local10,
        class12: res12?.catalog ? mergePlanCatalog(local12, res12.catalog) : local12,
      };
      catalogCache = { at: Date.now(), data };
      return data;
    } catch {
      return catalogCache?.data || { class10: local10, class12: local12 };
    } finally {
      catalogInflight = null;
    }
  })();

  return catalogInflight;
}

/**
 * Public /plans-catalog API (class 10 + 12) for home hero + pricing.
 * Falls back to local defaults until / if the request fails.
 */
export function usePublicPlanPricing(): PublicPlanPricing {
  const local10 = planCatalogForClass('10');
  const local12 = planCatalogForClass('12');

  const [class10, setClass10] = useState<PlanCatalog>(
    catalogCache?.data.class10 || local10,
  );
  const [class12, setClass12] = useState<PlanCatalog>(
    catalogCache?.data.class12 || local12,
  );
  const [loading, setLoading] = useState(!catalogCache);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const data = await loadPublicPlanCatalogs();
        if (cancelled) return;
        setClass10(data.class10);
        setClass12(data.class12);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return {
    loading,
    trialDays: trialDurationDays(class10),
    trialAmount: Number(class10.trial.displayAmount) || 2,
    class10,
    class12,
  };
}

import { apiClient, authHeaders, getApiErrorMessage, type ApiPayload } from './client';

export type ShareReferralMe = {
  enabled: boolean;
  referral_code: string;
  share_url: string;
  share_message: string;
  gift_title: string;
  gift_description: string;
  share_headline: string;
  required_referrals: number;
  yearly_paid_referrals_count: number;
  registered_referrals_count: number;
  referrer_has_yearly_plan: boolean;
  progress_complete: boolean;
  gift_gifted: boolean;
  gift_gifted_at?: string | null;
  gift_eligible: boolean;
  congratulations_message?: string | null;
  can_share_link: boolean;
  referrals: Array<{
    user_id: string | null;
    full_name: string;
    status: string;
    registered_at?: string;
    yearly_paid_at?: string | null;
  }>;
};

export async function fetchShareReferralMe(accessToken: string): Promise<ShareReferralMe> {
  const { data } = await apiClient.get<ApiPayload<ShareReferralMe>>(
    '/api/v1/user-app/share-referral/me',
    { headers: authHeaders(accessToken) },
  );
  const payload = data?.data;
  if (!payload) {
    throw new Error(data?.message || 'Could not load share details.');
  }
  return payload;
}

export function getApiShareErrorMessage(error: unknown) {
  return getApiErrorMessage(error, 'Could not load share details.');
}

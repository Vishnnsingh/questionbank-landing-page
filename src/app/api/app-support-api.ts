import {
  apiClient,
  getApiErrorMessage,
  type ApiPayload,
} from './client';

export type AppSupportPagePayload = {
  title?: string;
  body?: string;
  is_published?: boolean;
};

export async function fetchAppSupportTerms(): Promise<AppSupportPagePayload> {
  try {
    const { data } = await apiClient.get<ApiPayload<AppSupportPagePayload>>(
      '/api/v1/user-app/app-support/terms',
    );
    return data?.data ?? {};
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load terms & conditions.'));
  }
}

export async function fetchAppSupportPrivacy(): Promise<AppSupportPagePayload> {
  try {
    const { data } = await apiClient.get<ApiPayload<AppSupportPagePayload>>(
      '/api/v1/user-app/app-support/privacy',
    );
    return data?.data ?? {};
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load privacy policy.'));
  }
}

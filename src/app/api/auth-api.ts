import {
  apiClient,
  authHeaders,
  getApiErrorMessage,
  withNetworkRetry,
  type ApiPayload,
} from './client';

/** API may return string[] or { name: string }[] for geo lists. */
function asNameList(items: unknown): string[] {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return String(item).trim();
      }
      if (item && typeof item === 'object' && 'name' in item) {
        return String((item as { name?: unknown }).name ?? '').trim();
      }
      return '';
    })
    .filter(Boolean);
}

export type RegisterPayload = {
  full_name: string;
  mobile_number: string;
  email: string;
  password: string;
  confirm_password: string;
  role?: 'student' | 'teacher';
  referral_code?: string;
};

/** POST /api/v1/auth/update-verify-mobile — change mobile before WhatsApp verify */
export async function updateVerifyMobileNumber(payload: {
  new_mobile_number: string;
  email?: string;
  login_pending_token?: string;
}): Promise<{ mobile_number: string; login_pending_token?: string }> {
  try {
    const { data } = await apiClient.post<
      ApiPayload<{ mobile_number?: string; login_pending_token?: string }>
    >('/api/v1/auth/update-verify-mobile', {
      new_mobile_number: String(payload.new_mobile_number || '').replace(/\D/g, '').slice(0, 10),
      email: payload.email ? String(payload.email).trim().toLowerCase() : undefined,
      login_pending_token: payload.login_pending_token
        ? String(payload.login_pending_token).trim()
        : undefined,
    });
    const row = data?.data;
    const mobile = String(row?.mobile_number || '').replace(/\D/g, '').slice(0, 10);
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      throw new Error('Invalid mobile update response.');
    }
    return {
      mobile_number: mobile,
      login_pending_token: row?.login_pending_token,
    };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not update mobile number.'));
  }
}

/** POST /api/v1/auth/send-mobile-otp — WhatsApp OTP for mobile verify */
export async function sendMobileOtp(
  mobileNumber: string,
  purpose: 'mobile_verify' | 'signup' = 'mobile_verify',
) {
  try {
    const { data } = await apiClient.post<ApiPayload<{ mobile_number?: string; expires_in_seconds?: number; resend_cooldown_seconds?: number }>>(
      '/api/v1/auth/send-mobile-otp',
      {
        mobile_number: String(mobileNumber || '').trim(),
        purpose,
      },
    );
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not send WhatsApp OTP.'));
  }
}

/** POST /api/v1/auth/verify-mobile-otp */
export async function verifyMobileOtp(
  mobileNumber: string,
  otp: string,
  purpose: 'mobile_verify' | 'signup' = 'mobile_verify',
) {
  try {
    const { data } = await apiClient.post<
      ApiPayload<{ mobile_number?: string; mobile_verified?: boolean }>
    >('/api/v1/auth/verify-mobile-otp', {
      mobile_number: String(mobileNumber || '').trim(),
      otp: String(otp || '').trim(),
      purpose,
    });
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'OTP verification failed.'));
  }
}

/** POST /api/v1/auth/verify-login-mobile-otp — complete login after WhatsApp OTP */
export async function verifyLoginMobileOtp(payload: {
  loginPendingToken: string;
  mobileNumber: string;
  otp: string;
}): Promise<LoginResult> {
  try {
    const { data } = await apiClient.post<ApiPayload<LoginResult>>(
      '/api/v1/auth/verify-login-mobile-otp',
      {
        login_pending_token: String(payload.loginPendingToken || '').trim(),
        mobile_number: String(payload.mobileNumber || '').trim(),
        otp: String(payload.otp || '').trim(),
      },
    );
    const session = data?.data;
    if (!session?.accessToken) {
      throw new Error('Invalid login verification response.');
    }
    return session;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Login verification failed.'));
  }
}

export type OnboardPayload = {
  email: string;
  password: string;
  gender: 'male' | 'female' | 'other';
  class: string;
  stream?: string;
  board: string;
  state: string;
  district: string;
  city: string;
  preferred_medium?: string;
};

/** Canonical board name for UI (Bihar family → BSEB). */
export function formatBoardDisplayName(board: string): string {
  const raw = String(board || '').trim();
  if (!raw) return '';
  const compact = raw.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (compact === 'cbse' || compact === 'centralboardofsecondaryeducation') return 'CBSE';
  const t = raw.toLowerCase();
  if (t === 'bbse' || t === 'bseb' || t === 'bihar' || t.includes('bihar')) return 'BSEB';
  return raw;
}

export async function fetchSignupBoards(): Promise<string[]> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ boards: string[] }>>(
      '/api/v1/user-app/boards',
    );
    const boards = data?.data?.boards;
    if (!Array.isArray(boards)) {
      throw new Error('Invalid boards response.');
    }
    return [...new Set(
      boards
        .map((b) => formatBoardDisplayName(String(b)))
        .filter(Boolean),
    )];
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load boards.'));
  }
}

/** Classes with content for the selected board (app-parity). */
export async function fetchSignupClasses(board?: string): Promise<string[]> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ classes: string[] }>>(
      '/api/v1/user-app/classes',
      board ? { params: { board: String(board).trim() } } : undefined,
    );
    const classes = data?.data?.classes;
    if (!Array.isArray(classes)) {
      throw new Error('Invalid classes response.');
    }
    return classes.map((c) => String(c).trim()).filter(Boolean);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load classes.'));
  }
}

/** Medium / language options present in question bank for board. */
export async function fetchSignupMedia(board: string): Promise<string[]> {
  try {
    const b = String(board || '').trim();
    if (!b) return [];
    const { data } = await apiClient.get<ApiPayload<{ media: string[] }>>(
      '/api/v1/user-app/media',
      { params: { board: b } },
    );
    const media = data?.data?.media;
    if (!Array.isArray(media)) {
      throw new Error('Invalid media response.');
    }
    return media.map((m) => String(m).trim()).filter(Boolean);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load medium options.'));
  }
}

export async function fetchSignupStreams(classValue: string): Promise<string[]> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ streams: string[] }>>(
      '/api/v1/user-app/streams',
      { params: { class: classValue } },
    );
    const streams = data?.data?.streams;
    if (!Array.isArray(streams)) return [];
    return streams.map((s) => String(s).trim().toLowerCase()).filter(Boolean);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load streams.'));
  }
}

export async function fetchSignupStates(): Promise<string[]> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ states: unknown[] }>>(
      '/api/v1/user-app/states',
    );
    const states = asNameList(data?.data?.states);
    if (!states.length) {
      throw new Error('Invalid states response.');
    }
    return states;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load states.'));
  }
}

export async function fetchSignupDistricts(state: string): Promise<string[]> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ districts: unknown[] }>>(
      '/api/v1/user-app/districts',
      { params: { state } },
    );
    return asNameList(data?.data?.districts);
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load districts.'));
  }
}

export async function registerUser(payload: RegisterPayload) {
  try {
    const { data } = await apiClient.post<ApiPayload>('/api/v1/auth/register', payload);
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Registration failed.'));
  }
}

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  fullName: string;
  needs_mobile_verify?: boolean;
  login_pending_token?: string;
  mobile_number?: string;
  email?: string;
  resend_cooldown_seconds?: number;
};

export async function completeUserOnboarding(payload: OnboardPayload): Promise<
  Partial<LoginResult> & {
    email?: string;
    onboarding_completed?: boolean;
  }
> {
  try {
    const { data } = await apiClient.post<
      ApiPayload<
        Partial<LoginResult> & {
          email?: string;
          onboarding_completed?: boolean;
        }
      >
    >('/api/v1/auth/onboard', payload);
    const result = data?.data;
    if (!result) {
      throw new Error('Invalid onboarding response.');
    }
    return result;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Onboarding failed.'));
  }
}

export async function loginUser(identifier: string, password: string): Promise<LoginResult> {
  try {
    const trimmed = String(identifier || '').trim();
    let digits = trimmed.replace(/\D/g, '');
    if (digits.startsWith('91') && digits.length === 12) digits = digits.slice(2);
    if (digits.startsWith('0') && digits.length === 11) digits = digits.slice(1);

    const body: { email?: string; mobile_number?: string; password: string } = {
      password,
    };
    if (/^[6-9]\d{9}$/.test(digits) && !trimmed.includes('@')) {
      body.mobile_number = digits;
    } else if (trimmed.includes('@')) {
      body.email = trimmed.toLowerCase();
    } else if (/^[6-9]\d{9}$/.test(digits)) {
      body.mobile_number = digits;
    } else if (trimmed) {
      body.email = trimmed.toLowerCase();
    }

    const { data } = await withNetworkRetry(({ timeout, headers, baseURL }) =>
      apiClient.post<ApiPayload<LoginResult>>(
        '/api/v1/auth/login',
        body,
        { timeout, headers, baseURL },
      ),
    );
    const session = data?.data;
    if (!session) {
      throw new Error('Invalid login response.');
    }
    if (session.needs_mobile_verify) {
      return session;
    }
    if (!session.accessToken) {
      throw new Error('Invalid login response.');
    }
    return session;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Login failed.'));
  }
}

/** POST /api/v1/auth/forgot-password — email or mobile */
export async function forgotPassword(payload: { email?: string; mobile_number?: string }) {
  try {
    const body: { email?: string; mobile_number?: string } = {};
    const email = String(payload.email || '').trim().toLowerCase();
    const mobile = String(payload.mobile_number || '').replace(/\D/g, '').slice(0, 10);
    if (mobile && /^[6-9]\d{9}$/.test(mobile)) {
      body.mobile_number = mobile;
    } else if (email.includes('@')) {
      body.email = email;
    }
    const { data } = await apiClient.post<ApiPayload>('/api/v1/auth/forgot-password', body);
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not send reset code.'));
  }
}

/** POST /api/v1/auth/verify-reset-otp */
export async function verifyResetOtp(payload: {
  email?: string;
  mobile_number?: string;
  otp: string;
}): Promise<{ reset_token: string }> {
  try {
    const body: { email?: string; mobile_number?: string; otp: string } = {
      otp: String(payload.otp || '').trim(),
    };
    const email = String(payload.email || '').trim().toLowerCase();
    const mobile = String(payload.mobile_number || '').replace(/\D/g, '').slice(0, 10);
    if (mobile && /^[6-9]\d{9}$/.test(mobile)) {
      body.mobile_number = mobile;
    } else if (email) {
      body.email = email;
    }
    const { data } = await apiClient.post<ApiPayload<{ reset_token?: string }>>(
      '/api/v1/auth/verify-reset-otp',
      body,
    );
    const token = data?.data?.reset_token;
    if (typeof token !== 'string' || !token) {
      throw new Error('Invalid response: missing reset token.');
    }
    return { reset_token: token };
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'OTP verification failed.'));
  }
}

/** POST /api/v1/auth/reset-password */
export async function resetPasswordWithToken(payload: {
  token: string;
  newPassword: string;
  confirmNewPassword: string;
}) {
  try {
    const { data } = await apiClient.post<ApiPayload>('/api/v1/auth/reset-password', {
      token: String(payload.token || '').trim(),
      new_password: String(payload.newPassword || ''),
      confirm_new_password: String(payload.confirmNewPassword || ''),
    });
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not reset password.'));
  }
}

export type AuthMeUser = {
  full_name?: string;
  email?: string;
  class?: string;
  onboarding_completed?: boolean;
};

export async function fetchAuthMe(accessToken: string): Promise<AuthMeUser> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ user: AuthMeUser }>>('/api/v1/auth/me', {
      headers: authHeaders(accessToken),
    });
    const user = data?.data?.user;
    if (!user) {
      throw new Error('Invalid profile response.');
    }
    return user;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load profile.'));
  }
}

export type RefreshResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
};

export async function refreshAccessToken(refreshToken?: string): Promise<RefreshResult> {
  try {
    const { data } = await apiClient.post<ApiPayload<RefreshResult>>(
      '/api/v1/auth/refresh',
      refreshToken ? { refreshToken } : {},
    );
    const session = data?.data;
    if (!session?.accessToken) {
      throw new Error('Invalid refresh response.');
    }
    return session;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Token refresh failed.'));
  }
}

export async function logoutUser(accessToken: string): Promise<void> {
  try {
    await apiClient.post('/api/v1/auth/logout', undefined, {
      headers: authHeaders(accessToken),
    });
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Logout failed.'));
  }
}

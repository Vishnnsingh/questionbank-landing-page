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

export async function completeUserOnboarding(payload: OnboardPayload) {
  try {
    const { data } = await apiClient.post<ApiPayload>('/api/v1/auth/onboard', payload);
    return data;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Onboarding failed.'));
  }
}

export type LoginResult = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  fullName: string;
};

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    const { data } = await withNetworkRetry(({ timeout, headers, baseURL }) =>
      apiClient.post<ApiPayload<LoginResult>>(
        '/api/v1/auth/login',
        {
          email: email.trim().toLowerCase(),
          password,
        },
        { timeout, headers, baseURL },
      ),
    );
    const session = data?.data;
    if (!session?.accessToken) {
      throw new Error('Invalid login response.');
    }
    return session;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Login failed.'));
  }
}

export type AuthMeUser = {
  full_name?: string;
  email?: string;
  class?: string;
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

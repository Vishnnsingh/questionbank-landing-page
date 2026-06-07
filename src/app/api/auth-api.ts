import {
  apiClient,
  authHeaders,
  getApiErrorMessage,
  type ApiPayload,
} from './client';

export type RegisterPayload = {
  full_name: string;
  mobile_number: string;
  email: string;
  class: string;
  board: string;
  stream?: string;
  state: string;
  city: string;
  password: string;
  confirm_password: string;
  role?: 'student' | 'teacher';
};

export async function fetchSignupBoards(): Promise<string[]> {
  try {
    const { data } = await apiClient.get<ApiPayload<{ boards: string[] }>>(
      '/api/v1/user-app/boards',
    );
    const boards = data?.data?.boards;
    if (!Array.isArray(boards)) {
      throw new Error('Invalid boards response.');
    }
    return boards;
  } catch (error) {
    throw new Error(getApiErrorMessage(error, 'Could not load boards.'));
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
};

export async function loginUser(email: string, password: string): Promise<LoginResult> {
  try {
    const { data } = await apiClient.post<ApiPayload<LoginResult>>('/api/v1/auth/login', {
      email: email.trim().toLowerCase(),
      password,
    });
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

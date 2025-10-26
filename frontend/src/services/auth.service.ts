import { apiClient } from './api-client';

interface LoginResponse {
  mfaRequired: boolean;
  challengeId?: string;
  message?: string;
}

interface VerifyMfaResponse {
  accessToken: string;
}

export interface AuthUser {
  id: string;
  email: string;
  roles: string[];
  displayName?: string;
}

export const authService = {
  login: (email: string, password: string) =>
    apiClient<LoginResponse>('/auth/login', {
      method: 'POST',
      json: { email, password }
    }),
  verifyMfa: (email: string, otp: string) =>
    apiClient<VerifyMfaResponse>('/auth/mfa/verify', {
      method: 'POST',
      json: { email, otp }
    }),
  me: (token: string) =>
    apiClient<AuthUser>('/auth/me', {
      method: 'GET',
      token
    })
};

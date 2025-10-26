import { create } from 'zustand';

import { authService, AuthUser } from '../services/auth.service';

type AuthStage = 'idle' | 'authenticating' | 'password-submitted' | 'verified';

interface AuthState {
  user: AuthUser | null;
  stage: AuthStage;
  mfaRequired: boolean;
  pendingEmail: string | null;
  challengeId: string | null;
  accessToken: string | null;
  isHydrated: boolean;
  login: (payload: { email: string; password: string }) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  logout: () => void;
  initialize: () => Promise<void>;
}

const ACCESS_TOKEN_KEY = 'innoveo.accessToken';

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  stage: 'idle',
  mfaRequired: false,
  pendingEmail: null,
  challengeId: null,
  accessToken: null,
  isHydrated: false,
  login: async ({ email, password }) => {
    set({ stage: 'authenticating', isHydrated: true });
    try {
      const response = await authService.login(email, password);

      if (!response.mfaRequired) {
        throw new Error('MFA flow is required for this environment');
      }

      set({
        stage: 'password-submitted',
        mfaRequired: response.mfaRequired,
        pendingEmail: email,
        challengeId: response.challengeId ?? null,
        isHydrated: true
      });
    } catch (error) {
      set({
        stage: 'idle',
        mfaRequired: false,
        pendingEmail: null,
        challengeId: null,
        isHydrated: true
      });
      throw error;
    }
  },
  verifyOtp: async (code) => {
    const { pendingEmail } = get();
    if (!pendingEmail) {
      throw new Error('No login in progress');
    }

    const { accessToken } = await authService.verifyMfa(pendingEmail, code);
    localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

    const profile = await authService.me(accessToken);

    set({
      user: profile,
      stage: 'verified',
      mfaRequired: false,
      pendingEmail: null,
      challengeId: null,
      accessToken
    });
  },
  logout: () => {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    set({
      user: null,
      stage: 'idle',
      mfaRequired: false,
      pendingEmail: null,
      challengeId: null,
      accessToken: null,
      isHydrated: true
    });
  },
  initialize: async () => {
    const token = localStorage.getItem(ACCESS_TOKEN_KEY);
    if (!token) {
      set({ isHydrated: true });
      return;
    }

    try {
      const profile = await authService.me(token);
      set({
        user: profile,
        stage: 'verified',
        mfaRequired: false,
        pendingEmail: null,
        challengeId: null,
        accessToken: token,
        isHydrated: true
      });
    } catch (error) {
      console.error('Failed to restore session', error);
      localStorage.removeItem(ACCESS_TOKEN_KEY);
      set({
        user: null,
        stage: 'idle',
        mfaRequired: false,
        pendingEmail: null,
        challengeId: null,
        accessToken: null,
        isHydrated: true
      });
    }
  }
}));

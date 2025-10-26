import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
}

type AuthStage = 'idle' | 'password-submitted' | 'verified';

interface AuthState {
  user: User | null;
  stage: AuthStage;
  otpToken: string | null;
  login: (payload: { email: string; password: string }) => Promise<void>;
  verifyOtp: (code: string) => Promise<void>;
  logout: () => void;
  mfaRequired: boolean;
}

const fakeDelay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  stage: 'idle',
  otpToken: null,
  mfaRequired: false,
  login: async ({ email }) => {
    await fakeDelay(400);
    set({
      stage: 'password-submitted',
      otpToken: 'mock-token',
      mfaRequired: true,
      user: {
        id: 'pending',
        email,
        displayName: email.split('@')[0],
        roles: ['viewer']
      }
    });
  },
  verifyOtp: async (code) => {
    await fakeDelay(300);
    if (code !== '000000') {
      throw new Error('Invalid OTP');
    }
    const { user } = get();
    if (!user) {
      throw new Error('No user pending verification');
    }
    set({
      stage: 'verified',
      mfaRequired: false,
      otpToken: null,
      user: {
        ...user,
        id: '1',
        roles: ['viewer', 'manager']
      }
    });
  },
  logout: () => {
    set({ user: null, stage: 'idle', otpToken: null, mfaRequired: false });
  }
}));

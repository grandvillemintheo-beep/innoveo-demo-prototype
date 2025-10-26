import { useTranslation } from 'react-i18next';

import { useAuthStore } from '../store/authStore';

export const useAuth = () => {
  const {
    user,
    login,
    logout,
    mfaRequired,
    verifyOtp,
    stage,
    pendingEmail,
    challengeId,
    initialize,
    isHydrated
  } = useAuthStore();
  const { t } = useTranslation('auth');

  return {
    user,
    login,
    logout,
    mfaRequired,
    verifyOtp,
    pendingEmail,
    challengeId,
    initialize,
    isHydrated,
    stage,
    isAuthenticated: stage === 'verified',
    labels: {
      title: t('title'),
      subtitle: t('subtitle')
    }
  };
};

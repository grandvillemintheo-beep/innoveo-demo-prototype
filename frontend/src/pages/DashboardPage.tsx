import { useTranslation } from 'react-i18next';

import { Card } from '../design-system/components/controls/Card';
import { useAuth } from '../hooks/useAuth';

export const DashboardPage = () => {
  const { t } = useTranslation('dashboard');
  const { user } = useAuth();

  return (
    <div style={{ display: 'grid', gap: 24 }}>
      <Card title={t('overview.title')}>
        <p>{t('overview.subtitle', { name: user?.displayName ?? user?.email ?? 'Guest' })}</p>
        <ul>
          <li>{t('overview.items.security')}</li>
          <li>{t('overview.items.business')}</li>
          <li>{t('overview.items.experience')}</li>
        </ul>
      </Card>
      <Card title={t('insights.title')}>
        <p>{t('insights.description')}</p>
      </Card>
    </div>
  );
};

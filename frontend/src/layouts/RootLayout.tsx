import { Outlet } from 'react-router-dom';

import { AppShell } from '../design-system/components/AppShell';
import { Topbar } from '../design-system/components/Topbar';
import { useAuth } from '../hooks/useAuth';

export const RootLayout = () => {
  const { user, logout } = useAuth();

  return (
    <AppShell
      topbar={<Topbar user={user} onLogout={logout} />}
      sidebarItems={[
        { id: 'dashboard', label: 'Dashboard', href: '/' },
        { id: 'sites', label: 'Sites', href: '/sites' },
        { id: 'alerts', label: 'Alerts', href: '/alerts' }
      ]}
    >
      <Outlet />
    </AppShell>
  );
};

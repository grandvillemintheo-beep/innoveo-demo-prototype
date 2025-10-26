import { createBrowserRouter } from 'react-router-dom';

import { AlertsPage } from '../pages/AlertsPage';
import { DashboardPage } from '../pages/DashboardPage';
import { LoginPage } from '../pages/LoginPage';
import { SitesPage } from '../pages/SitesPage';
import { RootLayout } from '../layouts/RootLayout';
import { ProtectedRoute } from './protected-route';

export const AppRouter = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />
  },
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'sites',
        element: (
          <ProtectedRoute>
            <SitesPage />
          </ProtectedRoute>
        )
      },
      {
        path: 'alerts',
        element: (
          <ProtectedRoute>
            <AlertsPage />
          </ProtectedRoute>
        )
      }
    ]
  }
]);

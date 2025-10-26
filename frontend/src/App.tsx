import { Suspense, useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppRouter } from './router';
import { useAuthStore } from './store/authStore';

export const App = () => {
  const initializeAuth = useAuthStore((state) => state.initialize);

  useEffect(() => {
    void initializeAuth();
  }, [initializeAuth]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={AppRouter} />
    </Suspense>
  );
};

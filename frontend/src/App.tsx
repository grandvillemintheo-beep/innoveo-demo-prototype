import { Suspense } from 'react';
import { RouterProvider } from 'react-router-dom';

import { AppRouter } from './router';

export const App = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RouterProvider router={AppRouter} />
    </Suspense>
  );
};

import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { store } from '@/lib/redux/store';
import { ErrorPage, GamePage, HighscoresPage, HomePage } from '@/pages';
import { Toaster } from '@/components/ui/toaster.tsx';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/game',
    element: <GamePage />,
  },
  {
    path: '/game/highscores',
    element: <HighscoresPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <Toaster />
    </Provider>
  </React.StrictMode>
);

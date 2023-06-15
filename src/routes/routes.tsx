import { Navigate, createBrowserRouter } from 'react-router-dom';
import RootLayout from '../layout/Root';
import Authentication from '../modules/authentication';
import Chat from '../modules/chat';

const router = createBrowserRouter([
  {
    path: '',
    element: <RootLayout />,
    children: [
      { index: true, element: <Navigate to="/login" replace /> },
      {
        path: '/login',
        element: <Authentication />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
    ],
  },
]);

export default router;

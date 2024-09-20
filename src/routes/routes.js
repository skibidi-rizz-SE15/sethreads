import { createBrowserRouter, Navigate } from 'react-router-dom';
import LoginPage from '../pages/LogIn/LoginPage';
import MainPage from '../pages/Main/MainPage';
import Home from '../components/content/Home';
import Content from '../components/content/Content';
import Thread from '../components/threadComponents/Thread';

export const rootRouter = createBrowserRouter([
    {
      path: "/sign-in",
      element: <LoginPage mode="sign-in" />,
    },
    {
      path: "/sign-up",
      element: <LoginPage mode="sign-up" />,
    },
    {
      path: "/",
      element: <MainPage />,
      children: [
        {
          path: "home",
          element: <Navigate to="/main/home" />,
        },
        {
          path: "course",
          element: <Navigate to="/main/course" />,
        },
        {
          path: "*",
          element: <Navigate to="/sign-in" replace />,
        },
      ],
    },
  ]);

export const mainPageRouter = createBrowserRouter([
  {
    path: "/main/home",
    element: <Home />,
  },
  {
    path: "/main/course",
    element: <Content />,
  },
  {
    path: "thread",
    element: <Thread />,
  },
]);
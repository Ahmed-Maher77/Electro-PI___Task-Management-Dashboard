import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { DashboardLayout } from './components/DashboardLayout';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import CreateProject from './pages/CreateProject';
import ProjectDetails from './pages/ProjectDetails';
import CreateTask from './pages/CreateTask';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <Register />,
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <DashboardLayout />,
        children: [
          {
            path: '/dashboard',
            element: <Dashboard />,
          },
          {
            path: '/projects',
            element: <Projects />,
          },
          {
            path: '/projects/new',
            element: <CreateProject />,
          },
          {
            path: '/projects/:projectId',
            element: <ProjectDetails />,
          },
          {
            path: '/tasks',
            element: <Dashboard />,
          },
          {
            path: '/tasks/new',
            element: <CreateTask />,
          },
          {
            path: '/team',
            element: <Profile />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/settings',
            element: <Profile />,
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);

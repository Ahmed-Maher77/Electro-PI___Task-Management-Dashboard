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
import Tasks from './pages/Tasks';
import CreateTask from './pages/CreateTask';
import Team from './pages/Team';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import Support from './pages/Support';
import Docs from './pages/Docs';
import Status from './pages/Status';
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
            element: <Tasks />,
          },
          {
            path: '/tasks/new',
            element: <CreateTask />,
          },
          {
            path: '/team',
            element: <Team />,
          },
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/settings',
            element: <Settings />,
          },
          {
            path: '/support',
            element: <Support />,
          },
          {
            path: '/docs',
            element: <Docs />,
          },
          {
            path: '/status',
            element: <Status />,
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

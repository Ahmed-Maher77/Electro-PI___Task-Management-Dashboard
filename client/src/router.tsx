import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Loader } from './components/Loader';
import { GlobalErrorBoundary } from './components/GlobalErrorBoundary';

// Resilient safeLazy HOC to automatically catch chunk load errors after new deployments
const safeLazy = (importFn: () => Promise<any>) =>
  lazy(async () => {
    try {
      const component = await importFn();
      sessionStorage.removeItem('page_chunk_refreshed');
      return component;
    } catch (error: any) {
      console.warn('Chunk import failed. Attempting page reload to fetch updated assets...', error);
      const pageHasBeenRefreshed = sessionStorage.getItem('page_chunk_refreshed');
      if (!pageHasBeenRefreshed) {
        sessionStorage.setItem('page_chunk_refreshed', 'true');
        window.location.reload();
        return new Promise(() => {});
      }
      throw error;
    }
  });

// Lazy loaded page components using safeLazy
const Login = safeLazy(() => import('./pages/Login'));
const Register = safeLazy(() => import('./pages/Register'));
const Dashboard = safeLazy(() => import('./pages/Dashboard'));
const Projects = safeLazy(() => import('./pages/Projects'));
const CreateProject = safeLazy(() => import('./pages/CreateProject'));
const ProjectDetails = safeLazy(() => import('./pages/ProjectDetails'));
const Tasks = safeLazy(() => import('./pages/Tasks'));
const CreateTask = safeLazy(() => import('./pages/CreateTask'));
const Team = safeLazy(() => import('./pages/Team'));
const Profile = safeLazy(() => import('./pages/Profile'));
const Settings = safeLazy(() => import('./pages/Settings'));
const Support = safeLazy(() => import('./pages/Support'));
const Status = safeLazy(() => import('./pages/Status'));
const NotFound = safeLazy(() => import('./pages/NotFound'));

// Suspense Helper HOC
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader message="جاري التحميل..." />}>
    <Component />
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/dashboard" replace />,
    errorElement: <GlobalErrorBoundary />,
  },
  {
    element: <PublicRoute />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        path: '/login',
        element: withSuspense(Login),
      },
      {
        path: '/register',
        element: withSuspense(Register),
      },
    ],
  },
  {
    element: <ProtectedRoute />,
    errorElement: <GlobalErrorBoundary />,
    children: [
      {
        element: <DashboardLayout />,
        errorElement: <GlobalErrorBoundary />,
        children: [
          {
            path: '/dashboard',
            element: withSuspense(Dashboard),
          },
          {
            path: '/projects',
            element: withSuspense(Projects),
          },
          {
            path: '/projects/new',
            element: withSuspense(CreateProject),
          },
          {
            path: '/projects/:projectId',
            element: withSuspense(ProjectDetails),
          },
          {
            path: '/tasks',
            element: withSuspense(Tasks),
          },
          {
            path: '/tasks/new',
            element: withSuspense(CreateTask),
          },
          {
            path: '/team',
            element: withSuspense(Team),
          },
          {
            path: '/profile',
            element: withSuspense(Profile),
          },
          {
            path: '/settings',
            element: withSuspense(Settings),
          },
          {
            path: '/support',
            element: withSuspense(Support),
          },
          {
            path: '/status',
            element: withSuspense(Status),
          },
        ],
      },
    ],
  },
  {
    path: '*',
    element: withSuspense(NotFound),
    errorElement: <GlobalErrorBoundary />,
  },
]);

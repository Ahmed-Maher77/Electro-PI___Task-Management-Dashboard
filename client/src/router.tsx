import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { PublicRoute } from './routes/PublicRoute';
import { DashboardLayout } from './components/DashboardLayout';
import { Loader } from './components/Loader';

// Lazy loaded page components
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const CreateProject = lazy(() => import('./pages/CreateProject'));
const ProjectDetails = lazy(() => import('./pages/ProjectDetails'));
const Tasks = lazy(() => import('./pages/Tasks'));
const CreateTask = lazy(() => import('./pages/CreateTask'));
const Team = lazy(() => import('./pages/Team'));
const Profile = lazy(() => import('./pages/Profile'));
const Settings = lazy(() => import('./pages/Settings'));
const Support = lazy(() => import('./pages/Support'));
const Docs = lazy(() => import('./pages/Docs'));
const Status = lazy(() => import('./pages/Status'));
const NotFound = lazy(() => import('./pages/NotFound'));

// Suspense Helper HOC
const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<Loader message="جاري تحميل الصفحة..." submessage="يرجى الانتظار لحين تجهيز المكونات" />}>
    <Component />
  </Suspense>
);

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
    children: [
      {
        element: <DashboardLayout />,
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
            path: '/docs',
            element: withSuspense(Docs),
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
  },
]);

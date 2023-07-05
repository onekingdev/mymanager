import { lazy } from 'react';

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/newdashboard'))
    // component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce')),
    exact: true
  },
  {
    path: '/dashboard/onboarding',
    component: lazy(() => import('../../views/onboarding'))
  }
];

export default DashboardRoutes;

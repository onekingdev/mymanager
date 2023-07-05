// ** React Imports
import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const MarketingRoutes = [
  {
    exact: true,
    path: '/marketing',
    component: lazy(() => import('@src/views/marketing'))
  },
  {
    exact: true,
    path: '/marketing/:section',
    component: lazy(() => import('@src/views/marketing'))
  },
  {
    path: '/marketing/:section/:subsection',
    exact: true,
    className: 'email-application',
    component: lazy(() => import('@src/views/marketing'))
  }
];

export default MarketingRoutes;

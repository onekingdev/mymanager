import { lazy } from 'react';

const SettingRoute = [
  {
    path: '/setting',
    exact: true,
    component: lazy(() => import('../../views/settings'))
  },
  {
    path: '/setting/:tabIndex',
    exact: true,
    component: lazy(() => import('../../views/settings'))
  }
];

export default SettingRoute;

import { lazy } from 'react';

const OrganizationRoutes = [
  {
    path: '/organizations',
    exact: true,
    appLayout: true,
    component: lazy(() => import('../../views/organizations'))
  },
  {
    path: '/organizations/:id',
    exact: true,
    appLayout: true,
    component: lazy(() =>
      import('../../views/organizations/orgs/details/OrgDetails')
    )
  },
  // {
  //   path: '/organizations/:path/signup',
  //   exact: true,
  //   appLayout: false,
  //   layout: 'BlankLayout',
  //   meta: {
  //     publicRoute: true
  //   },
  //   component: lazy(() => import('../../views/organizations/authentication/Register'))
  // }
];

export default OrganizationRoutes;

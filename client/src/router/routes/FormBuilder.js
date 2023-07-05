import { lazy } from 'react';

const FormBuilderRoutes = [
  // FromBuilder
  {
    path: '/form-funnel',
    component: lazy(() => import('../../views/formBuilder')),
    exact: true
  },
  {
    path: '/form-funnel/create',
    component: lazy(() => import('../../views/formBuilder/createForm/CreateForm')),
    exact: true
  },
  {
    path: '/form-funnel/form-setting/:id',
    component: lazy(() => import('../../views/formBuilder/createDetail')),
    exact: true,
    appLayout: true,
    meta: {
      navLink: '/form-funnel/form-setting'
    }
  },
  {
    path: '/form-funnel/:id&path=:path',
    component: lazy(() => import('../../views/formBuilder/edit/Preview')),
    exact: true,
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/form-funnel/submitted/:id',
    component: lazy(() => import('../../views/formBuilder/edit/SubmitForm')),
    exact: true,
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  }
];

export default FormBuilderRoutes;

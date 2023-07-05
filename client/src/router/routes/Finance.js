import { lazy } from 'react';
import { Redirect } from 'react-router-dom';

const FinanceRoutes = [
  // Finance
  {
    path: '/finance',
    component: lazy(() => import('../../views/finance')),
    navLink: '/finance'
  },
  {
    path: '/finance/income',
    component: lazy(() => import('../../views/finance/income'))
  },
  {
    path: '/finance/expense',
    component: lazy(() => import('../../views/finance/expense'))
  },
  {
    path: '/finance/pnl',
    component: lazy(() => import('../../views/finance/pnl'))
  },
  {
    path: '/invoice/list',
    component: lazy(() => import('../../views/finance/invoice/list')),
    navLink: '/invoice/list',
    appLayout: true,
    className: 'email-application'
  },
  {
    path: '/invoice/preview/:id',
    component: lazy(() => import('../../views/finance/invoice/preview')),
    meta: {
      navLink: '/invoice/preview'
    },
    appLayout: true,
    exact: true
  },
  {
    path: '/invoice-preview/:id',
    component: lazy(() => import('../../views/finance/invoice/publicInvoice')),
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    }
  },

  // {
  //   path: '/invoice/edit/:id',
  //   component: lazy(() => import('../../views/finance/invoice/edit')),
  //   meta: {
  //     navLink: '/invoice/edit'
  //   }
  // },
  {
    path: '/invoice/add',
    component: lazy(() => import('../../views/finance/invoice/add'))
  },
  {
    path: '/invoice/print/:id',
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    },
    component: lazy(() => import('../../views/finance/invoice/print'))
  },
  {
    path: '/payment/invoice/:id',
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    },
    component: lazy(() => import('../../views/finance/invoice/payment/Payment'))
  },
  {
    path: '/payment-confirm/invoice/:id',
    appLayout: false,
    layout: 'BlankLayout',
    meta: {
      publicRoute: true
    },
    component: lazy(() => import('../../views/finance/invoice/payment/ConfirmPayment'))
  }
];

export default FinanceRoutes;

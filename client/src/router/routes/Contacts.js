import { lazy } from 'react';

const ContactRoutes = [
  // Contacts
  {
    path: '/contacts/view/:id/:mode',
    component: lazy(() => import('../../views/contacts/contact-view')),
    meta: {
      navLink: '/contacts/view'
    }
  },
  {
    path: '/contacts/clients/list',
    component: lazy(() => import('../../views/contacts/client/list'))
  },
  {
    path: '/contacts/employee/list',
    component: lazy(() => import('../../views/contacts/employee'))
  },
  {
    path: '/contacts/leads/list',
    component: lazy(() => import('../../views/contacts/leads/list'))
  },
  {
    path: '/contacts/relationship/list',
    component: lazy(() => import('../../views/contacts/relationship/list'))
  },
  {
    path: '/contacts/vendor/list',
    component: lazy(() => import('../../views/contacts/vendor/list'))
  }
  // {
  //   path: '/contacts/members/list',
  //   component: lazy(() => import('../../views/contacts/member/list'))
  // }
  // {
  //   path: '/contacts/member/view/:id',
  //   component: lazy(() => import('../../views/contacts/member/view')),
  //   meta: {
  //     navLink: '/contacts/member/view'
  //   }
  // }
];

export default ContactRoutes;

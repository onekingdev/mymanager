import { lazy } from 'react';

const MySocial = [
  {
    path: '/mysocial',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/mySocial/'))
  },
  // {
  //   path: '/mysocial/socialconnect',
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/marketing/SocialConnect'))
  // },
  // {
  //   path: '/mysocial/socialproof',
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/SocialProof'))
  // },
  {
    path: '/camgaign-edit',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/SocialProof/EditCampaign'))
  },
  {
    path: '/camgaign-edit/:id',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/SocialProof/EditCampaign'))
  },
  // {
  //   path: '/mysocial/notification',
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/SocialProof/createForm/Notification'))
  // },
  {
    path: '/submit/:id',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/SocialProof/submitform/SubmitForm'))
  },
  {
    path: '/submit',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/SocialProof/submitform/SubmitForm'))
  },
  // {
  //   path: '/mysocial/reputation',
  //   appLayout: true,
  //   className: 'email-application',
  //   component: lazy(() => import('../../views/apps/reputation'))
  // },
  // new route rohit

  {
    path: '/workspacesocial',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/marketing/SocialConnect/Workspace/WorkspaceSocial'))
    // component: lazy(() => import('../../views/marketing/'))
  },
  {
    path: '/mysocial/Journal',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/newjournal/JournalMain'))
  },
  {
    path: '/socialview/:id',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/marketing/SocialConnect/Workspace/SocialView'))
  },

  {
    path: '/createworkspace',
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/marketing/SocialConnect/Workspace/CreateWorkspace'))
  }
];

export default MySocial;

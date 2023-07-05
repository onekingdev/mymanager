import { lazy } from 'react';

const CalendarRoutes = [
  // Calendar
  {
    path: '/calendar',
    component: lazy(() => import('../../views/calendar')),
    className: 'calendar-application',
    exact: true
  },
  {
    path: '/calendar/:tabIndex',
    component: lazy(() => import('../../views/calendar')),
    className: 'calendar-application',
    exact: true
  },
  // Calendar
  {
    path: '/book',
    component: lazy(() => import('../../views/calendar/book')),
    exact: true
  },
  // Calendar
  {
    path: '/book/booking-type',
    component: lazy(() => import('../../views/calendar/book/booking-type')),
    exact: true
  },
  {
    path: '/book/add/:typeLink',
    component: lazy(() => import('../../views/calendar/book/add')),
    appLayout:false,
    layout:'BlankLayout',
    meta: {
        publicRoute:true
    }
},
{
    path: '/book/update/:updateLink',
    component: lazy(() => import('../../views/calendar/book/add')),
    appLayout:false,
    layout:'BlankLayout',
    meta: {
        publicRoute:true
    }
},
{
  path: '/book/confirm/:updateLink',
  component: lazy(() => import('../../views/calendar/book/confirm')),
  appLayout:false,
  layout:'BlankLayout',
  meta: {
      publicRoute:true
  }
},
  {
    path: '/add-event',
    component: lazy(() => import('../../views/calendar/event/add/AddEvent')),
    className: 'ecommerce-application',
    exact: true
  },
  {
    path: '/edit-event/:eventId',
    component: lazy(() => import('../../views/calendar/event/edit/EditEvent')),
    className: 'ecommerce-application',
    exact: true
  },
  {
    path: '/add-new',
    component: lazy(() => import('../../views/apps/reputation/schedule/scheduleboard')),
    exact: true
  },
  {
    path: '/reputation/settings',
    component: lazy(() => import('../../views/apps/reputation/settings')),
    exact: true
  },
  {
    path: '/events',
    component: lazy(() => import('../../views/calendar/event')),
    exact: true
  },
  {
    path: '/event-details/:eventId',
    component: lazy(() => import('../../views/calendar/event/EventDetails')),
    exact: true
  },
  {
    path: '/add-guest/:eventId',
    component: lazy(() => import('../../views/calendar/event/guests/AddGuest')),
    exact: true
  },
  // Event View Details
  {
    path: '/event-view-list/:eventId',
    component: lazy(() => import('../../views/calendar/event/EventDetails')),
    exact: true
  },
  {
    path: '/edit-event/:eventId',
    component: lazy(() => import('../../views/calendar/event/edit/EditEvent')),
    className: 'ecommerce-application',
    exact: true
  },
  {
    path: '/event/:eventInvitation',
    layout: 'BlankLayout',
    appLayout: false,
    component: lazy(() => import('../../views/calendar/event/preview/NotAuthEventPreview')),
    meta: {
      publicRoute: true
    }
  },
  {
    path: '/event-view/:eventId',
    layout: 'BlankLayout',
    appLayout: false,
    component: lazy(() => import('../../views/calendar/event/preview/PublicEventView')),
    meta: {
      publicRoute: true
    }
  }
];
export default CalendarRoutes;

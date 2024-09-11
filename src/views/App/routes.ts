import { lazy } from 'react';

import { Route } from 'shared';

import firstRoutes from 'views/First/routes';

const routes = [
  {
    Component: lazy(() => import('views/Home')),
    path: '/',
  },
  {
    Component: lazy(() => import('views/First')),
    path: '/first/*',
    children: firstRoutes,
  },
  {
    Component: lazy(() => import('views/Second')),
    path: '/second',
    handle: {
      name: 'Second',
    },
  },
  {
    Component: lazy(() => import('views/Third')),
    path: '/third/:name',
    handle: {
      category: 'Dep',
      name: 'Third',
    },
  },
] satisfies Route[];

export default routes;

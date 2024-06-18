import { lazy } from 'react';

import type { Route } from 'shared';

const routes = [
  {
    Component: lazy(() => import('views/Alpha')),
    path: 'alpha',
    handle: {
      name: 'Alpha',
    },
  },
  {
    Component: lazy(() => import('views/Beta')),
    path: 'beta/:name',
    handle: {
      category: 'Greek',
      name: 'Beta',
    },
  },
] satisfies Route[];

export default routes;

import { ReactNode } from 'react';

import { Route } from 'shared/types';

export interface RoutesLoaderProps extends Record<string, any> {
  routes: Route[];
  fallback?: ReactNode;
}

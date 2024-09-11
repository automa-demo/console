import React, { Suspense, useCallback, useEffect } from 'react';
import { matchRoutes, Route, Routes, useLocation } from 'react-router-dom';
import { useStatsigClient } from '@statsig/react-bindings';

import { RoutesLoaderProps } from './types';

const RoutesLoader: React.FC<RoutesLoaderProps> = ({
  routes,
  fallback = null,
  ...commonProps
}) => {
  const {
    client: { checkGate },
  } = useStatsigClient();

  const location = useLocation();

  useEffect(() => {
    const tmp = matchRoutes(routes, location?.pathname);

    console.log('tmp', tmp);
  }, [location, routes]);

  const route = useCallback(
    (routes?: RoutesLoaderProps['routes']) => {
      if (!routes?.length) {
        return [];
      }

      return routes
        .filter(({ gate }) => !gate || checkGate(gate))
        .map(({ path, Component, props, children }, index) => (
          <Route
            key={index}
            path={path}
            element={<Component {...commonProps} {...props} />}
          >
            {route(children)}
          </Route>
        ));
    },
    [commonProps],
  );

  if (!routes.length) {
    return null;
  }

  return (
    <Suspense fallback={fallback}>
      <Routes>{route(routes)}</Routes>
    </Suspense>
  );
};

export default RoutesLoader;

import React, { Suspense, useCallback, useEffect } from 'react';
import { Routes, Route, useLocation, matchRoutes } from 'react-router-dom';
import { Statsig } from 'statsig-react';

import { RoutesLoaderProps } from './types';

const RoutesLoader: React.FC<RoutesLoaderProps> = ({
  routes,
  fallback = null,
  ...commonProps
}) => {
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
        .filter(({ gate }) => !gate || Statsig.checkGate(gate))
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

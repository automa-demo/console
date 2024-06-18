import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  SignIn,
  OrganizationList,
  OrganizationSwitcher,
  UserButton,
  useAuth,
  useUser,
} from '@clerk/clerk-react';
import { StatsigProvider } from 'statsig-react';
import axios from 'axios';

import { environment, isTest } from 'env';

import { Loader, RoutesLoader } from 'shared';
import { useAnalytics } from 'analytics';

import routes from './routes';

import { Container } from './App.styles';

const App: React.FC<{}> = () => {
  const { anonymousId, identify } = useAnalytics();

  const { orgId, isLoaded, signOut } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response.status === 401) {
          signOut();
        }

        return Promise.reject(error);
      },
    );

    return axios.interceptors.request.eject(interceptor);
  }, [signOut]);

  useEffect(() => {
    identify(user, orgId);
  }, [identify, user, orgId]);

  if (!user && isLoaded) {
    return <SignIn />;
  }

  if (!orgId && isLoaded) {
    return <OrganizationList hidePersonal />;
  }

  return (
    <Container>
      <UserButton />
      <OrganizationSwitcher hidePersonal />
      <StatsigProvider
        sdkKey={import.meta.env.VITE_STATSIG_KEY}
        waitForInitialization={isTest ? false : true}
        initializingComponent={<Loader />}
        options={{
          // Checking for undefined because we don't allow loading segment in development
          overrideStableID: anonymousId ? `${anonymousId}` : undefined,
          environment: {
            tier: environment,
          },
          disableAutoMetricsLogging: true,
          disableCurrentPageLogging: true,
          disableDiagnosticsLogging: true,
          disableErrorLogging: true,
        }}
        user={{
          userID: user?.id,
          email: user?.primaryEmailAddress?.emailAddress
            ? user.primaryEmailAddress.emailAddress
            : undefined,
          customIDs: {
            ...(user && {
              orgID: orgId ? orgId : undefined,
            }),
          },
        }}
      >
        <Link to="/">Home</Link>
        {isLoaded && <RoutesLoader fallback={<Loader />} routes={routes} />}
      </StatsigProvider>
    </Container>
  );
};

export default App;

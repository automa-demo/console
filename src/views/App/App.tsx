import React, { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  OrganizationList,
  OrganizationSwitcher,
  SignIn,
  useAuth,
  UserButton,
  useUser,
} from '@clerk/clerk-react';
import axios from 'axios';

import { useAnalytics } from 'analytics';
import { useOptimizerUser } from 'optimizer';
import { Loader, RoutesLoader } from 'shared';

import routes from './routes';

import { Container } from './App.styles';

const App: React.FC<{}> = () => {
  const { identify } = useAnalytics();

  const { updateOptimizerUser } = useOptimizerUser();

  const { orgId, isLoaded, signOut } = useAuth();
  const { user: sessionUser } = useUser();

  // Fix to make sure clerk user is not always reloaded
  const user = useMemo(() => {
    if (!sessionUser) {
      return null;
    }

    sessionUser.externalAccounts.forEach((account) => {
      if (account.verification) {
        account.verification.expireAt = null;
      }
    });
    sessionUser.emailAddresses.forEach(
      (email) => (email.verification.expireAt = null),
    );

    return {
      ...sessionUser,
    };
  }, [sessionUser]);

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

  useEffect(() => {
    updateOptimizerUser(user, orgId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, orgId]);

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
      <Link to="/">Home</Link>
      {isLoaded && <RoutesLoader fallback={<Loader />} routes={routes} />}
    </Container>
  );
};

export default App;

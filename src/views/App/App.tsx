import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
import { Loader, RoutesLoader, useRelativeMatch } from 'shared';

import routes from './routes';

import { Container } from './App.styles';

const App: React.FC<{}> = () => {
  const { identify } = useAnalytics();

  const { updateOptimizerUser } = useOptimizerUser();

  const { orgId, isLoaded, signOut } = useAuth();
  const { user } = useUser();

  const navigate = useNavigate();

  const isAuthLoginView = useRelativeMatch('/auth/login');

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
    if (!user && isLoaded) {
      navigate('/auth/login');
    }
  }, [user, isLoaded, navigate]);

  useEffect(() => {
    identify(user?.id, user?.primaryEmailAddress?.emailAddress, orgId);
    updateOptimizerUser(
      user?.id,
      user?.primaryEmailAddress?.emailAddress,
      orgId,
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, user?.primaryEmailAddress?.emailAddress, orgId]);

  if (isAuthLoginView) {
    return <SignIn />;
  }

  if (!orgId && isLoaded) {
    return <OrganizationList hidePersonal />;
  }

  return (
    <Container>
      <UserButton signInUrl="/auth/login" />
      <OrganizationSwitcher hidePersonal />
      <Link to="/">Home</Link>
      {isLoaded && <RoutesLoader fallback={<Loader />} routes={routes} />}
    </Container>
  );
};

export default App;

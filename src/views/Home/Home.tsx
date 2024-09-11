import React from 'react';
import { Link } from 'react-router-dom';

import { useAnalytics } from 'analytics';
import { useExperiment, useGateValue } from 'optimizer';
import { Flex } from 'shared';

import { HomeProps } from './types';

import { Container } from './Home.styles';

const Home: React.FC<HomeProps> = () => {
  const { track } = useAnalytics();

  const click = () => {
    track('Home Clicked', { a: 1, b: { c: 2, name: 3, d: { what: 4 } } });
  };

  const error = () => {
    throw new Error('This is an error');
  };

  const isAutomaEmailEnabled = useGateValue('automa_email');

  const orgNameExperiment = useExperiment('experiment_org');
  const showOrgName = orgNameExperiment.get<boolean>('show_org_name', false);

  return (
    <Container>
      <Flex direction="column" alignItems="center" className="gap-2">
        <Flex className="pb-4" onClick={click}>
          {isAutomaEmailEnabled ? "Our best customer's" : ''}
          {showOrgName ? 'Org Name' : 'Home'}
        </Flex>
        <div onClick={error} onKeyDown={error} role="button" tabIndex={0}>
          Error
        </div>
        <Link to="/second">Second</Link>
        <Link to="/third/one">Third: One</Link>
        <Link to="/third/two">Third: Two</Link>
        <Link to="/first/alpha">First: Alpha</Link>
        <Link to="/first/beta/one">First: Beta: One</Link>
        <Link to="/first/beta/two">First: Beta: Two</Link>
      </Flex>
    </Container>
  );
};

export default Home;

import React from 'react';

import { Flex, useExperiment, useGate } from 'shared';
import { useAnalytics } from 'analytics';

import { HomeProps } from './types';

import { Container } from './Home.styles';

const Home: React.FC<HomeProps> = ({ ...props }) => {
  const { track } = useAnalytics();

  const click = () => {
    track('Home Clicked', { a: 1, b: { c: 2, name: 3, d: { what: 4 } } });
  };

  const isAutomaEmailEnabled = useGate('automa_email');

  const orgNameExperiment = useExperiment('experiment_org');
  const showOrgName = orgNameExperiment.get('show_org_name', false);

  return (
    <Container {...props}>
      <Flex direction="column" alignItems="center" className="gap-2">
        <Flex className="pb-4" onClick={click}>
          {isAutomaEmailEnabled ? "Our best customer's" : ''}
          {showOrgName ? 'Org Name' : 'Home'}
        </Flex>
      </Flex>
    </Container>
  );
};

export default Home;

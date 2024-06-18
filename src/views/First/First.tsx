import React from 'react';
import { Outlet } from 'react-router-dom';

import { FirstProps } from './types';

import { Container } from './First.styles';

const First: React.FC<FirstProps> = () => {
  return (
    <Container>
      First
      <Outlet />
    </Container>
  );
};

export default First;

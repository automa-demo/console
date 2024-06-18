import React from 'react';
import { useParams } from 'react-router-dom';

import { ThirdProps } from './types';

import { Container } from './Third.styles';

const Third: React.FC<ThirdProps> = () => {
  const { name } = useParams();

  return <Container>Third: {name}</Container>;
};

export default Third;

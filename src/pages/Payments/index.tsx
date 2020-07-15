import React from 'react';
import { Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

const Payments: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Button title="Add payment" onPress={() => {}} />
    </Container>
  );
};

export default Payments;

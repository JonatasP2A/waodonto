import React from 'react';
import { Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './styles';

const RegisterAttendances: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Text>Cadastrar</Text>
    </Container>
  );
};

export default RegisterAttendances;

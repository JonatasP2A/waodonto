import React from 'react';
import { BaseButton } from 'react-native-gesture-handler';

import {
  Container,
  Apresentation,
  ApresentationTextContainer,
  ApresentationText,
  Icon,
  AppointmentsContainer,
  Text,
} from './styles';

const Attendances: React.FC = () => {
  return (
    <Container>
      <Apresentation>
        <ApresentationTextContainer>
          <ApresentationText>Olá Wander,</ApresentationText>
          <ApresentationText>pacientes de hoje:</ApresentationText>
        </ApresentationTextContainer>
        <BaseButton>
          <Icon name="calendar" size={24} />
        </BaseButton>
      </Apresentation>
      <AppointmentsContainer>
        <Text>Manhã:</Text>
        <Text>Tarde:</Text>
      </AppointmentsContainer>
    </Container>
  );
};

export default Attendances;

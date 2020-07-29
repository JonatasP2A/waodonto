import React, { useState } from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  Apresentation,
  ApresentationTextContainer,
  ApresentationText,
  Icon,
  AppointmentsContainer,
  Text,
  AttendanceContainer,
  HourAttendanceContainer,
  StartHourAttendance,
  EndHourAttendance,
  PacientBox,
  PacientContainer,
  NameText,
  DetailsText,
  AddButton,
} from './styles';

const Attendances: React.FC = () => {
  const [day, setDay] = useState(new Date());
  const navigation = useNavigation();

  return (
    <Container>
      <Apresentation>
        <ApresentationTextContainer>
          <ApresentationText>Olá Wander,</ApresentationText>
          <ApresentationText>pacientes de hoje:</ApresentationText>
        </ApresentationTextContainer>
        <BaseButton>
          <Icon name="calendar" size={24} color="#fff" />
        </BaseButton>
      </Apresentation>
      <AppointmentsContainer>
        <Text>Manhã:</Text>
        <AttendanceContainer>
          <Icon
            name="clock"
            size={20}
            color="#E2887F"
            style={{ marginRight: 8 }}
          />
          <HourAttendanceContainer>
            <StartHourAttendance>08:00</StartHourAttendance>
            <EndHourAttendance>08:30</EndHourAttendance>
          </HourAttendanceContainer>
          <PacientBox>
            <PacientContainer>
              <NameText>Jônatas Pereira de Alcântara Alves</NameText>
              <DetailsText>Primeira consulta</DetailsText>
            </PacientContainer>
            <BaseButton>
              <Icon name="trash-2" size={20} color="#C74646" />
            </BaseButton>
          </PacientBox>
        </AttendanceContainer>
        <Text style={{ marginTop: 8 }}>Tarde:</Text>
      </AppointmentsContainer>
      <AddButton
        onPress={() => {
          navigation.navigate('RegisterAttendance');
        }}
      >
        <Icon name="plus" size={24} color="#fff" />
      </AddButton>
    </Container>
  );
};

export default Attendances;

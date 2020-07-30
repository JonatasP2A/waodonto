import React from 'react';
import { BaseButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
// import { format } from 'date-fns';

import { useAttendance } from '../../hooks/attendances';

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
  const { attendances } = useAttendance();
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
        {attendances.map(attendance => (
          <AttendanceContainer key={attendance.id}>
            <Icon
              name="clock"
              size={20}
              color="#E2887F"
              style={{ marginRight: 8 }}
            />
            <HourAttendanceContainer>
              <StartHourAttendance>{attendance.start_hour}</StartHourAttendance>
              <EndHourAttendance>{attendance.end_hour}</EndHourAttendance>
            </HourAttendanceContainer>
            <PacientBox>
              <PacientContainer>
                <NameText>{attendance.pacient.name}</NameText>
                <DetailsText>{attendance.treatment}</DetailsText>
              </PacientContainer>
              <BaseButton>
                <Icon name="trash-2" size={20} color="#C74646" />
              </BaseButton>
            </PacientBox>
          </AttendanceContainer>
        ))}
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

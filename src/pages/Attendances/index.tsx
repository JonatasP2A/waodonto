import React, { useState, useCallback } from 'react';
import { Platform } from 'react-native';
import { BaseButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { format, parseJSON } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';

import { useAttendance } from '../../hooks/attendances';

import {
  Container,
  Apresentation,
  ApresentationTextContainer,
  ApresentationText,
  Icon,
  AppointmentsContainer,
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
  const { attendances, changeData } = useAttendance();

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const navigation = useNavigation();

  const handleToggleDatePicker = useCallback(() => {
    setShowDatePicker(state => !state);
  }, []);

  const handleDateChanged = useCallback(
    (event: any, date: Date | undefined) => {
      if (Platform.OS === 'android') {
        setShowDatePicker(false);
      }

      if (date) {
        setSelectedDate(date);
        changeData(format(date, 'yyyy-MM-dd'));
      }
    },
    [changeData],
  );

  return (
    <Container>
      <Apresentation>
        <ApresentationTextContainer>
          <ApresentationText>Olá Wander,</ApresentationText>
          <ApresentationText>pacientes de hoje:</ApresentationText>
        </ApresentationTextContainer>
        <BaseButton onPress={handleToggleDatePicker}>
          <Icon name="calendar" size={24} color="#fff" />
        </BaseButton>

        {showDatePicker && (
          <DateTimePicker
            mode="date"
            display="calendar"
            textColor="#000"
            onChange={handleDateChanged}
            value={selectedDate}
          />
        )}
      </Apresentation>
      <AppointmentsContainer>
        {attendances.map(attendance => (
          <AttendanceContainer key={attendance.id}>
            <Icon
              name="clock"
              size={20}
              color="#E2887F"
              style={{ marginRight: 8 }}
            />
            <HourAttendanceContainer>
              <StartHourAttendance>
                {format(parseJSON(attendance.start_hour), "HH':'mm")}
              </StartHourAttendance>
              <EndHourAttendance>
                {format(parseJSON(attendance.end_hour), "HH':'mm")}
              </EndHourAttendance>
            </HourAttendanceContainer>
            <PacientBox>
              <PacientContainer>
                <NameText>{attendance.pacient.name}</NameText>
                <BaseButton>
                  <Icon name="trash-2" size={20} color="#C74646" />
                </BaseButton>
              </PacientContainer>
              <DetailsText>{attendance.treatment}</DetailsText>
            </PacientBox>
          </AttendanceContainer>
        ))}
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

import React, { useState, useRef, useCallback } from 'react';
import { Dimensions, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { usePacient } from '../../hooks/pacients';
import { useAttendance } from '../../hooks/attendances';

import {
  Container,
  PacientsScroll,
  PacientContainer,
  PacientNameText,
  Text,
  HourContainer,
} from './styles';

interface Pacient {
  id: string;
  name: string;
}

interface FormDataPacient {
  pacient_id: string;
  attendance_day: string;
  start_hour: string;
  end_hour: string;
  treatment: string;
}

const RegisterAttendances: React.FC = () => {
  const { pacients } = usePacient();
  const { addAttendance } = useAttendance();

  const formRef = useRef<FormHandles>(null);
  const [pacientSelected, setPacientSelected] = useState<Pacient>();

  const { goBack } = useNavigation();

  function handleFocused(pacient_id: string): void {
    setPacientSelected(pacients.find(pacient => pacient.id === pacient_id));
  }

  const handleAttendance = useCallback(
    async (data: FormDataPacient) => {
      try {
        if (pacientSelected) {
          formRef.current?.setErrors({});

          const schema = Yup.object().shape({
            attendance_day: Yup.string().required().length(10),
            start_hour: Yup.string().required().length(5),
            end_hour: Yup.string().required().length(5),
            treatment: Yup.string().required(),
          });

          await schema.validate(data, {
            abortEarly: false,
          });

          const date = data.attendance_day.split('/');

          addAttendance({
            pacient_id: pacientSelected.id,
            start_hour: `${date[2]}-${date[1]}-${date[0]} ${data.start_hour}:00`,
            end_hour: `${date[2]}-${date[1]}-${date[0]} ${data.end_hour}:00`,
            treatment: data.treatment,
          });
        }

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao cadastrar atendimento',
          'Ocorreu um erro ao cadastrar atendimento, cheque os campos preenchidos.',
        );
      }
    },
    [pacientSelected, goBack, addAttendance],
  );

  return (
    <Container>
      <PacientsScroll horizontal showsHorizontalScrollIndicator={false}>
        {pacients.map(pacient => (
          <PacientContainer
            key={pacient.id}
            onPress={() => handleFocused(pacient.id)}
          >
            <PacientNameText>{pacient.name}</PacientNameText>
          </PacientContainer>
        ))}
      </PacientsScroll>
      {pacientSelected ? (
        <Text>{pacientSelected.name}</Text>
      ) : (
        <Text>Selecione um paciente acima</Text>
      )}
      <Form ref={formRef} onSubmit={handleAttendance}>
        <Input
          name="attendance_day"
          icon="calendar"
          placeholder="Data da consulta"
        />
        <HourContainer>
          <Input
            name="start_hour"
            placeholder="Hora inicial"
            icon="clock"
            containerStyle={{
              width: Dimensions.get('window').width / 2 - 24,
            }}
          />
          <Input
            name="end_hour"
            placeholder="Hora final"
            icon="clock"
            containerStyle={{
              width: Dimensions.get('window').width / 2 - 24,
            }}
          />
        </HourContainer>
        <Input name="treatment" placeholder="Tratamento" icon="smile" />

        <Button
          onPress={() => {
            formRef.current?.submitForm();
          }}
        >
          Agendar
        </Button>
      </Form>
    </Container>
  );
};

export default RegisterAttendances;

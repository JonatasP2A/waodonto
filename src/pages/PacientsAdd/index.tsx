import React, { useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';
import { usePacient } from '../../hooks/pacients';

interface FormDataPacient {
  name: string;
  phone?: string;
  cpf?: string;
  address?: string;
  job?: string;
  birthday?: string;
  instagram?: string;
}

const PacientsEdit: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const { goBack } = useNavigation();
  const { addPacient } = usePacient();

  const handleEdit = useCallback(
    async (data: FormDataPacient) => {
      try {
        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          phone: Yup.string().min(10).max(14),
          cpf: Yup.string().min(11).max(14),
          address: Yup.string(),
          job: Yup.string(),
          birthday: Yup.string(),
          instagram: Yup.string(),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        addPacient(data);

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao cadastrar paciente',
          'Ocorreu um erro ao cadastrar paciente, cheque os campos preenchidos.',
        );
      }
    },
    [goBack, addPacient],
  );

  return (
    <Container>
      <Form ref={formRef} onSubmit={handleEdit}>
        <Input name="name" icon="user" placeholder="Nome" />
        <Input name="phone" icon="smartphone" placeholder="Celular" />
        <Input name="cpf" icon="user-plus" placeholder="CPF" />
        <Input name="address" icon="home" placeholder="Endereço" />
        <Input name="job" icon="briefcase" placeholder="Trabalho" />
        <Input name="instagram" icon="instagram" placeholder="Instagram" />
        <Input name="birthday" icon="gift" placeholder="Aniversário" />

        <Button
          onPress={() => {
            formRef.current?.submitForm();
          }}
        >
          Cadastrar
        </Button>
      </Form>
    </Container>
  );
};

export default PacientsEdit;

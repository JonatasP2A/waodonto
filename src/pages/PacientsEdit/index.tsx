import React, { useEffect, useCallback, useRef } from 'react';
import { Alert } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container } from './styles';
import { usePacient } from '../../hooks/pacients';

import api from '../../services/api';

interface Params {
  id: string;
}

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
  const route = useRoute();
  const { goBack } = useNavigation();
  const { editPacient } = usePacient();

  const routeParams = route.params as Params;

  const { id } = routeParams;

  useEffect(() => {
    async function loadPacient(): Promise<void> {
      const response = await api.get(`/pacients/${id}`);

      formRef.current?.setData(response.data);
    }

    loadPacient();
  }, [id, routeParams]);

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

        editPacient(id, data);

        goBack();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          return;
        }

        Alert.alert(
          'Erro ao editar paciente',
          'Ocorreu um erro ao editar paciente, cheque os campos preenchidos.',
        );
      }
    },
    [id, goBack, editPacient],
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
          Salvar Alterações
        </Button>
      </Form>
    </Container>
  );
};

export default PacientsEdit;

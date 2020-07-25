import React, { useEffect, useCallback, useRef } from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

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
      editPacient(id, data);

      goBack();
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

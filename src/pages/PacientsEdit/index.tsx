import React, { useEffect, useState, useCallback, useRef } from 'react';
import { useRoute } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { Container } from './styles';

import api from '../../services/api';

interface Params {
  id: string;
}

interface Pacient {
  id: string;
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
  const [pacient, setPacient] = useState({} as Pacient);
  const route = useRoute();

  const routeParams = route.params as Params;

  useEffect(() => {
    async function loadPacient(): Promise<void> {
      const { id } = routeParams;

      const response = await api.get(`/pacients/${id}`);

      setPacient(response.data);
    }

    loadPacient();
  }, [routeParams]);

  const handleEdit = useCallback((data: object) => {
    console.log(data);
  }, []);

  return (
    <Container>
      <Form initialData={pacient} ref={formRef} onSubmit={handleEdit}>
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

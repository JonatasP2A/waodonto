import React, { useCallback, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import Input from '../../components/Input';
import Button from '../../components/Button';

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
      addPacient(data);

      goBack();
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

import React, { useState, useCallback, useEffect, useRef } from 'react';
import { Dimensions, View, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { BaseButton } from 'react-native-gesture-handler';
import { Form } from '@unform/mobile';
import { FormHandles } from '@unform/core';

import { parseJSON } from 'date-fns';
import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  PacientsScroll,
  PacientContainer,
  PacientNameText,
  Text,
  Icon,
  PaymentFormContainer,
  PaymentFormText,
  AgContainer,
} from './styles';

import api from '../../services/api';
import { usePacient } from '../../hooks/pacients';

interface Pacient {
  id: string;
  name: string;
}

interface FormDataPacient {
  pacient_id: string;
  form_payment: string;
  amount: number;
  payment_day: string;
  agency?: number;
  account?: number;
  name_cheque?: string;
  quota?: number;
}

const RegisterPayment: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [paymentForm, setPaymentForm] = useState<number>(0);
  const [pacientSelected, setPacientSelected] = useState<Pacient>();
  const { pacients } = usePacient();

  const { goBack } = useNavigation();

  const payments_form = [
    'Forma de pagamento',
    'Dinheiro',
    'Cheque',
    'Cartão de débito',
    'Cartão de crédito',
  ];

  function handleDecrementPaymentForm(): void {
    setPaymentForm(paymentForm > 0 ? paymentForm - 1 : paymentForm);
  }

  function handleIncrementPaymentForm(): void {
    setPaymentForm(paymentForm + 1);
  }

  function handleFocused(pacient_id: string): void {
    setPacientSelected(pacients.find(pacient => pacient.id === pacient_id));
  }

  const handleCashPayment = useCallback(
    async (data: FormDataPacient) => {
      if (pacientSelected) {
        await api.post('/payments/cash-debit', {
          pacient_id: pacientSelected.id,
          form_payment: payments_form[paymentForm % 5],
          amount: data.amount,
          payment_day: new Date(),
        });
      }

      goBack();
    },
    [pacientSelected, paymentForm, payments_form, goBack],
  );

  const handleChequePayment = useCallback(
    async (data: FormDataPacient) => {
      if (pacientSelected) {
        await api.post('/payments/cheque', {
          pacient_id: pacientSelected.id,
          form_payment: payments_form[paymentForm % 5],
          amount: data.amount,
          payment_day: new Date(),
          agency: data.agency,
          account: data.account,
          name_cheque: data.name_cheque,
        });
      }

      goBack();
    },
    [pacientSelected, paymentForm, payments_form, goBack],
  );

  const handleCreditPayment = useCallback(
    async (data: FormDataPacient) => {
      if (pacientSelected) {
        await api.post('/payments/credit', {
          pacient_id: pacientSelected.id,
          form_payment: payments_form[paymentForm % 5],
          amount: data.amount,
          payment_day: new Date(),
          quota: data.quota,
        });
      }

      goBack();
    },
    [pacientSelected, paymentForm, payments_form, goBack],
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
      {pacientSelected ? <Text>{pacientSelected.name}</Text> : <View />}
      <PaymentFormContainer>
        <BaseButton onPress={() => handleDecrementPaymentForm()}>
          <Icon name="chevron-left" size={24} />
        </BaseButton>
        <PaymentFormText>{payments_form[paymentForm % 5]}</PaymentFormText>
        <BaseButton onPress={() => handleIncrementPaymentForm()}>
          <Icon name="chevron-right" size={24} />
        </BaseButton>
      </PaymentFormContainer>
      {paymentForm % 5 === 0 && <View />}
      {paymentForm % 5 === 1 && (
        <Form ref={formRef} onSubmit={handleCashPayment}>
          <Input name="amount" placeholder="Valor" keyboardType="numeric" />
          <Input
            name="payment_day"
            placeholder="Dia do pagamento"
            keyboardType="numbers-and-punctuation"
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Salvar
          </Button>
        </Form>
      )}
      {paymentForm % 5 === 2 && (
        <Form ref={formRef} onSubmit={handleChequePayment}>
          <Input name="amount" placeholder="Valor" keyboardType="numeric" />
          <Input
            name="payment_day"
            placeholder="Dia do pagamento"
            keyboardType="numeric"
          />
          <AgContainer>
            <Input
              name="agency"
              placeholder="Ag."
              keyboardType="numeric"
              containerStyle={{
                width: Dimensions.get('window').width / 2 - 24,
              }}
            />
            <Input
              name="account"
              placeholder="Conta"
              keyboardType="numeric"
              containerStyle={{
                width: Dimensions.get('window').width / 2 - 24,
              }}
            />
          </AgContainer>
          <Input name="name_cheque" placeholder="Nome titular do cheque" />

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Salvar
          </Button>
        </Form>
      )}
      {paymentForm % 5 === 3 && (
        <Form ref={formRef} onSubmit={handleCashPayment}>
          <Input name="amount" placeholder="Valor" keyboardType="numeric" />
          <Input
            name="payment_day"
            placeholder="Dia do pagamento"
            keyboardType="numeric"
          />
          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Salvar
          </Button>
        </Form>
      )}
      {paymentForm % 5 === 4 && (
        <Form ref={formRef} onSubmit={handleCreditPayment}>
          <Input name="amount" placeholder="Valor" keyboardType="numeric" />
          <Input
            name="payment_day"
            placeholder="Dia do pagamento"
            keyboardType="numeric"
          />
          <Input
            name="quota"
            placeholder="Nº parcelas"
            keyboardType="numeric"
          />

          <Button
            onPress={() => {
              formRef.current?.submitForm();
            }}
          >
            Salvar
          </Button>
        </Form>
      )}
    </Container>
  );
};

export default RegisterPayment;

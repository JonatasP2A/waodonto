import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getMonth, getYear, format } from 'date-fns';

import {
  Container,
  BalanceContainer,
  BalanceMonth,
  Balance,
  Icon,
  BalanceTextMonth,
  BalanceTextBalance,
  ScrollView,
  DetailsContainer,
  PacientContainer,
  PacientNameText,
  Row,
  PacientText,
  AddButton,
  AddIcon,
} from './styles';

import api from '../../services/api';

interface Payments {
  id: string;
  form_payment: string;
  amount: string;
  payment_day: string;
  agency?: string;
  account?: string;
  name_cheque?: string;
  pacient: {
    name: string;
  };
}

const Payments: React.FC = () => {
  const [month, setMonth] = useState(getMonth(new Date()) + 1);
  const [year, setYear] = useState(getYear(new Date()));
  const [payments, setPayments] = useState<Payments[]>([]);

  const navigation = useNavigation();

  const months = [
    'Janeiro',
    'Fevereiro',
    'Março',
    'Abril',
    'Maio',
    'Junho',
    'Julho',
    'Agosto',
    'Setembro',
    'Outubro',
    'Novembro',
    'Dezembro',
  ];

  function handleDecrementMonth(): void {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }

  function handleIncrementMonth(): void {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }

  useEffect(() => {
    async function loadPayments(): Promise<void> {
      const response = await api.get('/payments', {
        params: {
          month,
          year,
        },
      });

      setPayments(response.data);
    }

    loadPayments();
  }, [month, year]);

  const balanceTotal = useMemo(() => {
    const total = payments.reduce((accumulator, payment) => {
      accumulator += Number(payment.amount);

      return accumulator;
    }, 0);

    return total;
  }, [payments]);

  return (
    <Container>
      <BalanceContainer>
        <BalanceMonth>
          <BorderlessButton onPress={() => handleDecrementMonth()}>
            <Icon name="chevron-left" size={24} />
          </BorderlessButton>
          <Balance>
            <BalanceTextMonth>
              {month === getMonth(new Date()) + 1
                ? 'Este mês:'
                : `${months[month - 1]}:`}
            </BalanceTextMonth>
            <BalanceTextBalance>{balanceTotal}</BalanceTextBalance>
          </Balance>
          <BorderlessButton onPress={() => handleIncrementMonth()}>
            <Icon name="chevron-right" size={24} />
          </BorderlessButton>
        </BalanceMonth>
      </BalanceContainer>
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailsContainer>
          {payments.map(payment => (
            <PacientContainer key={payment.id}>
              <PacientNameText>{payment.pacient.name}</PacientNameText>
              <Row>
                <PacientText>
                  {payment.amount} | {payment.form_payment}
                </PacientText>
                <PacientText>
                  {format(new Date(payment.payment_day), 'dd/MM/yyyy')}
                </PacientText>
              </Row>
              {payment.account && payment.agency && (
                <Row>
                  <PacientText>Ag: {payment.agency}</PacientText>
                  <PacientText>Conta: {payment.account}</PacientText>
                  <PacientText>Nº Cheque: 850653</PacientText>
                </Row>
              )}
              {payment.name_cheque && (
                <PacientText>Cheque de: {payment.name_cheque}</PacientText>
              )}
            </PacientContainer>
          ))}
        </DetailsContainer>
      </ScrollView>
      <AddButton onPress={() => navigation.navigate('RegisterPayment')}>
        <AddIcon name="plus" size={24} />
      </AddButton>
    </Container>
  );
};

export default Payments;

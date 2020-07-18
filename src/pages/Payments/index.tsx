import React, { useState, useEffect, useMemo } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getMonth, getYear } from 'date-fns';

import {
  Container,
  BalanceContainer,
  BalanceMonth,
  Balance,
  Icon,
  BalanceTextMonth,
  BalanceTextBalance,
  DetailsContainer,
  PacientContainer,
  PacientNameText,
  Row,
  PacientText,
} from './styles';

import formatValue from '../../utils/formatValue';
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

    return formatValue(total);
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
      <DetailsContainer>
        <PacientContainer>
          <PacientNameText>Jônatas Pereira de Alcântara Alves</PacientNameText>
          <Row>
            <PacientText>R$ 1000,00 | Cheque</PacientText>
            <PacientText>03/07/2020</PacientText>
          </Row>
        </PacientContainer>
      </DetailsContainer>
    </Container>
  );
};

export default Payments;

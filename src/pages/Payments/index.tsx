import React, { useMemo } from 'react';
import { useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { getMonth, format } from 'date-fns';

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

import { usePayment } from '../../hooks/payments';
import formatValue from '../../utils/formatValue';

interface Payments {
  id: string;
  form_payment: string;
  amount: number;
  payment_day: string;
  agency?: number;
  account?: number;
  name_cheque?: string;
  pacient: {
    name: string;
  };
}

const Payments: React.FC = () => {
  const {
    incrementMonth,
    decrementMonth,
    removePayment,
    payments,
    month,
  } = usePayment();

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
    decrementMonth();
  }

  function handleIncrementMonth(): void {
    incrementMonth();
  }

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
      <ScrollView showsVerticalScrollIndicator={false}>
        <DetailsContainer>
          {payments.map((payment, i) => (
            <PacientContainer
              key={payment.id}
              style={
                i === payments.length - 1 && {
                  borderBottomWidth: 0,
                  paddingBottom: 0,
                }
              }
            >
              <Row>
                <PacientNameText>{payment.pacient.name}</PacientNameText>
                <BorderlessButton onPress={() => removePayment(payment.id)}>
                  <Icon name="trash-2" size={20} />
                </BorderlessButton>
              </Row>
              <Row>
                <PacientText>
                  {formatValue(Number(payment.amount))} | {payment.form_payment}
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

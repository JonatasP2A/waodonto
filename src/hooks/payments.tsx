import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { getMonth, getYear } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface Payment {
  id: string;
  pacient_id: string;
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

interface AddPayment {
  pacient_id: string;
  form_payment: string;
  amount: number;
  payment_day: string;
  agency?: number;
  account?: number;
  name_cheque?: string;
  quota?: number;
}

interface PaymentContext {
  payments: Payment[];
  month: number;
  year: number;
  addCashOrDebitPayment(data: AddPayment): Promise<void>;
  addChequePayment(data: AddPayment): Promise<void>;
  addCreditPayment(data: AddPayment): Promise<void>;
  removePayment(id: string): Promise<void>;
  decrementMonth(): void;
  incrementMonth(): void;
}

const PaymentContext = createContext<PaymentContext | null>(null);

const PaymentProvider: React.FC = ({ children }) => {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [month, setMonth] = useState(getMonth(new Date()) + 1);
  const [year, setYear] = useState(getYear(new Date()));

  useEffect(() => {
    async function loadPacients(): Promise<void> {
      const response = await api.get('/payments', {
        params: {
          month,
          year,
        },
      });
      setPayments(response.data);

      await AsyncStorage.setItem(
        '@WaOdonto:payments',
        JSON.stringify(response.data),
      );
    }

    loadPacients();
  }, [month, year]);

  const addCashOrDebitPayment = useCallback(
    async (data: AddPayment) => {
      const response = await api.post('/payments/cash-debit', data);
      const userName = await api.get(`/pacients/${response.data.pacient_id}`);

      setPayments([
        ...payments,
        { ...response.data, pacient: { name: userName.data.name } },
      ]);

      await AsyncStorage.setItem(
        '@WaOdonto:payments',
        JSON.stringify(payments),
      );
    },
    [payments],
  );

  const addChequePayment = useCallback(
    async (data: AddPayment) => {
      const response = await api.post('/payments/cheque', data);
      const userName = await api.get(`/pacients/${response.data.pacient_id}`);

      setPayments([
        ...payments,
        { ...response.data, pacient: { name: userName.data.name } },
      ]);

      await AsyncStorage.setItem(
        '@WaOdonto:payments',
        JSON.stringify(payments),
      );
    },
    [payments],
  );

  const addCreditPayment = useCallback(
    async (data: AddPayment) => {
      const response = await api.post('/payments/credit', data);
      const userName = await api.get(`/pacients/${response.data.pacient_id}`);

      setPayments([
        ...payments,
        { ...response.data, pacient: { name: userName.data.name } },
      ]);

      await AsyncStorage.setItem(
        '@WaOdonto:payments',
        JSON.stringify(payments),
      );
    },
    [payments],
  );

  const removePayment = useCallback(
    async (id: string) => {
      const findPayment = payments.find(payment => payment.id === id);

      if (findPayment) {
        setPayments(payments.filter(payment => payment.id !== id));
      }
      await api.delete(`/payments/${id}`);

      await AsyncStorage.setItem(
        '@WaOdonto:payments',
        JSON.stringify(payments),
      );
    },
    [payments],
  );

  const decrementMonth = useCallback(() => {
    if (month === 1) {
      setYear(year - 1);
      setMonth(12);
    } else {
      setMonth(month - 1);
    }
  }, [month, year]);

  const incrementMonth = useCallback(() => {
    if (month === 12) {
      setYear(year + 1);
      setMonth(1);
    } else {
      setMonth(month + 1);
    }
  }, [month, year]);

  const value = React.useMemo(
    () => ({
      addCashOrDebitPayment,
      addChequePayment,
      addCreditPayment,
      removePayment,
      decrementMonth,
      incrementMonth,
      payments,
      month,
      year,
    }),
    [
      payments,
      month,
      year,
      addCashOrDebitPayment,
      addChequePayment,
      addCreditPayment,
      removePayment,
      decrementMonth,
      incrementMonth,
    ],
  );

  return (
    <PaymentContext.Provider value={value}>{children}</PaymentContext.Provider>
  );
};

function usePayment(): PaymentContext {
  const context = useContext(PaymentContext);

  if (!context) {
    throw new Error(`usePayment must be used within a PaymentProvider`);
  }

  return context;
}

export { PaymentProvider, usePayment };

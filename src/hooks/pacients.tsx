import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

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

interface PacientContext {
  pacients: Pacient[];
  addPacient(data: Omit<Pacient, 'id'>): void;
  editPacient(id: string, data: Omit<Pacient, 'id'>): void;
}

const PacientContext = createContext<PacientContext | null>(null);

const PacientProvider: React.FC = ({ children }) => {
  const [pacients, setPacients] = useState<Pacient[]>([]);

  useEffect(() => {
    async function loadPacients(): Promise<void> {
      const response = await api.get('/all-pacients');
      setPacients(response.data);

      await AsyncStorage.setItem(
        '@WaOdonto:pacients',
        JSON.stringify(response.data),
      );
    }

    loadPacients();
  }, []);

  const addPacient = useCallback(
    async (data: Omit<Pacient, 'id'>) => {
      const response = await api.post('pacients', data);

      setPacients([...pacients, response.data]);

      await AsyncStorage.setItem(
        '@WaOdonto:pacients',
        JSON.stringify(pacients),
      );
    },
    [pacients],
  );

  const editPacient = useCallback(
    async (id: string, data: Omit<Pacient, 'id'>) => {
      const findPacient = pacients.find(pacient => pacient.id === id);

      if (findPacient) {
        setPacients(
          pacients.map(pacient =>
            pacient.id === id
              ? {
                  ...pacient,
                  name: data.name,
                  phone: data.phone,
                  job: data.job,
                  cpf: data.cpf,
                  address: data.address,
                  birthday: data.birthday,
                  instagram: data.instagram,
                }
              : pacient,
          ),
        );
      }
      await api.put(`/pacients/${id}`, data);

      await AsyncStorage.setItem(
        '@WaOdonto:pacients',
        JSON.stringify(pacients),
      );
    },
    [pacients],
  );

  const value = React.useMemo(() => ({ addPacient, editPacient, pacients }), [
    pacients,
    addPacient,
    editPacient,
  ]);

  return (
    <PacientContext.Provider value={value}>{children}</PacientContext.Provider>
  );
};

function usePacient(): PacientContext {
  const context = useContext(PacientContext);

  if (!context) {
    throw new Error(`usePacient must be used within a PacientProvider`);
  }

  return context;
}

export { PacientProvider, usePacient };

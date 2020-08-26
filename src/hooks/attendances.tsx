import React, {
  createContext,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';

import { format, isSameDay } from 'date-fns';
import AsyncStorage from '@react-native-community/async-storage';
import api from '../services/api';

interface Attendance {
  id: string;
  pacient_id: string;
  start_hour: string;
  end_hour: string;
  treatment: string;
  pacient: {
    name: string;
  };
}

interface AddAttendance {
  pacient_id: string;
  start_hour: string;
  end_hour: string;
  treatment: string;
}

interface AttendanceContext {
  attendances: Attendance[];
  addAttendance(data: AddAttendance): Promise<void>;
  removeAttendance(id: string): Promise<void>;
  changeData(data: string): void;
}

const AttendanceContext = createContext<AttendanceContext | null>(null);

const AttendanceProvider: React.FC = ({ children }) => {
  const [attendances, setAttendances] = useState<Attendance[]>([]);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    async function loadPacients(): Promise<void> {
      const response = await api.get(`/attendances/${date}`);
      setAttendances(response.data);

      await AsyncStorage.setItem(
        '@WaOdonto:attendances',
        JSON.stringify(response.data),
      );
    }

    loadPacients();
  }, [date]);

  const addAttendance = useCallback(
    async (data: AddAttendance) => {
      const response = await api.post('/attendances', data);
      const userName = await api.get(`/pacients/${response.data.pacient_id}`);

      const actualDay = isSameDay(
        new Date(),
        new Date(response.data.start_hour),
      );

      if (actualDay) {
        setAttendances([
          ...attendances,
          { ...response.data, pacient: { name: userName.data.name } },
        ]);

        await AsyncStorage.setItem(
          '@WaOdonto:attendances',
          JSON.stringify(attendances),
        );
      }
    },
    [attendances],
  );

  const removeAttendance = useCallback(
    async (id: string) => {
      const findAttendance = attendances.find(
        attendance => attendance.id === id,
      );

      if (findAttendance) {
        setAttendances(attendances.filter(attendance => attendance.id !== id));
      }
      await api.delete(`/attendances/${id}`);

      await AsyncStorage.setItem(
        '@WaOdonto:pacients',
        JSON.stringify(attendances),
      );
    },
    [attendances],
  );

  const changeData = useCallback((data: string) => {
    setDate(data);
  }, []);

  const value = React.useMemo(
    () => ({ addAttendance, removeAttendance, changeData, attendances }),
    [attendances, addAttendance, removeAttendance, changeData],
  );

  return (
    <AttendanceContext.Provider value={value}>
      {children}
    </AttendanceContext.Provider>
  );
};

function useAttendance(): AttendanceContext {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error(`useAttendance must be used within a AttendanceProvider`);
  }

  return context;
}

export { AttendanceProvider, useAttendance };

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PacientProvider } from './pacients';
import { AttendanceProvider } from './attendances';
import { PaymentProvider } from './payments';

const AppProvider: React.FC = ({ children }) => {
  return (
    <PacientProvider>
      <AttendanceProvider>
        <PaymentProvider>
          <NavigationContainer>{children}</NavigationContainer>
        </PaymentProvider>
      </AttendanceProvider>
    </PacientProvider>
  );
};

export default AppProvider;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PacientProvider } from './pacients';
import { AttendanceProvider } from './attendances';

const AppProvider: React.FC = ({ children }) => {
  return (
    <PacientProvider>
      <AttendanceProvider>
        <NavigationContainer>{children}</NavigationContainer>
      </AttendanceProvider>
    </PacientProvider>
  );
};

export default AppProvider;

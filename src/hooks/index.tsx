import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PacientProvider } from './pacients';

const AppProvider: React.FC = ({ children }) => {
  return (
    <PacientProvider>
      <NavigationContainer>{children}</NavigationContainer>
    </PacientProvider>
  );
};

export default AppProvider;

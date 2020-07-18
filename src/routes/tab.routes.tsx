import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Feather';

import AttendancesStackScreen from './attendancesStack.routes';
import PacientsStackScreen from './pacientsStack.routes';
import Payments from '../pages/Payments';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
  <NavigationContainer>
    <Tab.Navigator
      tabBarOptions={{
        labelPosition: 'below-icon',
        activeTintColor: '#E2887F',
        inactiveTintColor: '#000',
        labelStyle: {
          fontSize: 12,
          fontWeight: '600',
          fontFamily: 'Poppins-Medium',
        },
      }}
    >
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="calendar" color={color} />
          ),
          title: 'Agendamentos',
        }}
        name="Agendamentos"
        component={AttendancesStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="user" color={color} />
          ),
          title: 'Pacientes',
        }}
        name="Pacientes"
        component={PacientsStackScreen}
      />
      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon size={24} name="dollar-sign" color={color} />
          ),
          title: 'Pagamentos',
        }}
        name="Pagamentos"
        component={Payments}
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default AppRoutes;

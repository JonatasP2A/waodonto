import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';

import AttendancesStackScreen from './attendancesStack.routes';
import PacientsStackScreen from './pacientsStack.routes';
import PaymentsStackScreen from './paymentsStack.routes';

const Tab = createBottomTabNavigator();

const AppRoutes: React.FC = () => (
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
        tabBarIcon: ({ color }) => <Icon size={24} name="user" color={color} />,
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
      component={PaymentsStackScreen}
    />
  </Tab.Navigator>
);

export default AppRoutes;

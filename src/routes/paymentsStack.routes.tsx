import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Payments from '../pages/Payments';
import RegisterPayment from '../pages/RegisterPayment';

const App = createStackNavigator();

const AttendancesStackScreen: React.FC = () => (
  <App.Navigator>
    <App.Screen
      name="Payments"
      component={Payments}
      options={() => ({
        headerTitle: 'Pagamentos',
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#273554' },
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 16,
        },
      })}
    />
    <App.Screen
      name="RegisterPayment"
      component={RegisterPayment}
      options={() => ({
        headerTitle: 'Cadastrar pagamentos',
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#273554' },
        headerTitleStyle: {
          fontFamily: 'Poppins-Medium',
          fontSize: 16,
        },
      })}
    />
  </App.Navigator>
);

export default AttendancesStackScreen;

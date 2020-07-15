import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Pacients from '../pages/Pacients';

const App = createStackNavigator();

const AttendancesStackScreen: React.FC = () => (
  <App.Navigator>
    <App.Screen
      name="Agenda"
      component={Pacients}
      options={() => ({
        headerTitle: 'Clientes',
        headerTitleAlign: 'center',
        headerTintColor: '#fff',
        headerStyle: { backgroundColor: '#273554' },
      })}
    />
  </App.Navigator>
);

export default AttendancesStackScreen;

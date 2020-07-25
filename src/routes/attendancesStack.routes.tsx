import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Attendance from '../pages/Attendances';
import RegisterAttendance from '../pages/RegisterAttendance';

const App = createStackNavigator();

const AttendancesStackScreen: React.FC = () => (
  <App.Navigator>
    <App.Screen
      name="Agenda"
      component={Attendance}
      options={() => ({
        headerTitle: '',
        headerStyle: { backgroundColor: '#273554' },
      })}
    />
    <App.Screen
      name="Agendamento"
      component={RegisterAttendance}
      options={() => ({
        headerTitle: 'Agendamentos',
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

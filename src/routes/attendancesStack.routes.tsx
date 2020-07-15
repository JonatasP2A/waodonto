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
      options={() => ({ headerTitle: 'Agenda', headerTitleAlign: 'center' })}
    />
    <App.Screen
      name="Agendamento"
      component={RegisterAttendance}
      options={() => ({
        headerTitle: 'Agendamentos',
        headerTitleAlign: 'center',
      })}
    />
  </App.Navigator>
);

export default AttendancesStackScreen;

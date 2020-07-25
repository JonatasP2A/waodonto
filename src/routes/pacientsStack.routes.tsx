import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Pacients from '../pages/Pacients';
import PacientsInfo from '../pages/PacientsInfo';
import PacientsEdit from '../pages/PacientsEdit';
import PacientsAdd from '../pages/PacientsAdd';

const App = createStackNavigator();

const AttendancesStackScreen: React.FC = () => (
  <App.Navigator>
    <App.Screen
      name="Pacients"
      component={Pacients}
      options={() => ({
        headerTitle: 'Clientes',
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
      name="PacientsInfo"
      component={PacientsInfo}
      options={() => ({
        headerTitle: 'Informações do paciente',
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
      name="PacientsEdit"
      component={PacientsEdit}
      options={() => ({
        headerTitle: 'Informações do paciente',
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
      name="PacientsAdd"
      component={PacientsAdd}
      options={() => ({
        headerTitle: 'Cadastro',
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

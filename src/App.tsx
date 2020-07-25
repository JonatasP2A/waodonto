import 'react-native-gesture-handler';
import 'intl';
import 'intl/locale-data/jsonp/pt-BR';
import React from 'react';
import { View, StatusBar } from 'react-native';
import Routes from './routes';
import AppContainer from './hooks';

const App: React.FC = () => (
  <View style={{ flex: 1 }}>
    <AppContainer>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      <Routes />
    </AppContainer>
  </View>
);

export default App;

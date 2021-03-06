import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 16px 20px 0;
`;

export const PacientsScroll = styled.ScrollView`
  flex: 1;
  max-height: 60px;
`;

export const PacientContainer = styled(RectButton)`
  flex: 1;
  flex-direction: row;
  background: #b7b7cc;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  padding: 8px;
  margin-right: 16px;
  margin-bottom: 16px;
`;

export const PacientNameText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: #fff;
`;

export const Text = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 26px;
  color: #e2887f;
`;

export const HourContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

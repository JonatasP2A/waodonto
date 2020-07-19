import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px 20px 0;
`;

export const BalanceContainer = styled.View`
  height: 120px;
  width: 100%;
  border-radius: 20px;
  background: #e2887f;
  justify-content: center;
`;

export const BalanceMonth = styled.View`
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Balance = styled.View`
  justify-content: center;
`;

export const Icon = styled(FeatherIcon)`
  color: #000;
`;

export const BalanceTextMonth = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: #000;
`;

export const BalanceTextBalance = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 36px;
  color: #000;
`;

export const ScrollView = styled.ScrollView`
  margin-top: 20px;
`;

export const DetailsContainer = styled.View`
  width: 100%;
  border-radius: 20px;
  background: #627b9b;
  padding: 20px 20px;
`;

export const PacientContainer = styled.View`
  border-bottom-width: 1px;
  border-color: #000;
  margin-bottom: 8px;
  padding-bottom: 8px;
`;

export const PacientNameText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: #e2887f;
`;

export const Row = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PacientText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  color: #fff;
`;

export const AddButton = styled(RectButton)`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background: #e2887f;
  z-index: 1;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  margin-bottom: 20px;
`;

export const AddIcon = styled(FeatherIcon)`
  color: #fff;
`;

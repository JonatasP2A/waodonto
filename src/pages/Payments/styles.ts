import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
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

export const DetailsContainer = styled.View`
  /* flex: 1; */
  width: 100%;
  border-radius: 20px;
  background: #627b9b;
  margin-top: 16px;
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
  color: #fff;
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

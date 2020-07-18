import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 0 20px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 40px 0 0;
`;

export const PacientName = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 26px;
  color: #e2887f;
  max-width: 300px;
`;

export const IconEdit = styled(FeatherIcon)`
  margin-top: 5px;
  margin-left: auto;
`;

export const Body = styled.View`
  margin: 40px 40px 0;
  flex: 1;
`;

export const Information = styled.View`
  flex-direction: row;
  margin-bottom: 24px;
`;

export const Text = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  padding-right: 40px;
  color: #000;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

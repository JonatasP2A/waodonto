import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  flex: 1;
  background: #273554;
`;

export const Icon = styled(FeatherIcon)`
  color: #fff;
`;

export const Apresentation = styled.View`
  margin: 0 20px 16px;
  background: #273554;
  flex-direction: row;
  justify-content: space-between;
`;

export const ApresentationTextContainer = styled.View``;

export const ApresentationText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 24px;
  color: #fff;
`;

export const AppointmentsContainer = styled.View`
  flex: 1;
  background: #fff;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
  padding: 32px 20px 16px;
`;

export const Text = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 24px;
  color: #000;
  margin-bottom: 16px;
`;

import styled from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #e5dbda;
  border-radius: 20px;
  margin-bottom: 8px;

  flex-direction: row;
  align-items: center;
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: #000;
  font-size: 16px;
  font-family: 'Poppins-Regular';
  margin-top: 5px;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
  color: #000;
`;

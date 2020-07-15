import styled from 'styled-components/native';
import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface Pacient {
  id: string;
  name: string;
  phone?: string;
  cpf?: string;
}

export const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

export const PacientContainer = styled.View`
  border-radius: 10px;
  margin-top: 40px;
  flex: 1;
  flex-direction: row;
`;

export const PacientList = styled(
  FlatList as new () => FlatList<Pacient>,
).attrs({
  numColumns: 2,
})`
  flex: 1;
  padding: 0 20px;
`;

export const Pacient = styled(RectButton)`
  background: #e2887f;
  padding: 16px;
  border-radius: 10px;
  margin: 8px;
  flex: 1;
`;

export const PacientName = styled.Text`
  font-size: 18px;
  line-height: 24px;
  color: #000;
  margin-bottom: 24px;
`;

export const PacientInfo = styled.View`
  margin-top: auto;
`;

export const PacientLine = styled.View`
  flex-direction: row;
  align-items: center;
  margin-top: auto;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 8px;
`;

export const PacientPhone = styled.Text`
  font-size: 14px;
  color: #000;
`;

export const PacientCPF = styled.Text`
  font-size: 14px;
  margin-top: 8px;
  color: #000;
`;

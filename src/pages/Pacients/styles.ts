import styled from 'styled-components/native';
import { FlatList, Dimensions } from 'react-native';
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
  margin-top: 32px;
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
  font-family: 'Poppins-Regular';
  font-size: 16px;
  line-height: 20px;
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
  font-family: 'Poppins-Regular';
  font-size: 12px;
  color: #000;
`;

export const PacientCPF = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 12px;
  margin-top: 8px;
  color: #000;
`;

export const AddButton = styled(RectButton)`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background: #627b9b;
  z-index: 1;
  align-items: center;
  justify-content: center;
  bottom: 0;
  left: ${Dimensions.get('window').width - 70}px;
  margin-bottom: 20px;
`;

export const AddIcon = styled(FeatherIcon)`
  color: #fff;
`;

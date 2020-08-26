import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FeatherIcon from 'react-native-vector-icons/Feather';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const PacientContainer = styled(RectButton)`
  width: ${Dimensions.get('window').width / 2 - 28}px;
  max-height: 170px;
  background: #e2887f;
  border-radius: 10px;
  margin-bottom: 16px;
  padding: 16px;
`;

export const PacientName = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  line-height: 20px;
  color: #000;
  margin-bottom: auto;
`;

export const PacientInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const PacientInfoText = styled.Text`
  flex-direction: row;
  align-items: center;
  margin-top: auto;
`;

export const Icon = styled(FeatherIcon)``;

export const AddButton = styled(RectButton)`
  position: absolute;
  height: 50px;
  width: 50px;
  border-radius: 50px;
  background: #627b9b;
  z-index: 1;
  align-items: center;
  justify-content: center;
  bottom: 20px;
  left: ${Dimensions.get('window').width - 70}px;
`;

export const AddIcon = styled(FeatherIcon)`
  color: #fff;
`;

import styled from 'styled-components/native';
import { Dimensions } from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  background: #273554;
`;

export const Icon = styled(FeatherIcon)``;

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

export const ScrollView = styled.ScrollView`
  flex: 1;
  background: #fff;
  border-top-right-radius: 25px;
  border-top-left-radius: 25px;
`;

export const AppointmentsContainer = styled.View`
  padding: 32px 20px 16px;
`;

export const Text = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 24px;
  color: #000;
  margin-bottom: 16px;
`;

export const AttendanceContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 8px;
  /* max-width: 235px; */
`;

export const HourAttendanceContainer = styled.View`
  margin-right: 8px;
`;

export const StartHourAttendance = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  color: #000;
  width: 40px;
`;

export const EndHourAttendance = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  color: #000;
`;

export const PacientBox = styled.View`
  flex: 1;
  border-radius: 10px;
  background: #e5dbda;
  padding: 8px 16px;
`;

export const PacientContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const NameText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 16px;
  color: #000;
  max-width: 180px;
`;

export const DetailsText = styled.Text`
  font-family: 'Poppins-Regular';
  font-size: 14px;
  color: #817e7e;
  max-width: 180px;
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
  left: ${Dimensions.get('window').width - 70}px;
  margin-bottom: 20px;
`;

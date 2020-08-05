import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 0 16px;
  background: #e5dbda;
  border-radius: 20px;
  margin-bottom: 8px;
  border-width: 2px;
  border-color: #e5dbda;

  flex-direction: row;
  align-items: center;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #e2887f;
    `}
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

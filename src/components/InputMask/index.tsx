import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';
import { TextInputMaskProps } from 'react-native-masked-text';

import { Container, TextInput, Icon } from './styles';

interface InputProps extends TextInputMaskProps {
  name: string;
  icon?: string;
  containerStyle?: {};
}

interface InputValueReference {
  value: string;
}

const InputMask: React.FC<InputProps> = ({
  name,
  icon,
  containerStyle = {},
  ...rest
}) => {
  const inputElementRef = useRef<any>(null);

  const { registerField, defaultValue = '', fieldName, error } = useField(name);
  const inputValueRef = useRef<InputValueReference>({ value: defaultValue });

  useEffect(() => {
    registerField<string>({
      name: fieldName,
      ref: inputValueRef.current,
      path: 'value',
      setValue(ref: any, value) {
        inputValueRef.current.value = value;
        inputElementRef.current.setNativeProps({ text: value });
      },
      clearValue() {
        inputValueRef.current.value = '';
        inputElementRef.current.clear();
      },
    });
  }, [fieldName, registerField]);

  return (
    <Container style={containerStyle}>
      {icon && <Icon name={icon} size={20} color="#666360" />}
      <TextInput
        ref={inputElementRef}
        keyboardAppearance="dark"
        placeholderTextColor="#666360"
        onChangeText={value => {
          inputValueRef.current.value = value;
        }}
        {...rest}
      />
    </Container>
  );
};

export default InputMask;

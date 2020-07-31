import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  PacientContainer,
  PacientList,
  Pacient,
  PacientName,
  PacientInfo,
  PacientLine,
  PacientPhone,
  PacientCPF,
  Icon,
  AddButton,
  AddIcon,
} from './styles';

import { usePacient } from '../../hooks/pacients';

interface Pacient {
  id: string;
  name: string;
  phone?: string;
  cpf?: string;
}

const Pacients: React.FC = () => {
  const { pacients } = usePacient();

  const navigation = useNavigation();

  async function handleNavigate(id: string): Promise<void> {
    navigation.navigate('PacientsInfo', { id });
  }

  return (
    <Container>
      <PacientContainer>
        <PacientList
          data={pacients}
          keyExtractor={item => item.id}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <Pacient onPress={() => handleNavigate(item.id)}>
              <PacientName>{item.name}</PacientName>
              <PacientInfo>
                <PacientLine>
                  <Icon name="smartphone" size={20} />
                  <PacientPhone>{item.phone}</PacientPhone>
                </PacientLine>
                <PacientLine>
                  <Icon name="user" size={20} />
                  <PacientCPF>{item.cpf}</PacientCPF>
                </PacientLine>
              </PacientInfo>
            </Pacient>
          )}
        />
      </PacientContainer>
      <AddButton onPress={() => navigation.navigate('PacientsAdd')}>
        <AddIcon name="plus" size={24} />
      </AddButton>
    </Container>
  );
};

export default Pacients;

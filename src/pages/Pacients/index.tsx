import React from 'react';
import { useNavigation } from '@react-navigation/native';

import {
  Container,
  PacientContainer,
  PacientName,
  PacientInfo,
  PacientInfoText,
  Icon,
  AddButton,
  AddIcon,
} from './styles';

import { usePacient } from '../../hooks/pacients';
import { ScrollView } from '../Attendances/styles';

const Pacients: React.FC = () => {
  const { pacients } = usePacient();

  const navigation = useNavigation();

  async function handleNavigate(id: string): Promise<void> {
    navigation.navigate('PacientsInfo', { id });
  }

  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Container>
          {pacients.map(pacient => (
            <PacientContainer
              key={pacient.id}
              onPress={() => handleNavigate(pacient.id)}
            >
              <PacientName>{pacient.name}</PacientName>
              <PacientInfo style={{ marginBottom: 8, marginTop: 24 }}>
                <Icon name="smartphone" size={20} />
                <PacientInfoText>{pacient.phone}</PacientInfoText>
              </PacientInfo>
              <PacientInfo>
                <Icon name="user" size={20} />
                <PacientInfoText>{pacient.cpf}</PacientInfoText>
              </PacientInfo>
            </PacientContainer>
          ))}
        </Container>
      </ScrollView>

      <AddButton onPress={() => navigation.navigate('PacientsAdd')}>
        <AddIcon name="plus" size={24} />
      </AddButton>
    </>
  );
};

export default Pacients;

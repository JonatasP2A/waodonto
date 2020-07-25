import React from 'react';
import { useRoute, useNavigation } from '@react-navigation/native';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
  Container,
  Header,
  PacientName,
  IconEdit,
  Body,
  Information,
  Text,
  Icon,
} from './styles';
import { usePacient } from '../../hooks/pacients';

interface Params {
  id: string;
}

interface Pacient {
  id: string;
  name: string;
  phone?: string;
  cpf?: string;
  address?: string;
  job?: string;
  birthday?: string;
  instagram?: string;
}

const PacientsInfo: React.FC = () => {
  const { pacients } = usePacient();

  const navigation = useNavigation();

  const route = useRoute();

  async function handleNavigate(id: string): Promise<void> {
    navigation.navigate('PacientsEdit', { id });
  }

  const routeParams = route.params as Params;
  const { id } = routeParams;

  const pacient = pacients.find(p => p.id === id);

  return (
    <Container>
      <Header>
        <PacientName>{pacient && pacient.name}</PacientName>
        {pacient && (
          <BorderlessButton onPress={() => handleNavigate(pacient.id)}>
            <IconEdit name="edit" size={24} />
          </BorderlessButton>
        )}
      </Header>
      <Body>
        <Information>
          <Icon name="smartphone" size={24} />
          <Text>
            {pacient && pacient.phone ? pacient.phone : 'Não cadastrado'}
          </Text>
        </Information>
        <Information>
          <Icon name="user" size={24} />
          <Text>{pacient && pacient.cpf ? pacient.cpf : 'Não cadastrado'}</Text>
        </Information>
        <Information>
          <Icon name="home" size={24} />
          <Text>
            {pacient && pacient.address ? pacient.address : 'Não cadastrado'}
          </Text>
        </Information>
        <Information>
          <Icon name="briefcase" size={24} />
          <Text>{pacient && pacient.job ? pacient.job : 'Não cadastrado'}</Text>
        </Information>
        <Information>
          <Icon name="instagram" size={24} />
          <Text>
            {pacient && pacient.instagram
              ? pacient.instagram
              : 'Não cadastrado'}
          </Text>
        </Information>
        <Information>
          <Icon name="gift" size={24} />
          <Text>
            {pacient && pacient.birthday ? pacient.birthday : 'Não cadastrado'}
          </Text>
        </Information>
      </Body>
    </Container>
  );
};

export default PacientsInfo;

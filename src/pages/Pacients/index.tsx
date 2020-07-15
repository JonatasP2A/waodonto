import React, { useState, useEffect } from 'react';

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
} from './styles';
import api from '../../services/api';

interface Pacient {
  id: string;
  name: string;
  phone?: string;
  cpf?: string;
}

const Pacients: React.FC = () => {
  const [pacients, setPacients] = useState<Pacient[]>([]);

  useEffect(() => {
    async function loadPacients(): Promise<void> {
      const response = await api.get('/all-pacients');

      setPacients(response.data);
    }

    loadPacients();
  }, []);

  return (
    <Container>
      <PacientContainer>
        <PacientList
          data={pacients}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <Pacient>
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
    </Container>
  );
};

export default Pacients;

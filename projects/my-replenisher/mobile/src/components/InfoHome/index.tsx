import React from "react";

import {
  Container,
  Texts,
  Text,
  Title,
  Main,
  Button,
  ButtonText,
} from "./styles";

import Illustration from "../../assets/illustration.svg";
import { RFValue } from "react-native-responsive-fontsize";

interface InfoHomeProps {
  hour: string;
}

const InfoHome: React.FC<InfoHomeProps> = ({ hour }) => {
  return (
    <Container>
      <Main>
        <Texts>
          <Title>Sua lista de alimentos foi atualizada às:</Title>
          <Text>{hour}</Text>
        </Texts>
        <Button>
          <ButtonText>Saiba Mais</ButtonText>
        </Button>
      </Main>
      <Illustration width={"50%"}/>
    </Container>
  );
};

export default InfoHome;
import React from "react";

import { Container, Texts, Text, Title, Main } from "./styles";

import Illustration from "../../assets/illustration.svg";
import { RFValue } from "react-native-responsive-fontsize";

import { Feather } from "@expo/vector-icons"
import { THEME } from "../../theme";

const InfoProfile: React.FC = () => {
  return (
    <Container>
      <Main>
        <Texts>
          <Title>Tem alguma dúvida?</Title>
          <Text>confira tudo sobre nossa aplicação</Text>
        </Texts>
      </Main>
      <Illustration
        height={RFValue(80)}
        style={{ position: "absolute", right: 20, bottom: 19 }}
      />
      <Feather name="chevron-right" color={THEME.COLORS.BLACK} size={RFValue(24)} />
    </Container>
  );
};

export default InfoProfile;

import React from "react";

import { Button, Container, Hour, Name, Texts, Profile } from "./styles";

import { Feather } from "@expo/vector-icons";
import { THEME } from "../../theme";
import hourText from "../../utils/hour-text";

interface HeaderProps {
  name: string;
  profile: boolean;
  open: () => void;
}

const Header: React.FC<HeaderProps> = ({ name, open, profile }) => {
  const hour = new Date().getHours();
  var hourTextValue = hourText(hour);

  return (
    <Container>
      {profile ? (
        <Profile>Meu Perfil</Profile>
      ) : (
        <Texts>
          <Hour>{hourTextValue}</Hour>
          <Name>{name}</Name>
        </Texts>
      )}
      <Button onPress={open}>
        <Feather name="bell" color={THEME.COLORS.BLACK_SECONDARY} size={32} />
      </Button>
    </Container>
  );
};

export default Header;

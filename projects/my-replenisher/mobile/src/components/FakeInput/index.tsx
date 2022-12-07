import React from "react";
import { TextInputProps } from "react-native";

import { Container, TextInput, Icon, Content, Name } from "./styles";
import { THEME } from "../../theme";

interface FakeInputProps extends TextInputProps {
  name: string;
  icon: string;
  value: string;
}

const FakeInput: React.FC<FakeInputProps> = ({ name, icon, value }) => {
  return (
    <Content>
      <Name>{name}</Name>
      <Container>
        <Icon name={icon} size={20} color={THEME.COLORS.GREEN} />

        <TextInput>{value}</TextInput>
      </Container>
    </Content>
  );
};

export default FakeInput;

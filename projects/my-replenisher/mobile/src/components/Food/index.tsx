import React from "react";
import { THEME } from "../../theme";

import { Container, Header, Title, Button, ButtonText, Name } from "./styles";

interface FoodProps {
  type: "up" | "down";
  value: string;
  name: string;
}

const Food: React.FC<FoodProps> = ({ type, value, name }) => {
  return (
    <Container
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      colors={[
        THEME.COLORS.GREEN_GRADIENT_PRIMARY,
        THEME.COLORS.GREEN_GRADIENT_SECONDARY,
      ]}
    >
      <Header>
        <Title>{value}</Title>
        <Button type={type}>
          <ButtonText>{type === "up" ? "ok" : "em falta"}</ButtonText>
        </Button>
      </Header>
      <Name>{name}</Name>
    </Container>
  );
};

export default Food;

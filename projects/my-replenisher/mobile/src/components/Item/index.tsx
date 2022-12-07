import React from "react";

import {
  Container,
  Index,
  IndexContainer,
  IndexText,
  ItemText,
} from "./styles";

interface ItemProps {
  index: number;
  name: string;
}

const Item: React.FC<ItemProps> = ({ index, name }) => {
  return (
    <Container>
      <IndexContainer>
        <Index>
          <IndexText>{index < 9 ? `0${index}` : index}</IndexText>
        </Index>
        <ItemText>{name}</ItemText>
      </IndexContainer>
    </Container>
  );
};

export default Item;

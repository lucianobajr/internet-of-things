import React from "react";

import {
  Container,
  Header,
  SubHeader,
  Title,
  Main,
  Description,
  CountContainer,
  UsersContainer,
  Count,
  User,
  UserText,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { RFValue } from "react-native-responsive-fontsize";

interface ListProps {
  title: string;
  description: string;
  shared: boolean;
  count: number;
  users: string[];
  open: () => void;
}

const List: React.FC<ListProps> = ({
  title,
  description,
  shared,
  count,
  users,
  open,
}) => {
  return (
    <Container onPress={open}>
      <Header>
        <SubHeader>
          <Title>{title}</Title>

          {shared && (
            <Feather
              name="share-2"
              color={THEME.COLORS.GREEN}
              size={RFValue(24)}
            />
          )}
        </SubHeader>
        <Description>{description}</Description>
      </Header>
      <Main>
        <CountContainer>
          <Feather
            name="circle"
            color={THEME.COLORS.GREEN}
            size={RFValue(24)}
          />
          <Count>{count} itens</Count>
        </CountContainer>

        {shared && (
          <UsersContainer>
            {users.map((user) => (
              <User
                key={user}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                colors={[
                  THEME.COLORS.GREEN_GRADIENT_PRIMARY,
                  THEME.COLORS.GREEN_GRADIENT_SECONDARY,
                ]}
              >
                <UserText>{user.substring(0, 1)}</UserText>
              </User>
            ))}
          </UsersContainer>
        )}
      </Main>
    </Container>
  );
};

export default List;

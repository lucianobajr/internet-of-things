import React from "react";

import {
  Container,
  Content,
  Text,
  SubText,
  Button,
  TextButton,
} from "./styles";

import Illustration from "../../assets/Illustartion-getting-start.svg";
import { RFPercentage } from "react-native-responsive-fontsize";

import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList } from "../../routes/auth.routes";
import { useNavigation } from "@react-navigation/native";

import { Feather } from "@expo/vector-icons"

type authRoutesProps = StackNavigationProp<AuthStackParamList, "GettingStart">;

const GettingStart: React.FC = () => {

  const navigation = useNavigation<authRoutesProps>();

  return (
    <Container>
      <Illustration height={RFPercentage(53)} />
      <Content>
        <Text>Não deixe os alimentos essenciais em falta</Text>
        <SubText>vamos sempre te informar o que precisa comprar!</SubText>
        <Button onPress={()=>navigation.navigate("SignIn")}>
          <TextButton><Feather name="arrow-right" color={"#FFF"} size={32} /></TextButton>
        </Button>
      </Content>
    </Container>
  );
};

export default GettingStart;

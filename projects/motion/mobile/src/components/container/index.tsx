import React from "react";
import { ContainerTypes } from "../../dtos/container-types.dto";

import {
  Content,
  Index,
  IndexContent,
  Infos,
  TextsContainer,
  FirstText,
  IDContent,
  SecondText,
  ThirdText,
  MoreButton,
} from "./styles";

interface ContainerProps {
  index: string;
  company: string;
  code: string;
  type: ContainerTypes;
  open: () => void;
}

import { Feather } from "@expo/vector-icons";
import { COLORS } from "../../theme/colors";
import { RFValue } from "react-native-responsive-fontsize";

const Container: React.FC<ContainerProps> = ({
  index,
  company,
  code,
  open,
  type,
}) => {
  return (
    <Content type={type}>
      <Infos>
        <IndexContent type={type}>
          <Index>{index}</Index>
        </IndexContent>
        <TextsContainer>
          <FirstText>{company}</FirstText>
          <IDContent>
            <SecondText>ID:</SecondText>
            <ThirdText>{code}</ThirdText>
          </IDContent>
        </TextsContainer>
      </Infos>
      <MoreButton onPress={open}>
        <Feather name="more-vertical" color={COLORS.WHITE} size={RFValue(32)} />
      </MoreButton>
    </Content>
  );
};

export default Container;

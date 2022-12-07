import styled, { css } from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";

import { LinearGradient } from "expo-linear-gradient";

interface ContainerProps {
  type: "up" | "down";
}

export const Container = styled(LinearGradient)`
  width: ${RFValue(260)}px;
  height: ${RFValue(148)}px;

  justify-content: space-between;

  border-radius: 15px;
  padding: 18px 27px;
  margin-right: 16px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text`
  font-family: ${THEME.FONTS.BOLD};
  font-size: ${RFValue(24)}px;
  color: ${THEME.COLORS.WHITE};
`;

const variations = {
  up: css`
    width: ${RFValue(53)}px;
    background-color: ${THEME.COLORS.YELLOW};
  `,
  down: css`
    width: ${RFValue(77)}px;
    background-color: ${THEME.COLORS.RED};
  `,
};

export const Button = styled.View<ContainerProps>`
  ${(props) => variations[props.type]}

  border-radius: 10px;

  height: ${RFValue(20)}px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  font-family: ${THEME.FONTS.BOLD};
  font-size: ${RFValue(14)}px;
  color: ${THEME.COLORS.WHITE};
`;

export const Name = styled.Text`
  font-family: ${THEME.FONTS.BOLD};
  font-size: ${RFValue(32)}px;
  color: ${THEME.COLORS.WHITE};
`;
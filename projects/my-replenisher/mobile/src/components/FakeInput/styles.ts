import styled, { css } from "styled-components/native";

import { Feather as FeatherIcon } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled.View`
  width: 100%;
  height: 60px;
  padding: 15px 16px;
  background: ${THEME.COLORS.WHITE};
  border-radius: 21px;
  border-width: 1px;
  border-color: ${THEME.COLORS.BLACK_SECONDARY};
  flex-direction: row;
  align-items: center;

  border-color: ${THEME.COLORS.BLACK_SECONDARY};
`;

export const Name = styled.Text`
  color: ${THEME.COLORS.GREEN};
  font-size: ${RFValue(12)}px;
  font-family: ${THEME.FONTS.BOLD};

  margin-bottom: 14px;
`;

export const TextInput = styled.Text`
  flex: 1;
  color: ${THEME.COLORS.GRAY_TERCIARY};
  font-size: 16px;
  font-family: ${THEME.FONTS.MEDIUM};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;

export const Content = styled.View`
  flex-direction: column;
`;

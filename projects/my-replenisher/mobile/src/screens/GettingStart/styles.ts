import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";

import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  flex: 1;

  padding-top: ${getStatusBarHeight() + 56}px;

  background: ${THEME.COLORS.WHITE};
`;

export const Content = styled.View`
  width: 100%;
  align-items: center;
`;

export const Text = styled.Text`
  width: ${RFValue(240)}px;
  color: ${THEME.COLORS.BLACK_SECONDARY};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(22)}px;
  text-align: center;
`;

export const SubText = styled.Text`
  width: ${RFValue(290)}px;
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(12)}px;
  text-align: center;

  margin-top: 30px;
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(157)}px;
  height: ${RFValue(57)}px;

  background-color: ${THEME.COLORS.GREEN_GRADIENT_PRIMARY};
  align-items: center;
  justify-content: center;

  border-radius: 15px;

  margin-top: 68px;
`;

export const TextButton = styled.Text`
  color: ${THEME.COLORS.WHITE};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(14)}px;
`;

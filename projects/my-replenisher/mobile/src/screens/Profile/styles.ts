import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;

  padding-left: ${RFValue(25)}px;
  padding-right: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + 33}px;

  background: ${THEME.COLORS.WHITE};
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  padding: 18px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  background: ${THEME.COLORS.GREEN};

  border-radius: 15px;
`;

export const ButtonText = styled.Text`
  color: ${THEME.COLORS.WHITE};

  font-family: ${THEME.FONTS.BLACK};
  font-size: ${RFValue(16)}px;

  margin-right: 10px;
`;

export const ModalizeContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 20px 24px;
`;

export const Main = styled.View`
  width: 100%;
  height: ${RFValue(269)}px;

  flex-direction: column;
  justify-content: space-between;

  margin-top: ${RFValue(80)}px;
`;

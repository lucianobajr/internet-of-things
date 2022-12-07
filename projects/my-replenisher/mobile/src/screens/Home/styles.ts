import styled from "styled-components/native";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";
import { getStatusBarHeight } from "react-native-iphone-x-helper";

export const Container = styled.View`
  flex: 1;

  padding-left: ${RFValue(25)}px;
  padding-right: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + 33}px;

  background: ${THEME.COLORS.WHITE};
`;

export const Text = styled.Text`
  color: ${THEME.COLORS.GREEN};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(32)}px;
`;


export const EssentialFoodsContainer = styled.View`
  flex-direction: column;
`;

export const EssentialFoodsTexts = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(20)}px;

  flex-wrap: wrap;
`;


export const EssentialFoods = styled.ScrollView.attrs({
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: {},
})`
  width: 100%;

  margin-top: 24px;
`;
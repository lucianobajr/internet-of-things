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

export const ListsContainer = styled.View`
  margin-top: 42px;
`;

export const Text = styled.Text`
  color: ${THEME.COLORS.GREEN};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(32)}px;
`;

export const ListsContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 120,
  },
})`
  width: 100%;

  margin-top: 24px;
`;

export const ModalizeContainer = styled.View`
  flex: 1;
  width: 100%;
  height: 100%;
  padding: 40px 24px;
`;

export const ModalizeHeader = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;
`;

export const ModalizeButtonClose = styled.TouchableOpacity`
  width: ${RFValue(38)}px;
  height: ${RFValue(38)}px;

  background: ${THEME.COLORS.GRAY_SECONDARY};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

export const ModalizeHeaderTitle = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: "tail",
})`
  max-width: 80%;
  color: ${THEME.COLORS.GREEN};

  font-family: ${THEME.FONTS.BLACK};
  font-size: ${RFValue(24)}px;

  flex-wrap: wrap;
  word-wrap: break-word;
  white-space: wrap;
`;

export const ItensContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 15,
  },
})`
  width: 100%;

  margin-top: 24px;
`;
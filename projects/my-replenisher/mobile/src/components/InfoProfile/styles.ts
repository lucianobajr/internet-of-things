import styled from "styled-components/native";

import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(81)}px;

  background: ${THEME.COLORS.GRAY};
  border-radius: 18px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  padding: 0px 4px 4px 16px;

  margin-top: 90px;
`;

export const Main = styled.View`
  max-width: ${RFValue(168)}px;
  height: 100%;

  flex-direction: column;
  justify-content: space-between;
  margin-top: ${RFValue(25)}px;
`;

export const Texts = styled.View`
  width: 100%;
  flex-direction: column;
`;

export const Title = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(12)}px;
`;

export const Text = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(12)}px;
`;

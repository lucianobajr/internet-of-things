import styled from "styled-components/native";

import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(200)}px;

  margin-top: 42px;
  margin-bottom: 48px;

  background: ${THEME.COLORS.GRAY};
  border: 1px solid ${THEME.COLORS.BLACK_SECONDARY};
  border-radius: 15px;

  padding-top: ${RFValue(22)}px;
  padding-bottom: ${RFValue(14)}px;
  padding-left: ${RFValue(17)}px;

  flex-direction: row;
  align-items: flex-end;
`;

export const Main = styled.View`
  width: 50%;
  height: 100%;

  flex-direction: column;
  justify-content: space-between;
`;

export const Texts = styled.View`
  width: 100%;
  flex-direction: column;
`;

export const Title = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(14)}px;
`;

export const Text = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(14)}px;

  margin-top: 20px;
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(144)}px;
  height: ${RFValue(40)}px;

  background-color: ${THEME.COLORS.BLACK_SECONDARY};
  border-radius: 12px;

  align-items: center;
  justify-content: center;
`;

export const ButtonText = styled.Text`
  color: ${THEME.COLORS.WHITE};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(14)}px;
`;

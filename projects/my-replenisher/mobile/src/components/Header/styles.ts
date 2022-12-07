import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";

import { THEME } from "../../theme";

import { RectButton } from "react-native-gesture-handler";

export const Container = styled.View`
  width: 100%;
  height: ${RFValue(55)}px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const Texts = styled.View`
  height: 100%;

  flex-direction: column;
  justify-content: space-between;
`;

export const Hour = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.BOLD};
  font-size: ${RFValue(22)}px;

  flex-wrap: wrap;
`;

export const Name = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(20)}px;
`;

export const Profile = styled.Text`
  color: ${THEME.COLORS.GREEN};

  font-family: ${THEME.FONTS.BLACK};
  font-size: ${RFValue(24)}px;
`;

export const Button = styled.TouchableOpacity`
  width: ${RFValue(55)}px;
  height: ${RFValue(55)}px;

  background-color: ${THEME.COLORS.GRAY};
  align-items: center;
  justify-content: center;

  border-radius: ${RFValue(27.5)}px;

  border-color: ${THEME.COLORS.BLACK_SECONDARY};
  border-width: 2px;
`;

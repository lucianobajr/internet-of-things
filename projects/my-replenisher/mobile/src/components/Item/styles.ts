import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { THEME } from "../../theme";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(50)}px;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  background-color: ${THEME.COLORS.BROWN};

  border-radius: 15px;

  padding-left: 16px;
  margin-bottom: 9px;
`;

export const ItemText = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(16)}px;

  flex-wrap: wrap;
`;

export const IndexContainer = styled.View`
  flex-direction: row;
`;

export const Index = styled.View`
  width: ${RFValue(27)}px;
  height: ${RFValue(27)}px;

  align-items: center;
  justify-content: center;

  background-color: ${THEME.COLORS.BROWN_SECONDARY};
  border-radius: 5px;

  margin-right: 16px;
`;

export const IndexText = styled.Text`
  color: ${THEME.COLORS.WHITE};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(16)}px;

  flex-wrap: wrap;
`;

import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { THEME } from "../../theme";

import { LinearGradient } from "expo-linear-gradient";

export const Container = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(172)}px;

  flex-direction: column;
  justify-content: space-between;

  background: ${THEME.COLORS.GRAY};
  border: 1px solid ${THEME.COLORS.BLACK_SECONDARY};
  border-radius: 15px;

  padding: 19px 22px 17px 27px;

  margin-bottom: 10px;
`;

export const Header = styled.View`
  width: 100%;
  flex-direction: column;

  margin-bottom: 10px;
`;

export const SubHeader = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-bottom: 12px;
`;

export const Title = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: "tail",
})`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(16)}px;

  flex-wrap: wrap;
  word-wrap: break-word;
  white-space: wrap;

  max-width: ${RFValue(197)}px;
`;

export const Description = styled.Text.attrs({
  numberOfLines: 2,
  ellipsizeMode: "tail",
})`
  max-width: 100%;

  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(12)}px;

  flex-wrap: wrap;
  word-wrap: break-word;
  white-space: wrap;
`;

export const Main = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const CountContainer = styled.View`
  flex-direction: row;
`;

export const Count = styled.Text`
  color: ${THEME.COLORS.BLACK};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(16)}px;

  flex-wrap: wrap;

  margin-left: 11px;
`;

export const UsersContainer = styled.View`
  flex-direction: row;
`;

export const User = styled(LinearGradient)`
  width: ${RFValue(42)}px;
  height: ${RFValue(42)}px;

  border-radius: ${RFValue(21)}px;

  align-items: center;
  justify-content: center;

  position: relative;
  z-index: 1;

  margin-left: -8px;
`;

export const UserText = styled.Text`
  color: ${THEME.COLORS.WHITE};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(20)}px;
`;

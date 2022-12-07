import { RFValue } from "react-native-responsive-fontsize";
import styled from "styled-components/native";
import { THEME } from "../../theme";

export const ModalizeContainer = styled.View`
  width: 100%;
  height: 100%;
  padding: 24px 30px;

`;

export const Header = styled.View`
  width: 100%;
`;

export const Button = styled.TouchableOpacity`
  align-self: flex-end;

  width: ${RFValue(38)}px;
  height: ${RFValue(38)}px;

  background: ${THEME.COLORS.GRAY_SECONDARY};
  border-radius: 10px;

  align-items: center;
  justify-content: center;
`;

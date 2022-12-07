import styled from "styled-components/native";
import { Form } from "@unform/mobile";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";

import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { darken } from "polished";

export const Container = styled.View`
  flex: 1;

  background: ${THEME.COLORS.WHITE};
`;

export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
`;

export const LogoContent = styled.ImageBackground`
  width: 100%;

  flex-direction: column;
  align-items: center;

  padding-top: ${getStatusBarHeight() + 27}px;
`;

export const Title = styled.Text`
  color: ${THEME.COLORS.GREEN_GRADIENT_SECONDARY};

  font-family: ${THEME.FONTS.BOLD};
  font-size: ${RFValue(40)}px;
`;

export const SubTitle = styled.Text`
  color: ${THEME.COLORS.BLACK_SECONDARY};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(16)}px;
`;

export const SignUpText = styled.Text`
  color: ${THEME.COLORS.BLACK_SECONDARY};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(20)}px;

  margin-top: 60px;
`;

export const FormContainer = styled.View``;

export const FormSignUp = styled(Form)`
  width: 100%;
  align-items: center;
  justify-content: center;
  padding-left: 36px;
  padding-right: 36px;

  margin-top: 50px;
`;

export const Button = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background: ${THEME.COLORS.GREEN};
  border-radius: 15px;
  justify-content: center;
  align-items: center;

  &:disabled {
    background: ${darken(0.1, THEME.COLORS.GREEN)};
  }
`;

export const ButtonText = styled.Text`
  font-family: ${THEME.FONTS.MEDIUM};
  color: ${THEME.COLORS.WHITE};
  font-size: ${RFValue(17)}px;
`;

export const SignUpButton = styled.TouchableOpacity`
  background-color: transparent;

  align-self: flex-end;

  margin-right: 36px;
  margin-top: 57px;
`;

export const SignUpButtonText = styled.Text`
  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(16)}px;

  text-decoration-line: underline;

  color: ${THEME.COLORS.BLACK};
`;

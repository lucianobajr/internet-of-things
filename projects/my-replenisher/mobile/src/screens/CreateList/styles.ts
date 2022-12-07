import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";

import { THEME } from "../../theme";
import {
  getBottomSpace,
  getStatusBarHeight,
} from "react-native-iphone-x-helper";
import { Form } from "@unform/mobile";

export const Container = styled.View`
  flex: 1;

  padding-left: ${RFValue(25)}px;
  padding-right: ${RFValue(25)}px;
  padding-top: ${getStatusBarHeight() + 33}px;

  background: ${THEME.COLORS.WHITE};
`;

export const CreateListContainer = styled.View`
  width: 100%;
  margin-top: 15px;
`;

export const Text = styled.Text`
  color: ${THEME.COLORS.GREEN};

  font-family: ${THEME.FONTS.MEDIUM};
  font-size: ${RFValue(32)}px;
`;
export const ModalizeContainer = styled.View`
  height: ${RFValue(300)}px;
  padding: 20px;

  border-radius: 15px;

  background-color: ${THEME.COLORS.WHITE};
`;

export const FormList = styled(Form)`
  width: 100%;
  align-items: center;
  justify-content: center;

  margin-top: 20px;
`;

export const Buttons = styled.View`
  width: 100%;

  flex-direction: row;
  justify-content: space-between;

  margin-top: 22px;
`;

interface ButtonStatusProps {
  shared: boolean;
}

export const ButtonStatus = styled.TouchableOpacity<ButtonStatusProps>`
  width: ${RFValue(140)}px;
  height: ${RFValue(40)}px;

  border-radius: 10px;

  flex-direction: row;

  align-items: center;
  justify-content: center;

  background-color: ${(props) =>
    props.shared ? THEME.COLORS.GREEN : THEME.COLORS.GRAY};
`;

export const ButtonTextStatus = styled.Text<ButtonStatusProps>`
  color: ${(props) => (props.shared ? THEME.COLORS.WHITE : THEME.COLORS.BLACK)};

  font-family: ${THEME.FONTS.REGULAR};
  font-size: ${RFValue(12)}px;

  margin-left: 8px;
`;

export const ButtonNewItem = styled.TouchableOpacity`
  width: 100%;
  height: ${RFValue(57)}px;

  border-radius: 15px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  background-color: ${THEME.COLORS.GREEN};

  padding: 0px 12px 0px 21px;

  margin-top: 12px;
`;

export const TextButtonNewItem = styled.Text`
  color: ${THEME.COLORS.WHITE};

  font-family: ${THEME.FONTS.BOLD};
  font-size: ${RFValue(16)}px;

  flex-wrap: wrap;
`;

export const AddItemButton = styled.View`
  width: ${RFValue(39)}px;
  height: ${RFValue(39)}px;

  border-radius: 10px;

  align-items: center;
  justify-content: center;

  background-color: ${THEME.COLORS.GREEN_SECONDARY};
`;

export const ListsContent = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingTop: 10,
    paddingBottom: 15,
  },
})`
  width: 100%;

  margin-top: 24px;
`;

export const Item = styled.TouchableOpacity`
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



export const FormItem = styled(Form)`
  width: 100%;
  align-items: center;
  justify-content: center;

  margin-top: 60px;
`;

export const FormItemButton = styled.TouchableOpacity`
  width: 100%;
  height: 60px;
  background: ${THEME.COLORS.GREEN};
  border-radius: 15px;
  justify-content: center;
  align-items: center;
`;

export const FormItemButtonText = styled.Text`
  font-family: ${THEME.FONTS.MEDIUM};
  color: ${THEME.COLORS.WHITE};
  font-size: ${RFValue(17)}px;
`;

export const ModalHeaderTitle = styled.Text`
  color: ${THEME.COLORS.GREEN};

  font-family: ${THEME.FONTS.BLACK};
  font-size: ${RFValue(24)}px;

  flex-wrap: wrap;
  word-wrap: break-word;
  white-space: wrap;

  align-self: center;
`;


export const Content = styled.ScrollView.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + 48,
  },
})`
  width: 100%;
`;

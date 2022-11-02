import styled from "styled-components/native";
import { getStatusBarHeight } from "react-native-iphone-x-helper";
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";

import { COLORS } from "../../theme/colors";
import { FONTS } from "../../theme/fonts";
import LinearGradient from "react-native-linear-gradient";

export const Container = styled.View`
  flex: 1;
  background-color: #000;

  padding-top: ${getStatusBarHeight() + 9}px;
  padding-left: ${RFValue(25)}px;
  padding-right: ${RFValue(25)}px;
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;

  width: 100%;
  height: ${RFValue(56)}px;

  margin-bottom: 24px;
`;

export const HeaderTextContainer = styled.View`
  flex-direction: column;
  justify-content: space-between;
`;

export const Profile = styled.TouchableOpacity`
  width: ${RFValue(56)}px;
  height: ${RFValue(56)}px;

  border-radius: ${RFValue(28)}px;

  background-color: #eee;
`;

export const HeaderFirstText = styled.Text`
  color: ${COLORS.WHITE};

  font-family: ${FONTS.LIGHT};
  font-size: ${RFValue(16)}px;
`;

export const HeaderSecondText = styled.Text`
  color: ${COLORS.WHITE};

  font-family: ${FONTS.REGULAR};
  font-size: ${RFValue(19)}px;
`;

export const Search = styled(LinearGradient)`
  width: 100%;
  height: ${RFValue(217)}px;

  border-radius: 15px;

  flex-direction: column;
  justify-content: space-between;

  padding-top: 21px;
  padding-left: 5px;
`;

export const SearchMain = styled.View`
  flex-direction: column;
`;

export const SearchText = styled.Text`
  font-family: ${FONTS.BLACK};
  font-size: ${RFValue(20)}px;

  margin-left: 16px;

  color: #ffffff;
`;

export const SearchInputContainer = styled.View`
  width: 286px;
  height: ${RFValue(46)}px;

  margin-left: 16px;
  margin-top: 13px;

  background-color: ${COLORS.WHITE};

  border-radius: 21px;

  padding: 0 7px 0 14px;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SerchInput = styled.TextInput`
  width: 60%;
  background-color: transparent;

  &::placeholder {
    color: #000;

    font-size: ${RFValue(12)}px;
    font-family: ${FONTS.REGULAR};
  }
`;

export const SearchButton = styled.TouchableOpacity`
  width: ${RFValue(38)}px;
  height: ${RFValue(38)}px;

  border-radius: ${RFValue(19)}px;

  background-color: #271e49;

  align-items: center;
  justify-content: center;
`;

export const Containers = styled.View`
  flex-direction: column;

  margin-top: 25px;

  height: ${RFValue(365)}px;
`;

export const ContainersText = styled.Text`
  font-family: ${FONTS.BLACK};
  font-size: ${RFValue(24)}px;

  color: #ffffff;
`;

export const ContainerList = styled.View`
  flex-direction: column;
`;

export const Status = styled.View`
  width: 85%;
  height: ${RFValue(74)}px;

  background-color: #271e49;

  align-items: center;
  justify-content: center;

  border-radius: 15px;

  margin-top: 60px;
  margin-left: ${RFValue(25)}px;
  margin-right: ${RFValue(25)}px;
`;

export const StatusText = styled.Text`
  font-family: ${FONTS.MEDIUM};
  font-size: ${RFValue(24)}px;

  color: #ffffff;
`;

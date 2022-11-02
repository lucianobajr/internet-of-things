import { RFValue } from "react-native-responsive-fontsize";
import styled, { css } from "styled-components/native";
import { ContainerTypes } from "../../dtos/container-types.dto";

import { COLORS } from "../../theme/colors";
import { FONTS } from "../../theme/fonts";

const content = {
  0: css`
    background: ${COLORS.YELLOW};
  `,

  1: css`
    background: ${COLORS.ORANGE};
  `,

  2: css`
    background: ${COLORS.PINK};
  `,
  3: css`
    background: ${COLORS.BLUE};
  `,
};

const button = {
  0: css`
    background: ${COLORS.YELLOW_LIGHT};
  `,

  1: css`
    background: ${COLORS.ORANGE_LIGHT};
  `,

  2: css`
    background: ${COLORS.PINK_LIGHT};
  `,
  3: css`
    background: ${COLORS.BLUE_LIGHT};
  `,
};

interface ContainerProps {
  type: ContainerTypes;
}

export const Content = styled.View<ContainerProps>`
  width: 100%;
  height: ${RFValue(74)}px;

  ${(props) => content[props.type]}

  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-radius: 15px;
  margin-bottom: 16px;

  padding: 0 10px 0 19px;
`;

export const Infos = styled.View`
  flex-direction: row;
  height: 60%;
`;

export const IndexContent = styled.View<ContainerProps>`
  width: ${RFValue(44.4)}px;
  height: ${RFValue(44.4)}px;

  border-radius: ${RFValue(22.2)}px;

  justify-content: center;
  align-items: center;

  ${(props) => button[props.type]}

  margin-right: 12px;
`;

export const Index = styled.Text`
  font-family: ${FONTS.BLACK};
  font-size: ${RFValue(24)}px;

  color: #ffffff;
`;

export const TextsContainer = styled.View`
  height: 100%;
  flex-direction: column;

  justify-content: space-between;
`;

export const FirstText = styled.Text`
  font-family: ${FONTS.BLACK};
  font-size: ${RFValue(16)}px;

  color: #ffffff;
`;

export const IDContent = styled.View`
  flex-direction: row;
`;

export const SecondText = styled.Text`
  font-family: ${FONTS.BLACK};
  font-size: ${RFValue(14)}px;

  color: #ffffff;
`;

export const ThirdText = styled.Text`
  font-family: ${FONTS.LIGHT};
  font-size: ${RFValue(14)}px;

  margin-left: 5px;

  color: #ffffff;
`;

export const MoreButton = styled.TouchableOpacity`
  width: ${RFValue(36)}px;
  height: ${RFValue(36)}px;

  border-radius: ${RFValue(18)}px;

  background-color: transparent;
`;

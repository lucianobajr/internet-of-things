import styled, { css } from "styled-components/native";

import { Feather as FeatherIcon } from "@expo/vector-icons";
import { THEME } from "../../theme";

interface ContainerProps {
  isFocus: boolean;
  isErrored: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  height: 60px;
  padding: 15px 16px;
  background: ${THEME.COLORS.WHITE};
  border-radius: 21px;
  margin-bottom: 13px;
  border-width: 1px;
  border-color: ${THEME.COLORS.BLACK_SECONDARY};
  flex-direction: row;
  align-items: center;
  ${(props) =>
    props.isErrored &&
    css`
      border-color: ${THEME.COLORS.GREEN};
    `}
  ${(props) =>
    props.isFocus &&
    css`
      border-color: ${THEME.COLORS.BLACK_SECONDARY};
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  color: ${THEME.COLORS.BLACK_SECONDARY};
  font-size: 16px;
  font-family: ${THEME.FONTS.MEDIUM};
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
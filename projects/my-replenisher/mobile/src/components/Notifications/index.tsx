import React from "react";

import { Feather } from "@expo/vector-icons";

import { ModalizeContainer, Header, Button } from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { THEME } from "../../theme";

interface NotificationsProps {
  close: () => void;
}

const Notifications: React.FC<NotificationsProps> = ({ close }) => {
  return (
    <ModalizeContainer>
      <Header>
        <Button onPress={close}>
          <Feather name="x" size={RFValue(24)} color={THEME.COLORS.BLACK_SECONDARY} />
        </Button>
      </Header>
    </ModalizeContainer>
  );
};

export default Notifications;

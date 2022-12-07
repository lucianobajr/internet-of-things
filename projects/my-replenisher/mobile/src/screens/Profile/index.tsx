import React, { useCallback, useRef } from "react";
import { Modalize, useModalize } from "react-native-modalize";

import { FakeInput, Header, InfoProfile, Notifications } from "../../components";

import {
  Container,
  ModalizeContainer,
  Button,
  ButtonText,
  Main,
} from "./styles";

import { Feather } from "@expo/vector-icons";
import { useAuth } from "../../contexts/AuthContext";
import { useFocusEffect } from "@react-navigation/native";
import { Portal } from "react-native-portalize";

const Profile: React.FC = () => {
  const { ref, open, close } = useModalize();
  const modalizeRef = useRef<Modalize>(null);
  const { signOut, user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      modalizeRef.current?.close();
    }, [])
  );

  function handleOpenModal() {
    modalizeRef.current?.open();
  }

  return (
    <Container>
      <Header profile name="Luciano" open={open} />

      <Main>
        <FakeInput name="Nome" icon="user" value={user.name} />
        <FakeInput name="Email" icon="mail" value={user.email} />

        <Button onPress={() => signOut()}>
          <ButtonText>Sair</ButtonText>
          <Feather name="log-out" size={24} color="#fff" />
        </Button>
      </Main>

      <InfoProfile />

      <Portal>
        <Modalize ref={ref} snapPoint={600} modalHeight={800}>
          <Notifications close={close} />
        </Modalize>
      </Portal>
    </Container>
  );
};

export default Profile;

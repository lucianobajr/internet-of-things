import React, { useCallback, useEffect, useRef, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { Modalize, useModalize } from "react-native-modalize";

import { Header, Item, List, Notifications } from "../../components";
import { database } from "../../services/firebase";

import fake from "./fake.json";

import { Feather } from "@expo/vector-icons";

import {
  Container,
  ListsContainer,
  ListsContent,
  Text,
  ModalizeContainer,
  ModalizeButtonClose,
  ModalizeHeader,
  ModalizeHeaderTitle,
  ItensContent,
} from "./styles";
import { RFValue } from "react-native-responsive-fontsize";
import { THEME } from "../../theme";
import { Portal } from "react-native-portalize";
import { useLists } from "../../hooks/useLists";

interface Item {
  mandatory: boolean;
  name: string;
  status: boolean;
}

interface ListProps {
  id: string;
  description: string;
  itens: Item[];
  owner: string;
  shared: boolean;
  title: string;
}

const Lists: React.FC = () => {
  const [list, setList] = useState<ListProps>({} as ListProps);
  const { ref, open, close } = useModalize();
  const modalizeRef = useRef<Modalize>(null);

  useFocusEffect(
    useCallback(() => {
      close();
      modalizeRef.current?.close();
    }, [])
  );

  function handleOpenModal(list: ListProps) {
    modalizeRef.current?.open();
    setList(list);
  }

  function handleCloseModal() {
    modalizeRef.current?.close();
    setList({} as ListProps);
  }

  useEffect(() => {
    const roomRef = database.ref(`value`);

    roomRef.on("value", (room) => {
      //const value = room.val();
    });

    return () => {
      roomRef.off("value");
    };
  }, []);

  const { lists } = useLists();

  return (
    <Container>
      <Header profile={false} name="Luciano" open={open} />

      <ListsContainer>
        <Text>Minhas Listas</Text>
        <ListsContent>
          {lists.map((item) => (
            <List
              key={item.id}
              title={item.title}
              description={item.description}
              shared={item.shared}
              count={item.itens.length}
              open={() => handleOpenModal(item)}
              users={item.users ?? []}
            />
          ))}
        </ListsContent>
      </ListsContainer>

      <Portal>
        <Modalize ref={ref} snapPoint={600} modalHeight={800}>
          <Notifications close={close} />
        </Modalize>
      </Portal>

      <Portal>
        <Modalize ref={modalizeRef} snapPoint={700} modalHeight={1000}>
          <ModalizeContainer>
            <ModalizeHeader>
              <ModalizeHeaderTitle>{list.title}</ModalizeHeaderTitle>
              <ModalizeButtonClose onPress={handleCloseModal}>
                <Feather
                  name="x"
                  size={RFValue(24)}
                  color={THEME.COLORS.BLACK_SECONDARY}
                />
              </ModalizeButtonClose>
            </ModalizeHeader>
            <ItensContent>
              {Object.keys(lists).length !== 0 &&
                list.itens &&
                list.itens.map((item) => (
                  <Item
                    key={list.itens.indexOf(item)}
                    name={item.name}
                    index={list.itens.indexOf(item) + 1}
                  />
                ))}
            </ItensContent>
          </ModalizeContainer>
        </Modalize>
      </Portal>
    </Container>
  );
};

export default Lists;

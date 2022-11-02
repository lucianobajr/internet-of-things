import React, { useState, useEffect, useRef } from "react";
import { firebase } from "@react-native-firebase/database";

import {
  Container,
  Header,
  HeaderTextContainer,
  Profile,
  HeaderFirstText,
  HeaderSecondText,
  Search,
  SearchMain,
  SearchText,
  SearchInputContainer,
  SerchInput,
  SearchButton,
  Containers,
  ContainersText,
  ContainerList,
  Status,
  StatusText,
} from "./styles";

const reference = firebase.app().database().ref("/motion");

import ContainerImg from "../../assets/container.svg";
import { Feather } from "@expo/vector-icons";

import { RFValue } from "react-native-responsive-fontsize";
import { COLORS } from "../../theme/colors";

import { containers } from "../../fakes/data.json";

import { Container as ContainerComponent } from "../../components";
import { ActivityIndicator, FlatList } from "react-native";

import { Modalize } from "react-native-modalize";

export default function App() {
  const [motion, setMotion] = useState("");

  useEffect(() => {
    reference.on("value", (room) => {
      const data = room.val();
      setMotion(data);
    });

    return () => {
      reference.off("value");
    };
  }, []);

  const modalizeRef = useRef<Modalize>(null);

  function handleOpenModal() {
    modalizeRef.current?.open();
  }

  return (
    <Container>
      <Header>
        <HeaderTextContainer>
          <HeaderFirstText>Galpão:</HeaderFirstText>
          <HeaderSecondText>Porto de Santos</HeaderSecondText>
        </HeaderTextContainer>
        <Profile />
      </Header>
      <Search
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={["#F9D60C", "#FF3162"]}
      >
        <SearchMain>
          <SearchText>Rastreie seu container</SearchText>
          <SearchInputContainer>
            <SerchInput placeholder="Código do container: " />
            <SearchButton>
              <Feather name="search" color={COLORS.WHITE} size={RFValue(24)} />
            </SearchButton>
          </SearchInputContainer>
        </SearchMain>
        <ContainerImg width={RFValue(190)} height={RFValue(127)} />
      </Search>

      <Containers>
        <ContainersText>Containers</ContainersText>
        <FlatList
          data={containers}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingVertical: 20 }}
          renderItem={({ item, index }) => (
            <ContainerComponent
              key={item.id}
              code={item.code}
              company={item.company}
              index={item.id}
              type={index}
              open={() => handleOpenModal()}
            />
          )}
        />
      </Containers>
      <Modalize ref={modalizeRef} snapPoint={180} modalHeight={280}>
        <Status>
          {motion === "" ? (
            <ActivityIndicator color={COLORS.WHITE} size={25} />
          ) : (
            <StatusText>STATUS: {motion}</StatusText>
          )}
        </Status>
      </Modalize>
    </Container>
  );
}

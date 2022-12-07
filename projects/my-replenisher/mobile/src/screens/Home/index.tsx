import React, { useCallback, useEffect, useState } from "react";

// libraries
import { ActivityIndicator } from "react-native";
import { Portal } from "react-native-portalize";
import { Modalize, useModalize } from "react-native-modalize";
import { RFValue } from "react-native-responsive-fontsize";

// services
import { worker } from "../../services/worker";

//utils
import { THEME } from "../../theme";
import foodValue from "../../utils/food-value";
import formattedDate from "../../utils/formatted-date";

// compoenents
import { Header, Notifications, Food, InfoHome } from "../../components";

import {
  Container,
  EssentialFoods,
  EssentialFoodsContainer,
  EssentialFoodsTexts,
} from "./styles";
import { useFocusEffect } from "@react-navigation/native";

// types and interfaces
interface IRequest {
  my_replenisher: number;
}

interface Foods {
  rice: "up" | "down";
  bean: "up" | "down";
  sugar: "up" | "down";
  oil: "up" | "down";
}

const Home: React.FC = () => {
  const { ref, open, close } = useModalize();

  const [value, setValue] = useState(7);
  const [foods, setFoods] = useState({} as Foods);
  const [updateTime, setUpdateTime] = useState(new Date("11/29/2022"));

  useFocusEffect(
    useCallback(() => {
      close();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchValue() {
        const { data } = await worker.get<IRequest>("/get");

        if (data.my_replenisher !== value) {
          setUpdateTime(new Date());
        }

        setValue(data.my_replenisher);
      }

      fetchValue();
    }, [])
  );

  useEffect(() => {
    setFoods(foodValue(value));
  }, [value]);

  return (
    <Container>
      <Header profile={false} name="Luciano" open={open} />

      <InfoHome hour={formattedDate(updateTime.toISOString())} />

      <EssentialFoodsContainer>
        <EssentialFoodsTexts>Alimentos Essenciais</EssentialFoodsTexts>

        {Object.keys(foods).length > 0 ? (
          <EssentialFoods>
            <Food type={foods.rice} value="01" name="Arroz" />
            <Food type={foods.bean} value="02" name="Feijão" />
            <Food type={foods.oil} value="03" name="Óleo" />
            <Food type={foods.sugar} value="04" name="Açucar" />
          </EssentialFoods>
        ) : (
          <ActivityIndicator color={THEME.COLORS.GREEN} size={RFValue(24)} />
        )}
      </EssentialFoodsContainer>

      <Portal>
        <Modalize ref={ref} snapPoint={600} modalHeight={800}>
          <Notifications close={close} />
        </Modalize>
      </Portal>
    </Container>
  );
};

export default Home;

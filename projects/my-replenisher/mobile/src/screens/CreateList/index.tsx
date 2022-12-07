import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { FormHandles } from "@unform/core";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Modalize, useModalize } from "react-native-modalize";

import { Header, Input, Notifications, Item } from "../../components";

import * as Yup from "yup";
import Modal from "react-native-modal";

import {
  Container,
  CreateListContainer,
  Text,
  FormList,
  Buttons,
  ButtonStatus,
  ButtonTextStatus,
  AddItemButton,
  ButtonNewItem,
  TextButtonNewItem,
  ListsContent,
  ModalizeContainer,
  FormItem,
  FormItemButton,
  FormItemButtonText,
  ModalHeaderTitle,
  Content,
} from "./styles";
import { Alert } from "react-native";
import { database } from "../../services/firebase";
import getValidationErrors from "../../utils/get-validation-errors";
import { useAuth } from "../../contexts/AuthContext";
import { TextInput } from "react-native-gesture-handler";
import { Portal } from "react-native-portalize";
import { AppStackParamList } from "../../routes/app.routes";
import { StackNavigationProp } from "@react-navigation/stack";

import { Feather } from "@expo/vector-icons";
import { THEME } from "../../theme";
import { RFValue } from "react-native-responsive-fontsize";

import { worker } from "../../services/worker";
import foodList from "../../utils/food-list";

interface ListData {
  title: string;
  description: string;
}

interface Item {
  name: string;
  status: boolean;
  mandatory: boolean;
}

interface ItemData {
  name: string;
}

// types and interfaces
interface IRequest {
  my_replenisher: number;
}

type appRoutesProps = StackNavigationProp<AppStackParamList, "CreateList">;

const CreateList: React.FC = () => {
  const [shared, setShared] = useState(true);
  const [itens, setItens] = useState<Item[]>([]);
  const [value, setValue] = useState(7);
  const [visible, setVisible] = useState(false);

  const { user } = useAuth();

  const { ref, open, close } = useModalize();
  const modalizeRef = useRef<Modalize>(null);

  const formRef = useRef<FormHandles>(null);
  const titleInputRef = useRef<TextInput>(null);
  const descriptionInputRef = useRef<TextInput>(null);

  const formItemRef = useRef<FormHandles>(null);
  const nameInputRef = useRef<TextInput>(null);

  const navigation = useNavigation<appRoutesProps>();

  useFocusEffect(
    useCallback(() => {
      modalizeRef.current?.close();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      async function fetchValue() {
        const { data } = await worker.get<IRequest>("/get");

        setValue(data.my_replenisher);
      }

      fetchValue();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      const newItens = foodList(value).filter((item) => item.status === false);
      setItens(newItens);
    }, [value])
  );

  function handleCloseModal() {
    modalizeRef.current?.close();
  }

  function handleOpenModal() {
    modalizeRef.current?.open();
  }

  async function handleSubmit(data: ListData) {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        title: Yup.string().required("Título obrigatório"),
        description: Yup.string().required("Descrição obrigatório"),
      });

      await schema.validate(data, { abortEarly: false });

      Alert.alert("Sucesso!", "Sua Lista foi cadastrada!");

      var finalData = {
        owner: user.id,
        title: data.title,
        description: data.description,
        shared,
        itens,
        users: [],
      };

      const listsRef = database.ref("lists");

      await listsRef.push(finalData);

      formRef.current?.reset();

      navigation.navigate("Lists");
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formRef.current?.setErrors(erros);

        return;
      } else {
        Alert.alert(
          "Erro no Cadastro",
          "Ocorreu um erro ao fazer cadastro,tente novamente"
        );
      }
    }
  }

  async function handleAddItem(data: ItemData) {
    try {
      formItemRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
      });

      await schema.validate(data, { abortEarly: false });

      const newItem = { name: data.name, status: false, mandatory: false };

      setItens([...itens, newItem]);
      setVisible(false);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const erros = getValidationErrors(error);

        formItemRef.current?.setErrors(erros);

        return;
      } else {
        Alert.alert(
          "Erro no Cadastro",
          "Ocorreu um erro ao fazer cadastro,tente novamente"
        );
      }
    }
  }

  return (
    <Container>
      <Header profile={false} name="Luciano" open={open} />

      <Content>
        <CreateListContainer>
          <Text>Criar Lista</Text>
          <FormList ref={formRef} onSubmit={handleSubmit}>
            <Input
              ref={titleInputRef}
              autoCorrect={false}
              autoCapitalize="true"
              name="title"
              icon="book"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                descriptionInputRef.current?.focus();
              }}
            />
            <Input
              ref={descriptionInputRef}
              name="description"
              icon="edit-2"
              placeholder="Descrição"
              returnKeyType="send"
              onSubmitEditing={() => {}}
            />

            <Buttons>
              <ButtonStatus shared={!!shared} onPress={() => setShared(true)}>
                <Feather
                  name="share-2"
                  size={RFValue(14)}
                  color={!!shared ? THEME.COLORS.WHITE : THEME.COLORS.BLACK}
                />
                <ButtonTextStatus shared={!!shared}>
                  compartilhado
                </ButtonTextStatus>
              </ButtonStatus>
              <ButtonStatus shared={!shared} onPress={() => setShared(false)}>
                <Feather
                  name="lock"
                  size={RFValue(14)}
                  color={!shared ? THEME.COLORS.WHITE : THEME.COLORS.BLACK}
                />
                <ButtonTextStatus shared={!shared}>privado</ButtonTextStatus>
              </ButtonStatus>
            </Buttons>

            <ButtonNewItem onPress={() => setVisible(true)}>
              <TextButtonNewItem>Adicionar novo item</TextButtonNewItem>
              <AddItemButton>
                <Feather
                  name="plus"
                  size={RFValue(24)}
                  color={THEME.COLORS.WHITE}
                />
              </AddItemButton>
            </ButtonNewItem>
            <ListsContent>
              {itens.map((item) => (
                <Item
                  key={itens.indexOf(item)}
                  name={item.name}
                  index={itens.indexOf(item) + 1}
                />
              ))}
            </ListsContent>

            <FormItemButton onPress={() => formRef.current?.submitForm()}>
              <FormItemButtonText>Cadastrar</FormItemButtonText>
            </FormItemButton>
          </FormList>
        </CreateListContainer>

        <Modal isVisible={visible}>
          <ModalizeContainer>
            <ModalHeaderTitle>Adicionar novo item</ModalHeaderTitle>
            <FormItem ref={formItemRef} onSubmit={handleAddItem}>
              <Input
                ref={nameInputRef}
                autoCorrect={false}
                autoCapitalize="true"
                name="name"
                icon="tag"
                placeholder="Nome"
                returnKeyType="send"
              />

              <FormItemButton onPress={() => formItemRef.current?.submitForm()}>
                <FormItemButtonText>Adicionar</FormItemButtonText>
              </FormItemButton>
            </FormItem>
          </ModalizeContainer>
        </Modal>

        <Portal>
          <Modalize ref={ref} snapPoint={600} modalHeight={800}>
            <Notifications close={close} />
          </Modalize>
        </Portal>
      </Content>
    </Container>
  );
};

export default CreateList;

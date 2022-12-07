import React, { useCallback, useRef, useState } from "react";
import {
  Container,
  Content,
  LogoContent,
  SubTitle,
  Title,
  SignUpText,
  FormSignUp,
  ButtonText,
  Button,
  SignUpButton,
  SignUpButtonText,
} from "./styles";

import Pattern from "../../assets/pattern-2.svg";
import Logo from "../../assets/logo.svg";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TextInput,
} from "react-native";
import getValidationErrors from "../../utils/get-validation-errors";

import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import { useAuth } from "../../contexts/AuthContext";
import { AuthStackParamList } from "../../routes/auth.routes";
import { AppStackParamList } from "../../routes/app.routes";
import { FormHandles } from "@unform/core";
import { Input } from "../../components";
import { THEME } from "../../theme";
import * as Yup from "yup";
import api from "../../services/api";

type authRoutesProps = StackNavigationProp<AuthStackParamList, "SignUp">;
type appRoutesProps = StackNavigationProp<AppStackParamList, "Home">;

interface SignUpFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);

  const nameInputRef = useRef<TextInput>(null);
  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const navigationAuth = useNavigation<authRoutesProps>();

  const handleSignUp = useCallback(async (data: SignUpFormData) => {
    setLoading(true);
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        name: Yup.string().required("Nome obrigatório"),
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "No mínimo 6 dígitos"),
      });

      await schema.validate(data, { abortEarly: false });

      await api.post("/admins", data);

      navigationAuth.navigate("SignIn");
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
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <Content>
          <LogoContent
            source={{
              uri: "https://user-images.githubusercontent.com/45442173/205317579-60d9a569-11b5-40e1-be26-f4c630a262f1.png",
            }}
            resizeMode="cover"
          >
            <Logo />
            <Title>My Replenisher</Title>
            <SubTitle>seu app de compras inteligente</SubTitle>
            <SignUpText>Inscreva-se gratuitamente</SignUpText>
          </LogoContent>
          <FormSignUp ref={formRef} onSubmit={handleSignUp}>
            <Input
              ref={nameInputRef}
              keyboardType="ascii-capable"
              autoCorrect={false}
              autoCapitalize="none"
              name="name"
              icon="user"
              placeholder="Nome"
              returnKeyType="next"
              onSubmitEditing={() => {
                emailInputRef.current?.focus();
              }}
            />
            <Input
              ref={emailInputRef}
              keyboardType="email-address"
              autoCorrect={false}
              autoCapitalize="none"
              name="email"
              icon="mail"
              placeholder="E-mail"
              returnKeyType="next"
              onSubmitEditing={() => {
                passwordInputRef.current?.focus();
              }}
            />
            <Input
              ref={passwordInputRef}
              secureTextEntry
              name="password"
              icon="lock"
              placeholder="Senha"
              returnKeyType="send"
              onSubmitEditing={() => {
                formRef.current?.submitForm();
              }}
            />
            <Button
              disabled={!!loading ? true : false}
              onPress={() => formRef.current?.submitForm()}
            >
              {!!loading ? (
                <ActivityIndicator color={THEME.COLORS.WHITE} />
              ) : (
                <ButtonText>Entrar</ButtonText>
              )}
            </Button>
          </FormSignUp>

          <SignUpButton onPress={() => navigationAuth.navigate("SignIn")}>
            <SignUpButtonText>Já tenho uma conta!</SignUpButtonText>
          </SignUpButton>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignUp;
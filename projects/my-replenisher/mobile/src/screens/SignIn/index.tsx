import React, { useCallback, useRef, useState } from "react";
import {
  Container,
  Content,
  LogoContent,
  SubTitle,
  Title,
  SignInText,
  FormSignIn,
  ButtonText,
  Button,
  SignUpButton,
  SignInButtonText,
} from "./styles";

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

type authRoutesProps = StackNavigationProp<AuthStackParamList, "SignIn">;
type appRoutesProps = StackNavigationProp<AppStackParamList, "Home">;

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);

  const emailInputRef = useRef<TextInput>(null);
  const passwordInputRef = useRef<TextInput>(null);

  const { signIn: signInFunc, loading } = useAuth();

  const navigationAuth = useNavigation<authRoutesProps>();

  const handleSignIn = useCallback(async (data: SignInFormData) => {
    try {
      formRef.current?.setErrors({});

      const schema = Yup.object().shape({
        email: Yup.string()
          .required("E-mail obrigatório")
          .email("Digite um e-mail válido"),
        password: Yup.string().min(6, "No mínimo 6 dígitos"),
      });

      await schema.validate(data, { abortEarly: false });

      await signInFunc({ email: data.email, password: data.password });

      Alert.alert("Login Realizado!", "Seja Bem vindo(a) ao My Replenisher!");
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
            <SignInText>Faça login na sua conta</SignInText>
          </LogoContent>
          <FormSignIn ref={formRef} onSubmit={handleSignIn}>
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
          </FormSignIn>

          <SignUpButton onPress={() => navigationAuth.navigate("SignUp")}>
            <SignInButtonText>Não tenho uma conta!</SignInButtonText>
          </SignUpButton>
        </Content>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default SignIn;
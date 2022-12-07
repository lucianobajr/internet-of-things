import React from "react";

import { createStackNavigator } from "@react-navigation/stack";
import { SignIn, SignUp,GettingStart } from "../screens";

export type AuthStackParamList = {
  GettingStart: undefined;
  SignIn: undefined;
  SignUp: undefined;
};

const App = createStackNavigator<AuthStackParamList>();

const AuthRoutes: React.FC = () => {
  return (
    <App.Navigator screenOptions={{ headerShown: false }}>
      <App.Screen name="GettingStart" component={GettingStart} />
      <App.Screen name="SignIn" component={SignIn} />
      <App.Screen name="SignUp" component={SignUp} />
    </App.Navigator>
  );
};

export default AuthRoutes;

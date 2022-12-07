import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Home, Lists, CreateList, Profile } from "../screens";

import { Feather } from "@expo/vector-icons";
import { View } from "react-native";

export type AppStackParamList = {
  Home: undefined;
  Lists: undefined;
  CreateList: undefined;
  Profile: undefined;
};

const App = createBottomTabNavigator<AppStackParamList>();

const AppRoutes: React.FC = () => {
  return (
    <App.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          paddingBottom: 13,
          paddingTop: 13,
          height: 65,
          alignItems: "center",
          borderTopColor: "#eee",
          borderTopWidth: 1,
          elevation: 0,
        },
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
      }}
    >
      <App.Screen
        options={{
          tabBarIcon: ({ focused, color }) => {
            focused ? (color = "#14B661") : (color = "#09051C");
            return <Feather name="home" size={24} color={color} />;
          },
        }}
        name="Home"
        component={Home}
      />
      <App.Screen
        options={{
          tabBarIcon: ({ focused, color }) => {
            focused ? (color = "#14B661") : (color = "#09051C");
            return (
              <View style={{ alignItems: "center" }}>
                <Feather name="book" size={24} color={color} />
              </View>
            );
          },
        }}
        name="Lists"
        component={Lists}
      />
      <App.Screen
        options={{
          tabBarIcon: ({ focused, color }) => {
            focused ? (color = "#14B661") : (color = "#09051C");
            return <Feather name="plus-circle" size={24} color={color} />;
          },
        }}
        name="CreateList"
        component={CreateList}
      />

      <App.Screen
        options={{
          tabBarIcon: ({ focused, color }) => {
            focused ? (color = "#14B661") : (color = "#09051C");
            return <Feather name="user" size={24} color={color} />;
          },
        }}
        name="Profile"
        component={Profile}
      />
    </App.Navigator>
  );
};

export default AppRoutes;
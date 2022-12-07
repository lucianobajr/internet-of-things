import "react-native-gesture-handler";
import React, { useCallback } from "react";

import { useFonts } from "@expo-google-fonts/roboto-slab";

import {
  RobotoSlab_100Thin,
  RobotoSlab_200ExtraLight,
  RobotoSlab_300Light,
  RobotoSlab_500Medium,
  RobotoSlab_400Regular,
  RobotoSlab_600SemiBold,
  RobotoSlab_700Bold,
  RobotoSlab_800ExtraBold,
  RobotoSlab_900Black,
} from "@expo-google-fonts/roboto-slab";

import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";

import Routes from "./src/routes";
import AppProvider from "./src/contexts";
import { Host } from "react-native-portalize";
import { LogBox } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [fontsLoaded] = useFonts({
    RobotoSlab_100Thin,
    RobotoSlab_200ExtraLight,
    RobotoSlab_300Light,
    RobotoSlab_400Regular,
    RobotoSlab_500Medium,
    RobotoSlab_600SemiBold,
    RobotoSlab_700Bold,
    RobotoSlab_800ExtraBold,
    RobotoSlab_900Black,
  });

  if (!fontsLoaded) {
    SplashScreen.hideAsync();
  }

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  LogBox.ignoreLogs(["Warning: ..."]); // Ignore log notification by message
  LogBox.ignoreAllLogs(); //Ignore all log notifications

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      <StatusBar translucent backgroundColor="transparent" style="dark" />
      <AppProvider>
        <Host>
          <Routes />
        </Host>
      </AppProvider>
    </NavigationContainer>
  );
}

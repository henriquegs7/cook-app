import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SplashScreen from "expo-splash-screen";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function Layout() {
  const [fontsLoaded] = useFonts({ Poppins_400Regular, Poppins_500Medium, Poppins_700Bold });

  if (!fontsLoaded) {
    return;
  }

  SplashScreen.hideAsync();

  return (
    <>
      <StatusBar style="dark" />
      <Slot />
    </>
  );
}

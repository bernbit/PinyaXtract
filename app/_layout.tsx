import { Stack } from "expo-router";
import "../global.css";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthProvider } from "@/context/AuthContext";
import { GlobalProvider } from "@/context/GlobalContext";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    "CabinetGrotesk-Black": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Black.ttf"),
    "CabinetGrotesk-Bold": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Bold.ttf"),
    "CabinetGrotesk-Extrabold": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Extrabold.ttf"),
    "CabinetGrotesk-Extralight": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Extralight.ttf"),
    "CabinetGrotesk-Light": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Light.ttf"),
    "CabinetGrotesk-Medium": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Medium.ttf"),
    "CabinetGrotesk-Regular": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Regular.ttf"),
    "CabinetGrotesk-Thin": require("../assets/fonts/CabinetGrotesk/CabinetGrotesk-Thin.ttf"),

    "Satoshi-Black": require("../assets/fonts/Satoshi/Satoshi-Black.ttf"),
    "Satoshi-BlackItalic": require("../assets/fonts/Satoshi/Satoshi-BlackItalic.ttf"),
    "Satoshi-Bold": require("../assets/fonts/Satoshi/Satoshi-Bold.ttf"),
    "Satoshi-BoldItalic": require("../assets/fonts/Satoshi/Satoshi-BoldItalic.ttf"),
    "Satoshi-Italic": require("../assets/fonts/Satoshi/Satoshi-Italic.ttf"),
    "Satoshi-Light": require("../assets/fonts/Satoshi/Satoshi-Light.ttf"),
    "Satoshi-LightItalic": require("../assets/fonts/Satoshi/Satoshi-LightItalic.ttf"),
    "Satoshi-Medium": require("../assets/fonts/Satoshi/Satoshi-Medium.ttf"),
    "Satoshi-MediumItalic": require("../assets/fonts/Satoshi/Satoshi-MediumItalic.ttf"),
    "Satoshi-Regular": require("../assets/fonts/Satoshi/Satoshi-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <AuthProvider>
      <GlobalProvider>
        <SafeAreaProvider className="">
          <Stack>
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />

            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaProvider>
      </GlobalProvider>
    </AuthProvider>
  );
}

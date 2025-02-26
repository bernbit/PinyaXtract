import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors-Constants";
import { useColorScheme } from "nativewind";

const _layout = () => {
  const { colorScheme } = useColorScheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor:
            colorScheme === "dark" ? Colors["dark-main"] : Colors.main,
        },
        headerTitleStyle: {
          fontFamily: "CabinetGrotesk-Extrabold",
        },
        headerTintColor:
          colorScheme === "dark" ? Colors["light-text"] : Colors["dark-text"],
        // headerShadowVisible: false, // Ensures shadow is hidden
      }}
    >
      <Stack.Screen name="mainMenu" options={{ headerShown: false }} />
      <Stack.Screen name="editProfile" options={{ title: "Edit Profile" }} />
      <Stack.Screen
        name="deleteAcc"
        options={{ title: "Delete Account", headerShown: true }}
      />
      <Stack.Screen
        name="downloadReport"
        options={{ title: "Reports", headerShown: true }}
      />
      <Stack.Screen
        name="about"
        options={{ title: "About Pinyaxtract", headerShown: true }}
      />
    </Stack>
  );
};

export default _layout;

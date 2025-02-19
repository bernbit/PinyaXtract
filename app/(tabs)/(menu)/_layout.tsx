import React from "react";
import { Stack } from "expo-router";
import { Colors } from "@/constants/Colors-Constants";

const _layout = () => {
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerTitleAlign: "center",
        headerStyle: {
          backgroundColor: Colors.main,
        },
        headerTitleStyle: {
          fontFamily: "CabinetGrotesk-Extrabold",
        },
        headerTintColor: Colors["dark-text"],
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

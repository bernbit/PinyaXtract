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
      <Stack.Screen name="(adminMain)" options={{ headerShown: false }} />
      <Stack.Screen name="addUser" options={{ title: "Add User" }} />
      <Stack.Screen
        name="[uid]/deleteUser"
        options={{ title: "Delete User" }}
      />
      <Stack.Screen name="[uid]/editUser" options={{ title: "Edit User" }} />
    </Stack>
  );
};

export default _layout;

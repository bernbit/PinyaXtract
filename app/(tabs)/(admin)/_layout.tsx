import React from "react";
import { Stack } from "expo-router";

const _layout = () => {
  return (
    <Stack>
      <Stack.Screen name="(adminMain)" options={{ headerShown: false }} />

      <Stack.Screen name="addUser" options={{ headerShown: false }} />
      <Stack.Screen name="deleteUser" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

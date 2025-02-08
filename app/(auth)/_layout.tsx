import React from "react";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import useAuth from "@/context/AuthContext";

const _layout = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  useFocusEffect(() => {
    if (isAuthenticated) {
      router.replace("/control");
    }
  });

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="resetPassword" options={{ headerShown: false }} />
    </Stack>
  );
};

export default _layout;

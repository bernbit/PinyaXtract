import React, { useState, useEffect, useCallback } from "react";
import { Stack, useRouter, useFocusEffect } from "expo-router";
import { Colors } from "@/constants/Colors-Constants";
import useAuth from "@/context/AuthContext";
import { View } from "react-native";

import Loader from "@/components/Loader";

const _layout = () => {
  const router = useRouter();
  const { isAuthenticated } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated !== null) {
      setIsLoading(false);
    }
  }, [isAuthenticated]);

  useFocusEffect(
    useCallback(() => {
      if (isAuthenticated) {
        router.replace("/control");
      }
    }, [isAuthenticated]),
  );

  if (isLoading) {
    return <View className="bg-background"></View>;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="resetPassword"
        options={{
          title: "Back",
          headerShown: true,
          // headerTitleAlign: "center",
          headerStyle: {
            backgroundColor: Colors.background,
          },
          headerTitleStyle: {
            fontFamily: "CabinetGrotesk-Extrabold",
          },
          headerTintColor: Colors["light-text"],
          headerShadowVisible: false,
        }}
      />
    </Stack>
  );
};

export default _layout;

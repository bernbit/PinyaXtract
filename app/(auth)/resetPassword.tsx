import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import Input from "@/components/forms/Input";
import { Link, useRouter } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";

const resetPassword = () => {
  const [value, setValue] = useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  const router = useRouter();

  return (
    <ScrollView
      contentContainerClassName=" flex h-full  bg-main justify-center px-3"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex min-h-[80%] items-center gap-4 rounded-xl bg-background">
        <View className="flex w-full grow items-center gap-2 pb-8 pt-8">
          <View className="flex flex-row px-4">
            <TouchableOpacity onPress={() => router.back()}>
              <MaterialIcons name={"arrow-back"} size={24} color={"#ffff"} />
            </TouchableOpacity>
            <View className="grow"></View>
          </View>
          <View className="flex w-10/12 gap-2">
            <Text className="text-center font-satoshi-bold text-2xl text-primary">
              Forgot password?
            </Text>
            <Text className="text-center text-light-text">
              Enter your email address and we'll send you a password reset link.
            </Text>
          </View>
        </View>

        <View className="flex w-10/12 grow gap-2">
          <Input
            type="email"
            icon="email"
            label="Email Address"
            placeholder="hello@pinyaxtract.com"
          />

          <TouchableOpacity className="mt-3 rounded-md bg-primary p-2 text-center">
            <Text className="text-center font-cabinetGrotesk-bold text-xl">
              Reset Password
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="mt-3 rounded-md bg-primary p-2 text-center">
            <Link
              href={"/"}
              className="text-center font-cabinetGrotesk-bold text-xl"
            >
              Back to Login
            </Link>
          </TouchableOpacity>

          <Text className="text-light-text">Password Reset Sent</Text>
          <Text className="text-light-text">
            Please check your email address for instructions to reset your
            password
          </Text>
        </View>

        <Text className="w-10/12 py-5 text-center text-light-text">
          Fresh Leaves, Fine Fiber
        </Text>
      </View>
    </ScrollView>
  );
};

export default resetPassword;

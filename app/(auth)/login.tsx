import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import SVG from "@/constants/SVG-Constants";
import Input from "@/components/forms/Input";
import { Link } from "expo-router";

const index = () => {
  const [value, setValue] = useState("");

  const onChangeText = (text: string) => {
    setValue(text);
  };

  return (
    <ScrollView
      contentContainerClassName=" flex h-full  bg-main justify-center px-3"
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex min-h-[80%] items-center gap-4 rounded-xl bg-background">
        <View className="flex grow items-center gap-2 pb-8 pt-8">
          <SVG.Logo width={110} height={110} />
          <SVG.Wordmark />
          <Text className="text-center text-light-text">
            Welcome back you've been missed
          </Text>
          <Text className="font-satoshi-bold text-2xl text-primary">
            Login here
          </Text>
        </View>

        <View className="flex w-10/12 grow gap-2">
          <Input
            type="email"
            icon="email"
            label="Email Address"
            placeholder="hello@pinyaxtract.com"
          />

          <Input
            type="password"
            icon="lock"
            label="Password"
            placeholder="***************"
          />

          <Link href={"./resetPassword"} relativeToDirectory asChild>
            <TouchableOpacity className="">
              <Text className="text-right font-satoshi text-primary">
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity className="mt-3 rounded-md bg-primary p-2 text-center">
            <Text className="text-center font-cabinetGrotesk-bold text-xl">
              Login
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="w-10/12 py-5 text-center text-light-text">
          Fresh Leaves, Fine Fiber
        </Text>
      </View>
    </ScrollView>
  );
};

export default index;

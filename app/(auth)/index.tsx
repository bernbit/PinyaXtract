import React, { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import SVG from "@/constants/SVG-Constants";
import Input from "@/components/forms/Input";
import { Link } from "expo-router";
import useAuth from "@/context/AuthContext";
import { useRouter } from "expo-router";

import { login } from "@/firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";

const index = () => {
  const [emailVal, setEmailVal] = useState("");
  const [passwordVal, setPasswordVal] = useState("");

  const { setIsAuthenticated } = useAuth();
  const router = useRouter();

  const [inputting, setInputting] = useState(false);
  const [error, setError] = useState("");

  //* Handle Form Submit
  const handleSubmit = async () => {
    try {
      setError("");
      setInputting(true);
      const userCredential = await login(emailVal, passwordVal);

      await AsyncStorage.setItem("currentUser", JSON.stringify(userCredential));
      await AsyncStorage.setItem("isAuthenticated", JSON.stringify(true));

      console.log("Successfully logged in");
      setIsAuthenticated(true);
      router.replace("/control");
    } catch (err) {
      console.log("Error", err);
    }

    setInputting(false);
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
          {/* {error && (
            <Text className="rounded-md bg-danger p-2 text-lg text-light-text">
              {error}
            </Text>
          )} */}

          <Input
            type="email"
            icon="email"
            label="Email Address"
            placeholder="hello@pinyaxtract.com"
            error=""
            value={emailVal}
            handleValueChange={setEmailVal}
          />

          <Input
            type="password"
            icon="lock"
            label="Password"
            placeholder="***************"
            error=""
            value={passwordVal}
            handleValueChange={setPasswordVal}
          />

          <Link href={"./resetPassword"} relativeToDirectory asChild>
            <TouchableOpacity className="">
              <Text className="text-right font-satoshi text-primary">
                Forgot Password ?
              </Text>
            </TouchableOpacity>
          </Link>

          <TouchableOpacity
            className="mt-3 rounded-md bg-primary p-2 text-center"
            onPress={handleSubmit}
            disabled={inputting}
          >
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

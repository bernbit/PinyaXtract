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

  const { setIsAuthenticated, setCurrentUser } = useAuth();
  const router = useRouter();

  const [inputting, setInputting] = useState(false);
  const [error, setError] = useState("");

  //* Handle Form Submit
  const handleSubmit = async () => {
    setError("");

    // Form Validation
    if (!emailVal) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(emailVal)) return setError("Email is invalid.");
    if (!passwordVal) return setError("Password is required.");
    if (passwordVal.length < 6)
      return setError("Password must be at least 6 characters.");

    //setInputting to true
    setInputting(true);

    try {
      const userCredential = await login(emailVal, passwordVal);
      await AsyncStorage.setItem("currentUser", JSON.stringify(userCredential));
      await AsyncStorage.setItem("isAuthenticated", JSON.stringify(true));
      setIsAuthenticated(true);
      setCurrentUser?.(userCredential);
      router.replace("/control");
    } catch (error: any) {
      setError(error || "An unexpected error occurred.");
    } finally {
      setInputting(false);
    }
  };

  return (
    <ScrollView
      contentContainerClassName="flex h-full bg-background justify-center "
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex min-h-full justify-center gap-20 rounded-xl bg-background px-4">
        <View className="flex items-center gap-2">
          <SVG.Logo width={110} height={110} />
          <SVG.Wordmark />
          <Text className="text-center text-light-text">
            Welcome back you've been missed
          </Text>
          <Text className="font-satoshi-bold text-2xl text-primary">
            Login here
          </Text>
        </View>

        <View className="flex gap-4">
          {error && (
            <Text className="rounded-md bg-danger p-2 font-satoshi-bold text-lg text-light-text">
              {error}
            </Text>
          )}

          <Input
            type="email"
            icon="email"
            label="Email Address"
            placeholder="hello@pinyaxtract.com"
            error=""
            value={emailVal}
            onChangeText={(value: string) => setEmailVal(value)}
          />

          <Input
            type="password"
            icon="lock"
            label="Password"
            placeholder="***************"
            error=""
            value={passwordVal}
            onChangeText={(value: string) => setPasswordVal(value)}
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
              {inputting ? "Logging In...." : "Login"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-light-text">
          Fresh Leaves, Fine Fiber
        </Text>
      </View>
    </ScrollView>
  );
};

export default index;

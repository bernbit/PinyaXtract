import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import Modal from "@/components/Modal";
import Input from "@/components/forms/Input";

import { useRouter } from "expo-router";

import { resetPassword as resetPasswordFN } from "@/firebase/auth";

const resetPassword = () => {
  const router = useRouter();
  const [emailVal, setEmailVal] = useState<string>("");
  const [inputting, setInputting] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [showModal, setShowModal] = useState<boolean>(false);

  //* Handle Form Submit
  const handleSubmit = async () => {
    setError("");

    // Form Validation
    if (!emailVal) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(emailVal)) return setError("Email is invalid.");

    //setInputting to true
    setInputting(true);

    try {
      resetPasswordFN(emailVal);
      setShowModal(true);
    } catch (error: any) {
      setError(error || "An unexpected error occurred.");
    } finally {
      setInputting(false);
    }
  };

  const openEmailApp = async () => {
    await Linking.openURL("mailto:");
  };

  const closeModal = () => {
    setShowModal(false);
    setEmailVal("");
  };

  return (
    <ScrollView
      contentContainerClassName="flex h-full bg-background justify-center "
      keyboardShouldPersistTaps="handled"
    >
      <View className="flex min-h-full justify-center gap-20 rounded-xl bg-background px-4">
        <View className="flex items-center gap-2">
          <MaterialIcons name="lock-reset" color={Colors.primary} size={110} />
          <Text className="text-center font-satoshi-bold text-2xl text-primary">
            Forgot password?
          </Text>
          <Text className="text-center text-light-text">
            Enter your email address and we'll send you a password reset link.
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

          <TouchableOpacity
            className="mt-3 rounded-md bg-primary p-2 text-center"
            onPress={handleSubmit}
            disabled={inputting}
          >
            <Text className="text-center font-cabinetGrotesk-bold text-xl">
              {inputting ? "Resitting...." : "Reset Password"}
            </Text>
          </TouchableOpacity>
        </View>

        <Text className="text-center text-light-text">
          Fresh Leaves, Fine Fiber
        </Text>
      </View>

      <Modal showModal={showModal}>
        <View className="flex items-center gap-4 px-2">
          <View className="flex items-center">
            <MaterialIcons name="email" color={Colors.primary} size={80} />
            <Text className="text-center font-cabinetGrotesk-bold text-2xl text-light-text">
              Check Your Email
            </Text>
          </View>
          <View>
            <Text className="text-center font-satoshi-medium text-lg text-light-text">
              We've sent you a link to reset your password. If you don’t see it
              in your inbox, check your spam folder or request a new one.
            </Text>
          </View>

          <TouchableOpacity className="w-full rounded-md bg-primary p-2">
            <Text
              className="text-center font-satoshi-bold text-lg text-dark-text"
              onPress={openEmailApp}
            >
              Open Email App
            </Text>
          </TouchableOpacity>

          <TouchableOpacity className="w-full rounded-md bg-danger p-2">
            <Text
              className="text-center font-satoshi-bold text-lg text-light-text"
              onPress={closeModal}
            >
              Nevermind
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default resetPassword;

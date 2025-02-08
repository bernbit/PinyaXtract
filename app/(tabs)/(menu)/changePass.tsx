import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "@/components/forms/Input";
import { Colors } from "@/constants/Colors-Constants";

const changePass = () => {
  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Wrapper */}
        <View className="flex flex-1 justify-center px-2.5 py-2.5">
          {/* Main Container */}
          <View className="flex flex-1 justify-center gap-12 rounded-md bg-background px-4 py-10">
            <View className="flex items-center">
              <MaterialIcons
                name="lock-reset"
                color={Colors.primary}
                size={100}
              />

              <Text className="font-cabinetGrotesk-medium text-2xl text-light-text">
                Change your password
              </Text>
              <Text className="text-center font-satoshi-regular text-light-text">
                {" "}
                Enter a new password below to change your password
              </Text>
            </View>

            <View className="flex justify-center gap-4">
              <Input
                type="password"
                icon="lock"
                label="Current Password"
                placeholder="***************"
                error=""
                // value={emailVal}
                // setValue={setEmailVal}
              />

              <Input
                type="password"
                icon="lock"
                label="New Password"
                placeholder="***************"
                error=""
                // value={emailVal}
                // setValue={setEmailVal}
              />

              <Input
                type="password"
                icon="lock"
                label="Confirm New Password"
                placeholder="***************"
                error=""
                // value={emailVal}
                // setValue={setEmailVal}
              />
              <TouchableOpacity className="mt-4 rounded-md bg-primary p-2">
                <Text className="text-center font-satoshi-bold text-lg text-dark-text">
                  Update Password
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default changePass;

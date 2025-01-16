import { View, Text } from "react-native";
import React from "react";
import SVG from "@/constants/SVG-Constants";

const index = () => {
  return (
    <View className="border-test h-full px-3 py-16">
      <View className="border-test h-full rounded-xl bg-background">
        <View className="border-test flex items-center gap-2">
          <SVG.Logo width={100} height={100} />
          <SVG.Wordmark />
          <Text className="text-light-text">
            Welcome back you've been missed
          </Text>
          <Text className="font-satoshi-bold text-2xl text-primary">
            Login here
          </Text>
        </View>
      </View>
    </View>
  );
};

export default index;

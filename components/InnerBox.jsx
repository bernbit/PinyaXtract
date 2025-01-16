import { View, Text } from "react-native";
import React from "react";

const InnerBox = ({ children, title = "" }) => {
  return (
    <View className="rounded-md bg-background-alt px-4 py-5">
      {title !== "" && (
        <Text className="font-satoshi-bold text-lg text-light-text">
          {title}
        </Text>
      )}

      <View className="mt-5 flex items-center gap-6">{children}</View>
    </View>
  );
};

export default InnerBox;

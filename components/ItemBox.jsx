import { View, Text } from "react-native";
import React from "react";

const ItemBox = ({ children, title }) => {
  return (
    <View className="flex gap-4 rounded-lg bg-background px-4 py-5">
      <Text className="font-satoshi-bold text-xl text-light-text">{title}</Text>

      {children}
    </View>
  );
};

export default ItemBox;

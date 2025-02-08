import { View, Text } from "react-native";
import React from "react";

// Types
interface BadgeProps {
  notifCount?: string;
}

const Badge = ({ notifCount = "2" }: BadgeProps) => {
  return (
    <View className="absolute right-[18px] top-[2px] flex h-6 w-6 items-center justify-center rounded-full bg-danger">
      <Text className="text-center font-satoshi text-xs text-light-text">
        {notifCount}
      </Text>
    </View>
  );
};

export default Badge;

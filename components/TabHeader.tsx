import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import React from "react";

// Types
interface TabHeaderProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

const TabHeader = ({ icon, title }: TabHeaderProps) => {
  return (
    <View className="flex flex-row items-center justify-between gap-2 px-2.5 py-4">
      <View className="flex flex-row items-center gap-2">
        <Text className="font-cabinetGrotesk-extrabold text-3xl text-dark-text">
          {title}
        </Text>
      </View>

      <View className="relative px-2">
        <MaterialIcons name={icon} size={30} color={Colors["background"]} />
      </View>
    </View>
  );
};

export default TabHeader;

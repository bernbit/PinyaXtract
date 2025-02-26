import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import React from "react";
import { useColorScheme } from "nativewind";

// Types
interface TabHeaderProps {
  icon: keyof typeof MaterialIcons.glyphMap;
  title: string;
}

const TabHeader = ({ icon, title }: TabHeaderProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View className="flex flex-row items-center justify-between gap-2 px-2.5 py-4">
      <View className="flex flex-row items-center gap-2">
        <Text className="font-cabinetGrotesk-extrabold text-3xl text-dark-text dark:text-light-text">
          {title}
        </Text>
      </View>

      <View className="relative px-2">
        <MaterialIcons
          name={icon}
          size={30}
          color={
            colorScheme === "dark" ? Colors["light-text"] : Colors["background"]
          }
        />
      </View>
    </View>
  );
};

export default TabHeader;

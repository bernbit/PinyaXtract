import { View, Text } from "react-native";
import React from "react";
import SVG from "@/constants/SVG-Constants";
import { Colors } from "@/constants/Colors-Constants";
import { MaterialIcons } from "@expo/vector-icons";

const Header = () => {
  return (
    <View className="flex flex-row items-center justify-between bg-background px-2.5 py-5">
      <View className="flex grow flex-row items-center">
        <SVG.Logo width={55} height={55} />
        <SVG.Wordmark width={130} height={55} />
      </View>

      <View className="">
        <MaterialIcons name="notifications" size={30} color={Colors.primary} />
      </View>
    </View>
  );
};

export default Header;

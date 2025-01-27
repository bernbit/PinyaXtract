import { View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import React from "react";

const TabHeader = ({ icon, title }) => {
  return (
    <View className="flex flex-row items-center justify-between gap-2 px-2.5 py-5">
      <View className="flex flex-row items-center gap-2">
        <Text className="font-cabinetGrotesk-extrabold text-3xl text-dark-text">
          {title}
        </Text>
      </View>

      <View className="relative px-2">
        {/* <MaterialIcons name="notifications" size={35} color={Colors.primary} />

        <View className="absolute left-8 flex h-6 w-6 items-center justify-center rounded-full bg-danger">
          <Text className="text-center font-satoshi text-xs text-light-text">
            9+
          </Text>
        </View> */}

        <MaterialIcons name={icon} size={30} color={Colors["background"]} />
      </View>
    </View>
  );
};

export default TabHeader;

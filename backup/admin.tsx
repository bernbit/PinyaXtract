import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TabHeader from "@/components/TabHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";

const admin = () => {
  return (
    <SafeAreaView className="flex-1 bg-main">
      <TabHeader icon={"admin-panel-settings"} title={"Admin"} />
      <View className="flex flex-1 justify-start">
        {/* Header  */}
        <View className="flex flex-row">
          <Text className="flex-1 border border-background p-2 text-center font-satoshi-bold text-lg text-dark-text">
            Inventory
          </Text>
          <Text className="flex-1 border-b border-primary bg-background p-2 text-center font-satoshi-bold text-lg text-primary">
            Manage Users
          </Text>
        </View>

        <ScrollView contentContainerClassName="">
          <View className="flex-1">
            <View className="flex flex-row items-center justify-between gap-2 bg-background p-3">
              <View className="h-[60] w-[60] rounded-full bg-primary"></View>
              <View className="">
                <Text className="font-satoshi-bold text-lg text-light-text">
                  Julius Cesar
                </Text>
                <Text className="font-satoshi-regular text-sm text-light-text opacity-80">
                  juandelacruz@example.com
                </Text>
              </View>

              <View className="flex-row items-center gap-6">
                <MaterialIcons name={"edit"} color={Colors.primary} size={30} />
                <MaterialIcons
                  name={"delete"}
                  color={Colors.danger}
                  size={30}
                />
              </View>
            </View>

            <Text></Text>
          </View>
        </ScrollView>

        <TouchableOpacity className="absolute bottom-2 right-2 rounded-full bg-primary p-2.5">
          <MaterialIcons
            name="person-add"
            size={35}
            color={Colors["dark-text"]}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default admin;

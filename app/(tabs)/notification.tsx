import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import TabHeader from "@/components/TabHeader";
import SVG from "@/constants/SVG-Constants";
import { Colors } from "@/constants/Colors-Constants";
import { MaterialIcons } from "@expo/vector-icons";

const notification = () => {
  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Header */}
        <TabHeader icon={"notifications"} title={"Notifications"} />

        <View className="mb-5 flex flex-1">
          <Text className="mb-2 px-2.5 text-right font-satoshi-bold text-lg text-background">
            Mark all as read
          </Text>
          <Text className="mb-2 px-2.5 font-satoshi-bold text-lg">Today</Text>

          {/* Notification Box */}
          <View className="flex flex-row items-start justify-center gap-4 bg-notification p-3 px-2.5">
            <View className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-background-alt">
              <SVG.Overheat width={50} height={50} />
            </View>

            <View className="flex-1">
              <Text className="font-satoshi-bold text-lg text-danger">
                Overheating Detected
              </Text>
              <Text className="text-justify font-satoshi text-dark-text">
                Machine temperature has exceeded safe limits. To prevent damage,
                <Text className="font-satoshi-bold">
                  {` immediately shut down the system`}
                </Text>{" "}
                and allow at least{" "}
                <Text className="font-satoshi-bold">{` 40 minutes `}</Text> for
                cooling.{" "}
                <Text className="r font-satoshi-bold">{`Do not restart`}</Text>{" "}
                until the temperature returns to a safe range.
              </Text>

              <Text className="font-satoshi text-dark-text">2d</Text>
            </View>

            <View className="sjustify-center flex">
              {/* <MaterialIcons name="delete" size={30} color={Colors.danger} /> */}

              <MaterialIcons name="more-horiz" size={24} color="black" />
            </View>
          </View>

          {/* Notification Box */}
          <View className="flex flex-row items-start justify-center gap-4 p-3 px-2.5">
            <View className="flex h-[80px] w-[80px] items-center justify-center rounded-full bg-background-alt">
              <SVG.Stable width={50} height={50} />
            </View>

            <View className="flex-1">
              <Text className="font-satoshi-bold text-lg text-danger">
                Overheating Detected
              </Text>
              <Text className="text-justify font-satoshi text-dark-text">
                Machine temperature has exceeded safe limits. To prevent damage,
                <Text className="font-satoshi-bold">
                  {` immediately shut down the system`}
                </Text>{" "}
                and allow at least{" "}
                <Text className="font-satoshi-bold">{` 40 minutes `}</Text> for
                cooling.{" "}
                <Text className="r font-satoshi-bold">{`Do not restart`}</Text>{" "}
                until the temperature returns to a safe range.
              </Text>

              <Text className="font-satoshi text-dark-text">1d</Text>
            </View>

            <View className="sjustify-center flex">
              {/* <MaterialIcons name="delete" size={30} color={Colors.danger} /> */}

              <MaterialIcons name="more-horiz" size={24} color="black" />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default notification;

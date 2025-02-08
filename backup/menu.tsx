import React from "react";
import { SafeAreaView, ScrollView, View, Text, Pressable } from "react-native";
import TabHeader from "@/components/TabHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import Input from "@/components/forms/Input";
const profile = () => {
  const generalOptions = [
    {
      title: "Edit Profile",
      subtitle: "Change profile picture,number,e-mail",
      icon: "person",
    },

    {
      title: "Change Password",
      subtitle: "Update and strengthen account security",
      icon: "lock",
    },
    {
      title: "Download Report",
      subtitle: "Export and download this week report",
      icon: "download",
    },
    {
      title: "About PinyaXtract",
      subtitle: "Learn more about PinyaXtract and its features",
      icon: "info",
    },
  ];

  return (
    <SafeAreaView className="h-full bg-main">
      {/* Header */}
      <TabHeader icon={"menu"} title={"Profile"} />

      <View className="mb-5 flex h-full gap-5 px-2.5">
        {/* Header */}
        <View className="flex flex-row items-center gap-4 rounded-md bg-background px-3 py-3">
          <View className="h-[60] w-[60] rounded-full bg-red-500"></View>

          <View className="flex items-start">
            <Text className="font-satoshi-bold text-xl text-light-text">
              Julius Cesar
            </Text>
            <Text className="font-satoshi-regular text-light-text opacity-80">
              juandelacruz@example.com
            </Text>
          </View>
        </View>
        {/* General */}
        <View className="flex gap-8 rounded-md bg-background px-3 py-5">
          <Text className="font-satoshi-bold text-xl text-light-text opacity-80">
            General
          </Text>

          {generalOptions.map((option, index) => {
            return (
              <View className="flex flex-row items-center gap-4" key={index}>
                <View className="flex h-[35] w-[35] items-center justify-center rounded-full bg-background-alt">
                  <MaterialIcons
                    name={option.icon}
                    size={25}
                    color={Colors.primary}
                  />
                </View>

                <View>
                  <Text className="font-satoshi-bold text-lg text-light-text">
                    {option.title}
                  </Text>
                  <Text className="font-satoshi-regular text-sm text-light-text opacity-80">
                    {option.subtitle}
                  </Text>
                </View>

                <View className="flex flex-1 items-end">
                  <MaterialIcons
                    name={"chevron-right"}
                    size={35}
                    color={Colors.primary}
                  />
                </View>
              </View>
            );
          })}
        </View>

        {/* Preferences */}
        <View className="flex gap-6 rounded-md bg-background px-3 py-5">
          <Text className="font-satoshi-bold text-xl text-light-text opacity-80">
            Preferences
          </Text>

          <View className="flex flex-row items-center gap-4">
            <View className="flex h-[35] w-[35] items-center justify-center rounded-full bg-background-alt">
              <MaterialIcons
                name={"dark-mode"}
                size={25}
                color={Colors.primary}
              />
            </View>

            <View>
              <Text className="font-satoshi-bold text-lg text-light-text">
                Dark Mode
              </Text>
              <Text className="font-satoshi-regular text-sm text-light-text opacity-80">
                Enable dark mode for a better viewing experience
              </Text>
            </View>

            <View className="flex flex-1 items-end">
              <MaterialIcons
                name={"chevron-right"}
                size={35}
                color={Colors.primary}
              />
            </View>
          </View>

          <View className="flex flex-row items-center gap-4">
            <View className="flex h-[35] w-[35] items-center justify-center rounded-full bg-background-alt">
              <MaterialIcons
                name={"notifications"}
                size={25}
                color={Colors.primary}
              />
            </View>

            <View>
              <Text className="font-satoshi-bold text-lg text-light-text">
                Notification
              </Text>
              <Text className="font-satoshi-regular text-sm text-light-text opacity-80">
                Turn notifications on or off
              </Text>
            </View>

            <View className="flex flex-1 items-end">
              <MaterialIcons
                name={"chevron-right"}
                size={35}
                color={Colors.primary}
              />
            </View>
          </View>
        </View>

        {/* Logout Button */}

        <Pressable className="rounded-md bg-danger px-3 py-2">
          <Text className="text-center font-satoshi-bold text-xl text-light-text">
            Logout
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default profile;

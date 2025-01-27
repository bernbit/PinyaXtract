import React, { useState } from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import { View, Text, Pressable, Dimensions } from "react-native";
import Badge from "@/components/Badge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import notification from "./notification";

const screenWidth = Dimensions.get("window").width;

const _layout = () => {
  const indicatorPosition = useSharedValue(0);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(indicatorPosition.value, { duration: 300 }) },
    ],
    width: screenWidth / 5, // Width of each tab
    height: 50, // Height of the indicator
    // backgroundColor: Colors.primary, // Color of the indicator
    backgroundColor: "transparent",
    borderTopColor: Colors.primary, // Color of the
    borderTopWidth: 2.5,
    // borderRightWidth: 0,
    // borderLeftWidth: 0,
    // borderBottomWidth: 0,
  }));

  const handleTabPress = (index: number): void => {
    const tabWidth = screenWidth / 5; // Adjust for the number of tabs
    indicatorPosition.value = index * tabWidth; // Update the position of the moving border
  };

  return (
    <View className="flex-1">
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          animation: "shift",
          lazy: true,
          tabBarStyle: {
            backgroundColor: Colors.background,
            position: "relative",
            // height: 50,
          },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors["light-text"],
          tabBarLabelStyle: {
            fontFamily: "Satoshi-Medium",
          },

          tabBarButton: (props) => {
            const { onPress, accessibilityState, children, style } = props;

            const tabObject = {
              index: { title: "Control", icon: "settings-remote" },
              monitor: { title: "Monitor", icon: "view-timeline" },
              profile: { title: "Profile", icon: "manage-accounts" },
              notification: { title: "Notification", icon: "notifications" },
              admin: { title: "Admin", icon: "admin-panel-settings" },
            };
            const tabIndex = Object.keys(tabObject).indexOf(route.name);
            const tabConfig = tabObject[route.name as keyof typeof tabObject];

            const isFocused = accessibilityState?.selected;

            return (
              <Pressable
                className="relative flex-1 items-center justify-center"
                onPress={(event) => {
                  if (!isFocused) {
                    handleTabPress(tabIndex); // Update the indicator position
                    onPress?.(event); // Trigger the navigation action
                  }
                }}
              >
                <MaterialIcons
                  name={tabConfig.icon as keyof typeof MaterialIcons.glyphMap}
                  size={23}
                  color={`${isFocused ? Colors.primary : Colors["light-text"]}`}
                />
                <Text
                  className={`text-xs ${isFocused ? "text-primary" : "text-light-text"}`}
                >
                  {tabConfig.title}
                </Text>

                {/* <Badge /> */}
              </Pressable>
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Control" }} />
        <Tabs.Screen name="monitor" options={{ title: "Monitor" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="notification" options={{ title: "Notification" }} />
        <Tabs.Screen name="admin" options={{ title: "Admin" }} />
      </Tabs>
      <Animated.View
        style={[animatedIndicatorStyle]}
        className={"absolute bottom-0"}
      />
    </View>
  );
};

export default _layout;

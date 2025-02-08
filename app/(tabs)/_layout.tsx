import React from "react";
import { Tabs, useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import { View, Text, Pressable, Dimensions } from "react-native";
import Badge from "@/components/Badge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useAuth from "@/context/AuthContext";

// Global Variables
const tabRoutes = [
  { name: "control", title: "Control", icon: "settings-remote" },
  { name: "monitor", title: "Monitor", icon: "view-timeline" },
  { name: "notification", title: "Notification", icon: "notifications" },
  { name: "(admin)", title: "Admin", icon: "admin-panel-settings" },
  { name: "(menu)", title: "Menu", icon: "menu" },
];
const screenWidth = Dimensions.get("window").width;
const tabWidth = screenWidth / tabRoutes.length;

const _layout = () => {
  //Authentication
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useFocusEffect(() => {
    if (!isAuthenticated) {
      router.replace("/");
    }
  });

  //Animations
  const indicatorPosition = useSharedValue<number>(0);
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(indicatorPosition.value, { duration: 300 }) },
    ],
    width: tabWidth,
    height: 50,
    position: "absolute",
    bottom: 0,
    backgroundColor: "transparent",
    borderTopColor: Colors.primary,
    borderTopWidth: 2.5,
  }));

  const handleTabPress = (index: number): void => {
    indicatorPosition.value = index * tabWidth;
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
          },
          // Customize Tab Bar
          tabBarButton: (props) => {
            const { onPress, accessibilityState } = props;
            const isFocused = accessibilityState?.selected;
            const tabIndex = tabRoutes.findIndex((r) => r.name === route.name);
            const tabConfig = tabRoutes[tabIndex];

            return (
              <Pressable
                className="relative flex-1 items-center justify-center"
                onPress={(event) => {
                  if (!isFocused) {
                    handleTabPress(tabIndex);
                    onPress?.(event);
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
        {/* Tab Screens */}
        {tabRoutes.map(({ name }) => (
          <Tabs.Screen key={name} name={name} />
        ))}
      </Tabs>

      {/* Animated Indicator */}
      <Animated.View style={[animatedIndicatorStyle]} />
    </View>
  );
};

export default _layout;

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { Tabs, useSegments } from "expo-router";
import TabHeader from "@/components/TabHeader";
import { Colors } from "@/constants/Colors-Constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

// Global Variables
const tabRoutes = [
  { name: "inventory", title: "Inventory" },
  { name: "manageUsers", title: "Manage Users" },
];
const screenWidth = Dimensions.get("window").width;
const tabWidth = screenWidth / tabRoutes.length;

const _layout = () => {
  //Animations
  const indicatorPosition = useSharedValue<number>(0);
  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(indicatorPosition.value, { duration: 300 }) },
    ],
    width: tabWidth,
    height: 50,
    position: "absolute",
    top: 0,
    zIndex: 10,
    backgroundColor: Colors.background,
  }));

  const handleTabPress = (index: number): void => {
    indicatorPosition.value = index * tabWidth;
  };

  const segment: string[] = useSegments();

  const [isTabScreen, setIsTabScreen] = useState<boolean>(true);
  useEffect(() => {
    const checkTabScreen = tabRoutes.some((route) =>
      segment.includes(route.name),
    );

    setIsTabScreen(checkTabScreen);
  }, [segment]);

  return (
    <View className={`flex-1 bg-main ${!isTabScreen ? "hidden" : ""}`}>
      <TabHeader icon={"admin-panel-settings"} title={"Admin"} />
      <View className="relative flex-1">
        <Tabs
          screenOptions={({ route }) => ({
            headerShown: false,
            tabBarPosition: "top",
            animation: "shift",
            lazy: true,
            tabBarStyle: {
              backgroundColor: "transparent",
              elevation: 0,
              borderTopWidth: 0,
              borderColor: Colors.background,
              zIndex: 20,
            },
            headerShadowVisible: false,
            // Customize Tab Bar
            tabBarButton: (props) => {
              const { onPress, accessibilityState } = props;
              const isFocused = accessibilityState?.selected;
              const tabIndex = tabRoutes.findIndex(
                (r) => r.name === route.name,
              );
              const tabConfig = tabRoutes[tabIndex];

              return (
                <Pressable
                  className="flex-1 items-center justify-center"
                  onPress={(event) => {
                    if (!isFocused) {
                      handleTabPress(tabIndex);
                      onPress?.(event);
                    }
                  }}
                >
                  <Text
                    className={`font-cabinetGrotesk-medium text-xl ${isFocused ? "text-light-text" : "text-dark-text"}`}
                  >
                    {tabConfig.title}
                  </Text>
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
        {isTabScreen && <Animated.View style={[animatedIndicatorStyle]} />}
      </View>
    </View>
  );
};

export default _layout;

import React from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const screenWidth = Dimensions.get("window").width;

const _layout = () => {
  const indicatorPosition = useSharedValue(0); // Position of the moving border

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withTiming(indicatorPosition.value, { duration: 300 }) },
    ],
    width: screenWidth / 4, // Width of each tab
    height: 4, // Height of the indicator
    backgroundColor: Colors.primary, // Color of the indicator
  }));

  const handleTabPress = (index: number): void => {
    const tabWidth = screenWidth / 4; // Adjust for the number of tabs
    indicatorPosition.value = index * tabWidth; // Update the position of the moving border
  };

  return (
    <View style={{ flex: 1 }}>
      <Tabs
        screenOptions={({ route }) => ({
          headerShown: false,
          animation: "shift",
          lazy: true,
          tabBarStyle: { backgroundColor: Colors.background },
          tabBarActiveTintColor: Colors.primary,
          tabBarInactiveTintColor: Colors["light-text"],
          tabBarLabelStyle: {
            fontFamily: "Satoshi-Medium",
          },
          tabBarButton: (props) => {
            const tabIndex = ["index", "monitor", "profile", "admin"].indexOf(
              route.name,
            );
            return (
              <View
                style={styles.tabButton}
                onTouchStart={() => handleTabPress(tabIndex)}
              >
                <MaterialIcons
                  name={`person`}
                  size={23}
                  color={Colors.primary}
                />
                <Text style={{ color: Colors.primary }}>{route.name}</Text>
              </View>
            );
          },
        })}
      >
        <Tabs.Screen name="index" options={{ title: "Control" }} />
        <Tabs.Screen name="monitor" options={{ title: "Monitor" }} />
        <Tabs.Screen name="profile" options={{ title: "Profile" }} />
        <Tabs.Screen name="admin" options={{ title: "Admin" }} />
      </Tabs>
      <Animated.View style={[styles.indicator, animatedIndicatorStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    position: "relative",
    height: 20,
    backgroundColor: Colors.background,
  },
  tabButton: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  indicator: {
    position: "absolute",
    bottom: 0, // Position the indicator at the bottom of the tab bar
  },
});

export default _layout;

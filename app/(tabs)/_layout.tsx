import React, { useState } from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import { Animated } from "react-native";

const _layout = () => {
  const [activeTab, setActiveTab] = useState("control");

  const [scale] = useState(new Animated.Value(1));

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        tabBarStyle: { backgroundColor: Colors.background },
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors["light-text"],
        tabBarLabelStyle: {
          fontFamily: "Satoshi-Medium",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Control",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="settings-remote"
              size={size}
              color={focused ? Colors.primary : Colors["light-text"]}
            />
          ),
          tabBarItemStyle: {
            borderTopWidth: 2,
            borderTopColor:
              activeTab === "control" ? Colors.primary : Colors.background,
          },
        }}
        listeners={{
          tabPress: () => setActiveTab("control"),
        }}
      />

      <Tabs.Screen
        name="monitor"
        options={{
          title: "Monitor",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="view-timeline"
              size={size}
              color={focused ? Colors.primary : Colors["light-text"]}
            />
          ),
          tabBarItemStyle: {
            borderTopWidth: 2,
            borderTopColor:
              activeTab === "monitor" ? Colors.primary : Colors.background,
          },
        }}
        listeners={{
          tabPress: () => setActiveTab("monitor"),
        }}
      />

      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="manage-accounts"
              size={size}
              color={focused ? Colors.primary : Colors["light-text"]}
            />
          ),
          tabBarItemStyle: {
            borderTopWidth: 2,
            borderTopColor:
              activeTab === "profile" ? Colors.primary : Colors.background,
          },
        }}
        listeners={{
          tabPress: () => setActiveTab("profile"),
        }}
      />

      <Tabs.Screen
        name="info"
        options={{
          title: "Info",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="info"
              size={size}
              color={focused ? Colors.primary : Colors["light-text"]}
            />
          ),
          tabBarItemStyle: {
            borderTopWidth: 2,
            borderTopColor:
              activeTab === "info" ? Colors.primary : Colors.background,
          },
        }}
        listeners={{
          tabPress: () => setActiveTab("info"),
        }}
      />
    </Tabs>
  );
};

export default _layout;

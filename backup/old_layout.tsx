import React, { useState } from "react";
import { Tabs } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";

const _layout = () => {
  const [activeTab, setActiveTab] = useState("control");

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        animation: "shift",
        lazy: true,
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
        name="admin"
        options={{
          title: "Admin",
          tabBarIcon: ({ focused, size }) => (
            <MaterialIcons
              name="admin-panel-settings"
              size={size}
              color={focused ? Colors.primary : Colors["light-text"]}
            />
          ),
          tabBarItemStyle: {
            borderTopWidth: 2,
            borderTopColor:
              activeTab === "admin" ? Colors.primary : Colors.background,
          },
        }}
        listeners={{
          tabPress: () => setActiveTab("admin"),
        }}
      />
    </Tabs>
  );
};

export default _layout;

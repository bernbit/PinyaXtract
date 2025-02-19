import React, { useState, useEffect } from "react";
import { Tabs, useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import {
  View,
  Text,
  Pressable,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Badge from "@/components/Badge";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
import useAuth from "@/context/AuthContext";

import { getUserData } from "@/firebase/firestore";

import Loader from "@/components/Loader";

//Tab Routes
const tabRoutes = [
  { name: "control", title: "Control", icon: "settings-remote" },
  { name: "monitor", title: "Monitor", icon: "view-timeline" },
  { name: "notification", title: "Notification", icon: "notifications" },
  { name: "(admin)", title: "Admin", icon: "admin-panel-settings" },
  { name: "(menu)", title: "Menu", icon: "menu" },
];
const screenWidth = Dimensions.get("window").width;

const _layout = () => {
  //Authentication
  const { isAuthenticated, currentUser } = useAuth();
  const uid = currentUser?.user?.uid;

  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  //* useEffect for fetching user data
  useEffect(() => {
    if (!uid) {
      console.log("No UID Available");
      setIsFetching(false);
      return;
    }

    const LoadUserData = async () => {
      try {
        const fetchUserData = await getUserData(String(uid));
        if (fetchUserData) {
          setIsAdmin(fetchUserData.isAdmin);
        } else {
          console.log("User data is null");
        }
      } catch (err) {
        console.log("Unable to fetch user data", err);
      } finally {
        setIsFetching(false); // Data fetched or failed, stop loading
      }
    };

    LoadUserData();
  }, [uid]);

  const visibleTabRoutes = isAdmin
    ? tabRoutes
    : tabRoutes.filter((tab) => tab.name !== "(admin)");
  const tabWidth = screenWidth / visibleTabRoutes.length;

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

  if (isFetching) {
    // Show loading spinner while data is being fetched
    return <Loader />;
  }

  return (
    <View className="flex-1 bg-main">
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
            const tabIndex = visibleTabRoutes.findIndex(
              (r) => r.name === route.name,
            );
            const tabConfig = visibleTabRoutes[tabIndex];

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
          <Tabs.Screen
            key={name}
            name={name}
            redirect={name === "(admin)" && !isAdmin}
          />
        ))}
      </Tabs>

      {/* Animated Indicator */}
      <Animated.View style={[animatedIndicatorStyle]} />
    </View>
  );
};

export default _layout;

import React, { useState, useEffect } from "react";
import { View, Text, Pressable, Dimensions } from "react-native";
import { Tabs, useRouter, useFocusEffect } from "expo-router";
import { MaterialIcons } from "@expo/vector-icons";
// Expo Push Notification
import { Platform } from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
//Custom Components
import Badge from "@/components/Badge";
import Loader from "@/components/Loader";
//Constants
import { Colors } from "@/constants/Colors-Constants";
//Reanimated
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";
//Context
import useAuth from "@/context/AuthContext";
import useGlobal from "@/context/GlobalContext";
//Firebase
import { getUserData } from "@/firebase/firestore";
import { storeDeviceToken } from "@/firebase/firestore";

// Notification Config
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

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
  //Expo Router
  const router = useRouter();
  //useAuth
  const { isAuthenticated, currentUser } = useAuth();
  const uid = currentUser?.user?.uid;
  //useGlobal
  const { expoPushToken, setExpoPushToken } = useGlobal();
  //States
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  //Functions
  const handleRegistrationError = (errorMessage: string) => {
    console.error(errorMessage);
    alert(errorMessage);
  };

  const registerForPushNotificationsAsync = async () => {
    try {
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
          enableLights: true,
          enableVibrate: true,
          bypassDnd: true,
          sound: "default",
        });
      }

      if (!Device.isDevice) {
        handleRegistrationError(
          "Must use a physical device for push notifications.",
        );
        return null;
      }

      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        handleRegistrationError(
          "Permission not granted for push notifications.",
        );
        return null;
      }

      const projectId =
        Constants?.expoConfig?.extra?.eas?.projectId ??
        Constants?.easConfig?.projectId;
      if (!projectId) {
        handleRegistrationError("Project ID not found.");
        return null;
      }

      const pushTokenString = (
        await Notifications.getExpoPushTokenAsync({ projectId })
      ).data;

      console.log("Push Token:", pushTokenString);
      return pushTokenString;
    } catch (error) {
      handleRegistrationError(`Error registering for notifications: ${error}`);
      return null;
    }
  };

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

  //*useEffect to regsiter Expo Push Token
  useEffect(() => {
    const registerToken = async () => {
      const token = await registerForPushNotificationsAsync();
      if (token && isAuthenticated) {
        setExpoPushToken(token);
        await storeDeviceToken(uid, token);
      }
    };

    registerToken();

    return () => {
      // Cleanup function if needed
    };
  }, []);

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

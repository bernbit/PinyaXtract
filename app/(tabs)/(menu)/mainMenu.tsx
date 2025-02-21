import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import TabHeader from "@/components/TabHeader";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { logout } from "@/firebase/auth";

//Firebase
import { getUserDataRealtime, removeDeviceToken } from "@/firebase/firestore";
//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";
//Context
import useAuth from "@/context/AuthContext";
import useGlobal from "@/context/GlobalContext";

import MenuSkeleton from "@/components/skeleton/MenuSkeleton";

const profile = () => {
  // Expo Router
  const router = useRouter();
  // useAuth
  const { setIsAuthenticated, currentUser } = useAuth();
  const uid = currentUser?.user?.uid;
  //useGlobal
  const { expoPushToken } = useGlobal();

  // useStates
  const [userData, setUserData] = useState<FirestoreUserDataType>({
    name: "",
    email: "",
    password: "",
    profile: "",
    isAdmin: false,
  });
  const [isFetching, setIsFetching] = useState<boolean>(true);

  // Types
  type PathType = "/editProfile" | "/deleteAcc" | "/downloadReport" | "/about";
  interface OptionTypes {
    title: string;
    subtitle: string;
    icon: keyof typeof MaterialIcons.glyphMap;
    path: PathType;
    color: string;
  }

  const generalOptions: OptionTypes[] = [
    {
      title: "Edit Profile",
      subtitle: "Change profile picture, name, number",
      icon: "person",
      path: "/editProfile",
      color: Colors.primary,
    },

    {
      title: "Download Report",
      subtitle: "Export and download this week report",
      icon: "download",
      path: "/downloadReport",
      color: Colors.primary,
    },
    {
      title: "About PinyaXtract",
      subtitle: "Learn more about PinyaXtract and its features",
      icon: "info",
      path: "/about",
      color: Colors.primary,
    },
    {
      title: "Delete your account",
      subtitle: "Permanently delete your account and data",
      icon: "delete",
      path: "/deleteAcc",
      color: Colors.danger,
    },
  ];

  const handleLogout = async () => {
    try {
      await logout();
      if (uid) {
        await removeDeviceToken(uid, expoPushToken);
      }
      await AsyncStorage.removeItem("currentUser");
      await AsyncStorage.setItem("isAuthenticated", JSON.stringify(false));
      setIsAuthenticated(false);
      router.replace("/");
    } catch (err) {
      console.log("Error removing user data from async storage", err);
    }
  };

  //* useEffect for fetching user data in real-time
  useEffect(() => {
    if (!uid) {
      console.log("No UID Available");
      return;
    }

    console.log("Listening for User Data Changes", uid);

    // Subscribe to real-time updates
    const unsubscribe = getUserDataRealtime(uid, (newUserData) => {
      if (newUserData) {
        setUserData(newUserData as FirestoreUserDataType);
        setIsFetching(false);
      } else {
        console.log("User data is null");
      }
    });

    // Cleanup function to stop listening when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [uid]); // Depend on `uid` to re-run when it changes

  return (
    <>
      {isFetching ? (
        <MenuSkeleton />
      ) : (
        <SafeAreaView className="flex-1 bg-main">
          <ScrollView contentContainerClassName="min-h-full">
            {/* Header */}
            <TabHeader icon={"menu"} title={"Menu"} />

            <View className="mb-5 flex flex-1 gap-2 px-2.5">
              {/* Body */}
              <View className="flex flex-row items-center gap-4 rounded-md bg-background px-3 py-3">
                <View className="h-[60] w-[60] rounded-full bg-red-500">
                  <Image
                    source={{ uri: String(userData.profile) }}
                    className="h-full w-full rounded-full bg-primary"
                  />
                </View>

                <View className="flex items-start">
                  <Text className="font-satoshi-bold text-xl text-light-text">
                    {userData.name}
                  </Text>
                  <Text className="font-satoshi-regular text-light-text opacity-80">
                    {userData.email}
                  </Text>
                </View>
              </View>
              {/* General */}
              <View className="flex flex-1 gap-8 rounded-md bg-background px-3 py-5">
                <Text className="font-satoshi-bold text-xl text-light-text opacity-80">
                  General
                </Text>

                {generalOptions.map((option, index) => {
                  return (
                    <TouchableOpacity
                      onPress={() => router.push(option.path)}
                      className="flex flex-row items-center gap-4"
                      key={index}
                    >
                      <View className="flex h-[35] w-[35] items-center justify-center rounded-full bg-background-alt">
                        <MaterialIcons
                          name={option.icon}
                          size={25}
                          color={option.color}
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
                          color={option.color}
                        />
                      </View>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Preferences */}
              <View className="flex flex-1 gap-6 rounded-md bg-background px-3 py-5">
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
                      Enable dark mode for a better experience
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

              <View className="flex flex-1">
                <TouchableOpacity
                  className="rounded-md bg-danger px-3 py-2"
                  onPress={handleLogout}
                >
                  <Text className="text-center font-satoshi-bold text-xl text-light-text">
                    Logout
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      )}
    </>
  );
};

export default profile;

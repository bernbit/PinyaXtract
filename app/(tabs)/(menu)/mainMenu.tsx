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
import { getUserData } from "@/firebase/firestore";
//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";
//Context
import useAuth from "@/context/AuthContext";

import MenuSkeleton from "@/components/skeleton/MenuSkeleton";

// Types
type PathType = "/editProfile" | "/changePass" | "/downloadReport" | "/about";
interface OptionTypes {
  title: string;
  subtitle: string;
  icon: keyof typeof MaterialIcons.glyphMap;
  path: PathType;
}

const generalOptions: OptionTypes[] = [
  {
    title: "Edit Profile",
    subtitle: "Change profile picture, name, number",
    icon: "person",
    path: "/editProfile",
  },

  // {
  //   title: "Download Report",
  //   subtitle: "Export and download this week report",
  //   icon: "download",
  //   path: "/downloadReport",
  // },
  {
    title: "About PinyaXtract",
    subtitle: "Learn more about PinyaXtract and its features",
    icon: "info",
    path: "/about",
  },
  {
    title: "Delete your account",
    subtitle: "Update and strengthen account security",
    icon: "delete",
    path: "/changePass",
  },
];

const profile = () => {
  // Expo Router
  const router = useRouter();
  // useAuth
  const { setIsAuthenticated, currentUser } = useAuth();
  const uid = currentUser?.user.uid;

  // useStates
  const [userData, setUserData] = useState<FirestoreUserDataType>({
    name: "",
    email: "",
    password: "",
    profile: "",
    isAdmin: false,
  });
  const [isFetching, setIsFetching] = useState<boolean>(true);

  //* useEffect for fetching user data
  useEffect(() => {
    if (!uid) {
      console.log("No UID Available");
      return;
    }

    console.log("Main Menu User", uid);

    const LoadUserData = async () => {
      try {
        setIsFetching(true);
        const fetchUserData = await getUserData(String(uid));
        if (fetchUserData) {
          setUserData(fetchUserData as FirestoreUserDataType);
          setIsFetching(false);
        } else {
          console.log("User data is null");
        }
      } catch (err) {
        console.log("Unable to fetch user data", err);
      }
    };

    LoadUserData();
  }, []);

  const handleLogout = async () => {
    try {
      logout();
      await AsyncStorage.removeItem("currentUser");
      await AsyncStorage.setItem("isAuthenticated", JSON.stringify(false));
      setIsAuthenticated(false);
      router.replace("/");
    } catch (err) {
      console.log("Error removing user data from async storage", err);
    }
  };

  return (
    <>
      {isFetching ? (
        <MenuSkeleton />
      ) : (
        <SafeAreaView className="flex-1 bg-main">
          <ScrollView contentContainerClassName="min-h-full">
            {/* Header */}
            <TabHeader icon={"menu"} title={"Menu"} />

            <View className="flex flex-1 gap-2 px-2.5">
              {/* Header */}
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

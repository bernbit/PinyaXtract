import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import Input from "@/components/forms/Input";

import { getUserData } from "@/firebase/firestore";

import useAuth from "@/context/AuthContext";

const profile = () => {
  const { currentUser } = useAuth();
  const uid = currentUser?.user?.uid;

  const [userData, setUserData] = useState<UserData | null>({
    name: "",
    username: "",
    email: "",
    password: "",
    mobileNum: "",
    role: "",
    profile: "",
    isAdmin: false,
  });

  // * useEffect fetch user data

  interface UserData {
    // Define the structure of the user data returned from Firebase
    [key: string]: any; // Or define more specific properties as needed
  }
  useEffect(() => {
    if (!uid) {
      console.log("No Selected User UID to Edit");
      return;
    }

    const LoadUserData = async () => {
      try {
        const fetchUserData = await getUserData(uid);

        setUserData(fetchUserData);
        // setUserInitialData(fetchUserData);
        // setRole(fetchUserData.role);
      } catch (err) {
        console.log("Unable to fetch user data", err);
      }
    };

    LoadUserData();
  }, [uid]);

  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Wrapper */}
        <View className="flex flex-1 justify-center px-2.5 py-2.5">
          {/* Main Container */}
          <View className="flex flex-1 justify-center gap-12 rounded-md bg-background px-4 py-10">
            <View className="flex items-center gap-2">
              <View className="h-[125] w-[125] rounded-full bg-red-400"></View>

              <Text className="font-satoshi-bold text-xl text-light-text">
                {" "}
                Edit profile image
              </Text>
            </View>

            <View className="flex justify-center gap-2">
              <Input
                type="email"
                icon="person"
                label="Name"
                placeholder="Juan Dela Cruz"
                error=""
                value={userData.name}
                // setValue={setEmailVal}
              />
              <Input
                type="email"
                icon="email"
                label="Email Address"
                placeholder="hello@pinyaxtract.com"
                error=""
                value={userData.email}
                // setValue={setEmailVal}
              />

              <Input
                type="password"
                icon="lock"
                label="Password"
                placeholder="password"
                error=""
                value={userData.password}
                // setValue={setEmailVal}
              />

              <Input
                type="email"
                icon="email"
                label="Mobile Number"
                placeholder="+63XXXYYYZZZZ"
                error=""
                value={userData.mobileNum}
                // setValue={setEmailVal}
              />

              <TouchableOpacity className="mt-4 rounded-md bg-primary p-2">
                <Text className="text-center font-satoshi-bold text-lg text-dark-text">
                  Edit Profile
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;

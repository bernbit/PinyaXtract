import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useLocalSearchParams } from "expo-router";
import * as ImagePicker from "expo-image-picker";

//Default Profile Image
import ProfileIcon from "@/assets/images/ProfileIcon.png";

//Constants
import { Colors } from "@/constants/Colors-Constants";
import SVG from "@/constants/SVG-Constants";

//Custom Components
import Input from "@/components/forms/Input";
import Modal from "@/components/Modal";
import Dropdown from "@/components/forms/Dropdown";

import ProfileSkeleton from "@/components/skeleton/ProfileSkeleton";

//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";
//Firebase
import { changePassword, login } from "@/firebase/auth";
import { updateUserData, getUserData } from "@/firebase/firestore";
//Supabase
import { uploadProfile } from "@/supabase/storage";

const editUser = () => {
  const { uid } = useLocalSearchParams();

  //useStates
  const [userData, setUserData] = useState<FirestoreUserDataType>({
    name: "",
    email: "",
    password: "",
    profile: "",
    isAdmin: false,
  });
  const [userInitialData, setInitalUserData] = useState<FirestoreUserDataType>({
    name: "",
    email: "",
    password: "",
    profile: "",
    isAdmin: false,
  });

  const [role, setRole] = useState<string>("Select");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [inputting, setInputting] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  //* useEffect for fetching user data
  useEffect(() => {
    const loadUserData = async () => {
      if (!uid) {
        console.log("No UID Available");
        return;
      }

      setIsFetching(true);

      try {
        const fetchUserData = await getUserData(String(uid));
        if (!fetchUserData) {
          console.log("User data is null");
          return;
        }

        setUserData(fetchUserData);
        setInitalUserData(fetchUserData);
        setProfileImage(fetchUserData.profile);
        setRole(fetchUserData.isAdmin ? "admin" : "user");
      } catch (error) {
        console.error("Unable to fetch user data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    loadUserData();
  }, [uid]);

  //Functions
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const handleEditProfile = async () => {
    setError("");

    // Check if a change happen
    if (
      JSON.stringify(userInitialData) ===
      JSON.stringify({ ...userData, isAdmin: role.toLowerCase() === "admin" })
    ) {
      setError("No changes happen");
      return;
    }

    // Form Validation
    if (!profileImage) return setError("Please upload a profile image");
    if (!userData.name) return setError("Name is required.");
    if (!userData.email) return setError("Email is required.");
    if (!/\S+@\S+\.\S+/.test(userData.email))
      return setError("Email is invalid.");
    if (!userData.password) return setError("Password is required.");
    if (userData.password.length < 6)
      return setError("Password must be at least 6 characters.");
    if (role === "Select") return setError("Select a Role");

    //setInputting to true
    setInputting(true);

    try {
      let profileImageUrl: string = profileImage;
      let newEmail: string = userInitialData.email ?? "";
      let newPassword: string = userInitialData.password ?? "";

      // Upload profile image if necessary
      if (
        profileImage &&
        typeof profileImage === "string" &&
        !profileImage.startsWith("http")
      ) {
        const uploadedUrl = await uploadProfile(profileImage, "pinyaxtract");
        if (uploadedUrl) {
          profileImageUrl = uploadedUrl;
        }
      }

      // Update password if changed
      if (userData.password !== userInitialData.password) {
        const { user } = await login(
          userInitialData.email ?? "",
          userInitialData.password ?? "",
        );
        await changePassword(user, userData.password);
        newPassword = userData.password;
      }

      // Combine Data
      const updatedData = {
        ...userData,
        email: String(newEmail),
        password: String(newPassword),
        profile: String(profileImageUrl),
        isAdmin: role.toLowerCase() === "admin",
      };

      //Update User Data to Firestore
      await updateUserData(updatedData, String(uid));
      // Update User Initial Data State
      setInitalUserData(updatedData);
      setShowModal(true);
    } catch (error: any) {
      setError(error.message || "An unexpected error occurred.");
    } finally {
      setInputting(false);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  // Handle Text Inputs Change
  const handleInputChange = (key: string, value: any) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <>
      {isFetching ? (
        <ProfileSkeleton />
      ) : (
        <SafeAreaView className="flex-1 bg-main">
          <ScrollView contentContainerClassName="min-h-full">
            {/* Wrapper */}
            <View className="flex flex-1 justify-center px-2.5 py-2.5">
              {/* Main Container */}
              <View className="flex flex-1 justify-center gap-12 rounded-md bg-background px-4 py-10">
                <View className="flex items-center gap-2">
                  <View className="relative right-0 h-[125] w-[125] rounded-full">
                    <Image
                      source={
                        profileImage ? { uri: profileImage } : ProfileIcon
                      }
                      className="h-full w-full rounded-full bg-primary"
                    />

                    <TouchableOpacity
                      className="absolute bottom-0 right-0 items-center justify-center rounded-full bg-background-alt p-2"
                      onPress={pickImage}
                    >
                      <MaterialIcons
                        name={"edit"}
                        color={Colors.primary}
                        size={20}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text className="font-satoshi-bold text-xl text-light-text">
                    Change profile image
                  </Text>
                  <Text className="font-satoshi-bold text-xl text-light-text opacity-80">
                    SVG, PNG, JPG
                  </Text>
                </View>

                <View className="flex justify-center gap-2">
                  {error && (
                    <Text className="rounded-md bg-danger p-2 font-satoshi-bold text-lg text-light-text">
                      {error}
                    </Text>
                  )}

                  <Input
                    icon="person"
                    label="Name"
                    placeholder="Juan Dela Cruz"
                    error=""
                    value={userData.name}
                    onChangeText={(text: string) =>
                      handleInputChange("name", text)
                    }
                  />
                  <Input
                    icon="email"
                    label="Email Address"
                    placeholder="hello@pinyaxtract.com"
                    error=""
                    value={userData.email}
                    onChangeText={(text: string) =>
                      handleInputChange("email", text)
                    }
                    enabled={false}
                  />

                  <Input
                    type="password"
                    icon="lock"
                    label="Password"
                    placeholder="**********"
                    error=""
                    value={userData.password}
                    onChangeText={(text: string) =>
                      handleInputChange("password", text)
                    }
                  />

                  <Dropdown
                    label="Role"
                    icon={`${role === "user" ? "account-box" : role === "admin" ? "admin-panel-settings" : "manage-accounts"}`}
                    options={[
                      { label: "User", value: "user" },
                      { label: "Admin", value: "admin" },
                    ]}
                    selectedValue={role.toLowerCase()}
                    onValueChange={(value) => setRole(value)}
                  />

                  <TouchableOpacity
                    className="mt-4 rounded-md bg-primary p-2"
                    onPress={handleEditProfile}
                    disabled={inputting}
                  >
                    <Text
                      className={`text-center font-satoshi-bold text-lg text-dark-text ${
                        inputting ? "opacity-80" : ""
                      }`}
                    >
                      {inputting ? "Updating..." : "Update Account"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Modal */}
          <Modal showModal={showModal}>
            <View className="flex items-center gap-4">
              <SVG.Ready width={60} height={60} />

              <View>
                <Text className="text-center font-cabinetGrotesk-bold text-2xl text-light-text">
                  All Done!
                </Text>
                <Text className="text-center font-satoshi-medium text-lg text-light-text">
                  {`${userData.name?.split(" ")[0]} information is now up-to-date`}
                </Text>
              </View>

              <TouchableOpacity className="w-full rounded-md bg-danger p-2">
                <Text
                  className="text-center font-satoshi-bold text-lg text-light-text"
                  onPress={closeModal}
                >
                  OK
                </Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </SafeAreaView>
      )}
    </>
  );
};

export default editUser;

import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
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

//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";
//Firebase
import { addUserData } from "@/firebase/firestore";
import { signup, logout } from "@/firebase/auth";

//Supabase
import { uploadProfile } from "@/supabase/storage";

//Functions
const addUser = () => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [role, setRole] = useState<string>("Select");
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [userData, setUserData] = useState<FirestoreUserDataType>({
    name: "",
    email: "",
    password: "",
    profile: "",
    isAdmin: false,
  });
  const [error, setError] = useState<string | null>("");
  const [inputting, setInputting] = useState<boolean>(false);

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

  const handleAddUser = async () => {
    setError("");

    //Form Validation

    if (!profileImage) {
      setError("Please upload a profile image");
      return;
    }

    if (!userData.name) {
      setError("Name is required.");
      return;
    }

    if (!userData.email) {
      setError("Email is required.");
      return;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      setError("Email is invalid.");
      return;
    }

    if (!userData.password) {
      setError("Password is required.");
      return;
    } else if (userData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (role === "Select") {
      setError("Select a Role");
      return;
    }

    //setInputting to true
    setInputting(true);

    try {
      // Create User Account to have UID
      const userCredential = await signup(userData.email, userData.password);
      const userUid = userCredential.user.uid;

      //Upload Profile Image in Supabase Storage
      const profileImageUrl = await uploadProfile(profileImage, "pinyaxtract");

      // Combine Data
      const newData = {
        uid: userUid,
        ...userData,
        profile: String(profileImageUrl),
        isAdmin: role === "admin",
      };
      //Add User Data to Firestore
      await addUserData(newData, userUid);
      //Logout to Change Firebase AuthState
      await logout();
      setShowModal(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setInputting(false);
    }
  };

  const closeModal = () => {
    setUserData({
      profile: "",
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    setRole("Select");
    setProfileImage(null);
    setShowModal(false);
  };

  // Handle Text Inputs Change
  const handleInputChange = (key: string, value: any) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Wrapper */}
        <View className="flex flex-1 justify-center px-2.5 py-2.5">
          {/* Main Container */}
          <View className="flex flex-1 justify-center gap-12 rounded-md bg-background px-4 py-10">
            <View className="flex items-center gap-2">
              <View className="relative right-0 h-[125] w-[125] rounded-full">
                <Image
                  source={profileImage ? { uri: profileImage } : ProfileIcon}
                  className="h-full w-full rounded-full bg-primary"
                />

                <TouchableOpacity
                  className="absolute bottom-0 right-0 items-center justify-center rounded-full bg-background-alt p-2"
                  onPress={pickImage}
                >
                  <MaterialIcons
                    name={"upload"}
                    color={Colors.primary}
                    size={20}
                  />
                </TouchableOpacity>
              </View>

              <Text className="font-satoshi-bold text-xl text-light-text">
                Upload profile image
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
                onChangeText={(text: string) => handleInputChange("name", text)}
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
                selectedValue={role}
                onValueChange={(value) => setRole(value)}
              />

              <TouchableOpacity
                className="mt-4 rounded-md bg-primary p-2"
                onPress={handleAddUser}
                disabled={inputting}
              >
                <Text
                  className={`text-center font-satoshi-bold text-lg text-dark-text ${
                    inputting ? "opacity-80" : ""
                  }`}
                >
                  {inputting ? "Adding..." : "Add Account"}
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
              Congratulations!
            </Text>
            <Text className="text-center font-satoshi-medium text-lg text-light-text">
              {`${userData.name?.split(" ")[0]} was succesfully added as a new user`}
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
  );
};

export default addUser;

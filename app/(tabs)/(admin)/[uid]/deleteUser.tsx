import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";

import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import Modal from "@/components/Modal";

//Firebase
import { login, deleteAccount, logout } from "@/firebase/auth";
import { getUserData, deleteUserData } from "@/firebase/firestore";
//Supabase
import { deleteProfile } from "@/supabase/storage";

//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";

const deleteUser = () => {
  //Expo Router
  const router = useRouter();
  const { uid } = useLocalSearchParams();

  const [userData, setUserData] = useState<FirestoreUserDataType | null>({
    name: "",
    email: "",
    password: "",
    profile: "",
    isAdmin: false,
  });
  const [name, setName] = useState<string>("");

  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [showSuccessModal, setShowSuccessModal] = useState<boolean>(false);
  const [error, setError] = useState<string | null>("");
  const [inputting, setInputting] = useState<boolean>(false);

  //* useEffect for fetching user data
  useEffect(() => {
    if (!uid) {
      console.log("No UID Available");
      return;
    }

    const LoadUserData = async () => {
      try {
        const fetchUserData = await getUserData(String(uid));
        setUserData(fetchUserData);
      } catch (err) {
        console.log("Unable to fetch user data", err);
      }
    };

    LoadUserData();
  }, [uid]);

  const handleDeleteUser = async () => {
    const nameCode = userData?.name?.split(" ")[0].toLowerCase();
    const nameInput = name.split(" ")[0].toLowerCase();

    if (!name) {
      setError("Please enter confirmation code");
      return;
    }

    //Form Validation
    if (nameInput !== nameCode) {
      setError("Oops! incorrect confirmation code");
      return;
    }

    if (!userData?.email || !userData?.password) {
      setError("User email or password is missing");
      setInputting(false);
      return;
    }

    try {
      setError("");
      setInputting(true);

      // Login User Account to get Current User Object
      const getCurrentUser = await login(userData.email, userData.password);
      // Delete Account in Firebase Authentication
      await deleteAccount(getCurrentUser.user);
      //Delete Profile Image in Supabase
      await deleteProfile(String(userData?.profile));
      //Delete User Data in Firebase Firestore
      await deleteUserData(String(uid));
      //Logout to Change Firebase AuthState
      await logout();
      setShowSuccessModal(true);
    } catch (error: any) {
      console.log("Unable to delete user", error);
    } finally {
      setInputting(false);
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setError("");
    setName("");
  };

  const closeModal = () => {
    setUserData({
      profile: "",
      name: "",
      email: "",
      password: "",
      isAdmin: false,
    });
    router.back();
  };

  return (
    <SafeAreaView className="dark:bg-dark-main flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Wrapper */}
        <View className="flex flex-1 justify-center px-2.5 py-2.5">
          {/* Main Container */}
          <View className="relative flex flex-1 justify-center gap-8 overflow-hidden rounded-md bg-background px-4 py-10">
            <View className="flex items-center gap-2">
              <View className="rounded-full bg-background-alt p-4">
                <MaterialIcons name="delete" color={Colors.danger} size={40} />
              </View>

              <Text className="text-center font-satoshi-bold text-2xl text-light-text">
                {` Are you sure you want to delete ${userData?.name} account?`}
              </Text>
              <Text className="text-center font-satoshi-bold text-danger">
                Once deleted, this account and all its associated data will be
                permanently removed from the pinyaxtract.
              </Text>
            </View>

            <View className="flex gap-2">
              <View className="flex justify-center">
                <TouchableOpacity
                  className="rounded-md bg-danger p-2"
                  onPress={() => setShowModal(true)}
                >
                  <Text className="text-center font-satoshi-bold text-lg text-light-text">
                    Delete Account
                  </Text>
                </TouchableOpacity>
              </View>

              <View className="flex justify-center">
                <TouchableOpacity
                  className="rounded-md bg-background-alt p-2"
                  onPress={() => router.back()}
                >
                  <Text className="text-center font-satoshi-bold text-lg text-light-text">
                    Nevermind
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Modal */}
      <Modal showModal={showModal}>
        <Text className="text-center font-cabinetGrotesk-extrabold text-2xl text-light-text">
          Confirm Account Deletion
        </Text>

        <View>
          <Text className="py-1 font-satoshi-medium text-lg text-light-text">
            To confirm account deletion, enter{" "}
            <Text className="font-satoshi-bold text-danger">{`"${userData?.name?.split(" ")[0].toLowerCase()}"`}</Text>
          </Text>
          <TextInput
            className={`rounded-md border px-2 text-xl text-light-text ${isFocus ? "border-danger" : "border-light-text"}`}
            placeholderTextColor={"#cccccc"}
            placeholder=""
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            value={name}
            onChangeText={(value) => setName(value)}
          />

          {error && (
            <Text className="pt-1.5 font-satoshi-bold text-danger">
              {error}
            </Text>
          )}
        </View>

        <View className="flex gap-2">
          <TouchableOpacity
            className="rounded-md bg-danger p-2"
            disabled={inputting}
            onPress={handleDeleteUser}
          >
            <Text className="text-center font-satoshi-bold text-lg text-light-text">
              {inputting ? "Deleting..." : "Confirm Deletion"}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            className="rounded-md bg-background-alt p-2"
            onPress={handleCancelDelete}
          >
            <Text className="text-center font-satoshi-bold text-lg text-light-text">
              Cancel
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Succesfully Deleted Modal */}
      <Modal showModal={showSuccessModal}>
        <View className="flex items-center gap-4">
          {/* <SVG.Ready width={60} height={60} /> */}

          <View>
            <Text className="text-center font-cabinetGrotesk-bold text-2xl text-light-text">
              Account Deleted
            </Text>
            <Text className="text-center font-satoshi-medium text-lg text-light-text">
              {`${userData?.name?.split(" ")[0]} account has been successfully deleted.`}
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

export default deleteUser;

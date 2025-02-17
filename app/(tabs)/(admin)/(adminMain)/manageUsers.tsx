import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import { Link } from "expo-router";

//Default Profile Image
import ProfileIcon from "@/assets/images/ProfileIcon.png";
//Firebase
import { getAllUserData } from "@/firebase/firestore";
//Types
import { FirestoreUserDataType } from "@/types/FirebaseData";
//Context
import useAuth from "@/context/AuthContext";

import ManageUserSkeleton from "@/components/skeleton/ManageUserSkeleton";

const manageUsers = () => {
  const [allUserData, setAllUserData] = useState<FirestoreUserDataType[]>();

  const { currentUser } = useAuth();
  const currentUserUid = currentUser?.user?.uid;

  const [isFetching, setIsFetching] = useState<boolean>(true);

  //* useEffect to fetch all user data
  useEffect(() => {
    const fetchAllUserData = async () => {
      setIsFetching(true);
      const unsubscribe = await getAllUserData(setAllUserData);
      setIsFetching(false);

      // Cleanup function
      return () => unsubscribe && unsubscribe();
    };

    fetchAllUserData();
  }, []);

  return (
    <>
      {isFetching ? (
        <ManageUserSkeleton />
      ) : (
        <View className="flex-1 bg-main">
          <ScrollView contentContainerClassName="">
            <View className="flex-1">
              {allUserData?.map((user, index) => (
                <View
                  className={`flex flex-row items-center justify-between gap-2 bg-background p-3 ${currentUserUid === user?.uid ? "hidden" : ""}`}
                  key={index}
                >
                  <View className="flex flex-row items-center gap-5">
                    {/* Profile Image */}
                    <View className="h-[60] w-[60]">
                      <Image
                        source={
                          user?.profile ? { uri: user?.profile } : ProfileIcon
                        }
                        className="h-full w-full rounded-full"
                      />
                    </View>
                    <View className="">
                      <Text className="font-satoshi-bold text-lg text-light-text">
                        {user?.name}
                      </Text>
                      <Text className="font-satoshi-regular text-sm text-light-text opacity-80">
                        {user.email}
                      </Text>
                    </View>
                  </View>

                  <View className="flex-row items-center gap-6">
                    <Link href={`/${user?.uid}/editUser`} asChild>
                      <TouchableOpacity>
                        <MaterialIcons
                          name={"edit"}
                          color={Colors.primary}
                          size={30}
                        />
                      </TouchableOpacity>
                    </Link>

                    <Link href={`/${user?.uid}/deleteUser`} asChild>
                      <TouchableOpacity>
                        <MaterialIcons
                          name={"delete"}
                          color={Colors.danger}
                          size={30}
                        />
                      </TouchableOpacity>
                    </Link>
                  </View>
                </View>
              ))}
            </View>
          </ScrollView>

          <Link href="/addUser" asChild>
            <TouchableOpacity className="absolute bottom-2 right-2 rounded-full bg-primary p-2.5">
              <MaterialIcons
                name="person-add"
                size={35}
                color={Colors["dark-text"]}
              />
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </>
  );
};

export default manageUsers;

import {
  SafeAreaView,
  View,
  Text,
  Switch,
  Button,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Pressable,
} from "react-native";
import React, { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SVG from "@/constants/SVG-Contants";
import { Colors } from "@/constants/Colors-Contants";
import useGlobal from "@/context/GlobalContext";

const index = () => {
  const { machineState, setMachineState } = useGlobal();
  const toggleMachineState = () => setMachineState(!machineState);

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="">
        {/* Header */}
        <View className="flex flex-row items-center justify-between rounded-b-3xl bg-background px-3 py-5">
          <View className="flex grow flex-row items-center">
            <SVG.Logo width={55} height={55} />
            <SVG.Wordmark width={130} height={60} />
          </View>

          <View className="border border-transparent">
            <MaterialIcons
              name="notifications"
              size={30}
              color={Colors.primary}
            />
          </View>
        </View>

        {/* Machine Status */}
        <View className="mt-10 px-3">
          <Text className="mb-1 font-satoshi-bold text-xl">Machine Status</Text>
          <View className="flex items-center gap-1 rounded-lg bg-background py-4">
            <SVG.Ready />
            <Text className="border border-transparent font-cabinetGrotesk-bold text-2xl text-light-text">
              Ready to Start
            </Text>
          </View>
        </View>

        {/* Machine Controls */}
        <View className="mb-10 mt-5 px-3">
          <Text className="mb-1 font-satoshi-bold text-xl">
            Machine Controls
          </Text>

          <View className="flex gap-3 rounded-lg bg-background px-5 py-6">
            {/* Machine Switch */}
            <View className="rounded-md bg-background-alt px-4 py-3">
              <Text className="font-satoshi-bold text-lg text-light-text">
                Machine Switch
              </Text>
              <View className="mt-5 flex items-center gap-7">
                <SVG.Gear width={120} height={100} />

                <View className="flex items-center justify-center">
                  <Switch
                    className="scale-[1.4]"
                    trackColor={{
                      false: Colors.primary,
                      true: Colors.secondary,
                    }}
                    thumbColor={
                      machineState ? Colors.primary : Colors.secondary
                    }
                    ios_backgroundColor={
                      machineState ? Colors.primary : Colors.secondary
                    }
                    onValueChange={toggleMachineState}
                    value={machineState}
                  />
                  <Text className="font-satoshi-medium text-xl text-light-text">
                    {machineState ? "Machine On" : "Machine Off"}
                  </Text>
                </View>
              </View>
            </View>

            {/* Extraction Level */}
            <View className="rounded-md bg-background-alt px-4 py-3">
              <Text className="font-satoshi-bold text-lg text-light-text">
                Extraction Level
              </Text>
              <View className="mt-5 flex items-center gap-7">
                <SVG.Compress />

                <View className="flex w-[30%] flex-row items-center justify-center">
                  {/* Minus (-) */}
                  <TouchableOpacity className="flex grow items-center justify-center bg-secondary">
                    <Text className="font-cabinetGrotesk-bold text-3xl text-light-text">
                      -
                    </Text>
                  </TouchableOpacity>

                  {/* Input Number */}
                  <Pressable
                    className="flex grow items-center justify-center bg-primary"
                    onStartShouldSetResponder={() => false}
                  >
                    <TextInput
                      className="m-0 flex h-fit grow items-center border-0 p-0 text-center font-cabinetGrotesk-bold"
                      keyboardType="numeric"
                      value="21"
                      maxLength={3}
                    />
                  </Pressable>

                  {/* Plus (+) */}
                  <TouchableOpacity className="flex grow items-center justify-center bg-secondary">
                    <Text className="font-cabinetGrotesk-bold text-3xl text-light-text">
                      +
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

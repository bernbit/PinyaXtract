import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import InputButton from "@/components/InputButton";
import TripleSwitch from "@/components/TripleSwitch";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SVG from "@/constants/SVG-Constants";
import { Colors } from "@/constants/Colors-Constants";
import useGlobal from "@/context/GlobalContext";

const index = () => {
  const {
    machineState,
    toggleMachineState,
    heaterState,
    setHeaterState,
    fanState,
    toggleFanState,
    extractionLevel,
    setExtractionLevel,
    rollerSpeed,
    setRollerSpeed,
    operationStatus,
    setOperationStatus,
  } = useGlobal();

  return (
    <SafeAreaView className="h-full">
      <ScrollView contentContainerClassName="flex gap-10">
        {/* Header */}
        <View className="flex flex-row items-center justify-between rounded-b-3xl bg-background px-2.5 py-5">
          <View className="flex grow flex-row items-center">
            <SVG.Logo width={55} height={55} />
            <SVG.Wordmark width={130} height={60} />
          </View>

          <View className="">
            <MaterialIcons
              name="notifications"
              size={30}
              color={Colors.primary}
            />
          </View>
        </View>

        <View className="mb-5 flex grow gap-4 px-2.5">
          {/* Machine Status
          <View className="">
            <Text className="mb-1 font-satoshi-bold text-xl">
              Machine Status
            </Text>
            <View className="flex items-center gap-1 rounded-lg bg-background py-4">
              <SVG.Ready />
              <Text className="border border-transparent font-cabinetGrotesk-bold text-2xl text-light-text">
                Ready to Start
              </Text>
            </View>
          </View> */}

          {/* Switches */}
          <View className="">
            <Text className="mb-1 font-satoshi-bold text-xl">Switches</Text>

            <View className="flex gap-3 rounded-lg bg-background px-5 py-6">
              {/* Machine Switch */}
              <View className="rounded-md bg-background-alt px-4 py-3">
                <Text className="font-satoshi-bold text-lg text-light-text">
                  Machine Switch
                </Text>
                <View className="mt-5 flex items-center gap-6">
                  <SVG.Gear width={130} height={100} />

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
                    <Text className="font-cabinetGrotesk-medium text-xl text-light-text">
                      {machineState ? "Machine On" : "Machine Off"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Heater Switch */}
              <View className="rounded-md bg-background-alt px-4 py-3">
                <Text className="font-satoshi-bold text-lg text-light-text">
                  Heater Switch
                </Text>
                <View className="mt-5 flex items-center gap-6">
                  <SVG.Heater width={140} height={140} />

                  <View className="flex items-center justify-center gap-2">
                    <TripleSwitch
                      state={heaterState}
                      setState={setHeaterState}
                    />

                    <Text className="font-cabinetGrotesk-medium text-xl text-light-text">
                      {heaterState === "off" ? "Heater Off" : "Heater On"}
                    </Text>
                  </View>
                </View>
              </View>

              {/* Fan Switch */}
              <View className="rounded-md bg-background-alt px-4 py-3">
                <Text className="font-satoshi-bold text-lg text-light-text">
                  Fan Switch
                </Text>
                <View className="mt-5 flex items-center gap-6">
                  <SVG.Fan width={110} height={110} />

                  <View className="flex items-center justify-center">
                    <Switch
                      className="scale-[1.4]"
                      trackColor={{
                        false: Colors.primary,
                        true: Colors.secondary,
                      }}
                      thumbColor={fanState ? Colors.primary : Colors.secondary}
                      ios_backgroundColor={
                        fanState ? Colors.primary : Colors.secondary
                      }
                      onValueChange={toggleFanState}
                      value={fanState}
                    />
                    <Text className="font-cabinetGrotesk-medium text-xl text-light-text">
                      {fanState ? "Fan On" : "Fan Off"}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>

          {/* Configuration */}
          <View className="">
            <Text className="mb-1 font-satoshi-bold text-xl">
              Configuration
            </Text>

            <View className="flex gap-3 rounded-lg bg-background px-5 py-6">
              {/* Extraction Level */}
              <View className="rounded-md bg-background-alt px-4 py-3">
                <Text
                  className={`font-satoshi-bold text-lg text-light-text ${operationStatus ? "opacity-55" : ""}`}
                >
                  Extraction Level
                </Text>
                <View
                  className={`mt-5 flex items-center gap-6 ${operationStatus ? "opacity-55" : ""}`}
                >
                  <SVG.Compress width={90} height={100} />

                  <InputButton
                    state={extractionLevel}
                    setState={setExtractionLevel}
                    min={1}
                    max={5}
                    defaultVal={1}
                    setValue={0.5}
                  />
                </View>
              </View>

              {/* Roller Level */}
              <View className="rounded-md bg-background-alt px-4 py-3">
                <Text
                  className={`font-satoshi-bold text-lg text-light-text ${operationStatus ? "opacity-55" : ""}`}
                >
                  Roller Speed
                </Text>
                <View
                  className={`mt-5 flex items-center gap-6 ${operationStatus ? "opacity-55" : ""}`}
                >
                  <SVG.Roller width={160} height={80} />

                  <InputButton
                    state={rollerSpeed}
                    setState={setRollerSpeed}
                    min={0}
                    max={255}
                    defaultVal={50}
                    setValue={50}
                  />
                </View>
              </View>

              <TouchableOpacity
                className={`rounded-md p-2 ${operationStatus ? "bg-danger" : "bg-primary"}`}
                onPress={() => {
                  setOperationStatus(!operationStatus);
                }}
              >
                <Text className="text-center font-satoshi-bold text-xl tracking-wide">
                  {operationStatus ? "Pause" : "Start"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

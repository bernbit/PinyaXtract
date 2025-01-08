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
import SVG from "@/constants/SVG-Contants";
import { Colors } from "@/constants/Colors-Contants";
import useGlobal from "@/context/GlobalContext";

const index = () => {
  const {
    machineState,
    toggleMachineState,
    heaterState,
    setHeaterState,
    toggleHeaterState,
    fanState,
    toggleFanState,
    extractionLevel,
    setExtractionLevel,
    handleExtractionLevel,
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
          {/* Machine Status */}
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
          </View>

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
                <Text className="font-satoshi-bold text-lg text-light-text">
                  Extraction Level
                </Text>
                <View className="mt-5 flex items-center gap-6">
                  <SVG.Compress width={90} height={100} />

                  <InputButton
                    state={extractionLevel}
                    setState={setExtractionLevel}
                    handleState={handleExtractionLevel}
                  />
                </View>
              </View>

              {/* Roller Level */}
              <View className="rounded-md bg-background-alt px-4 py-3">
                <Text className="font-satoshi-bold text-lg text-light-text">
                  Roller Speed
                </Text>
                <View className="mt-5 flex items-center gap-6">
                  <SVG.Roller width={160} height={80} />
                  {/* <SVG.Roller width={300} height={200} /> */}

                  <InputButton
                    state={extractionLevel}
                    setState={setExtractionLevel}
                    handleState={handleExtractionLevel}
                  />
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

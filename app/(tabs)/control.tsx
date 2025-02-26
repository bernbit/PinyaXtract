import React from "react";
import { SafeAreaView, View, Text, Switch, ScrollView } from "react-native";
import TripleSwitch from "@/components/TripleSwitch";
import TabHeader from "@/components/TabHeader";
import InputButton from "@/components/InputButton";

import Heater from "@/assets/svg/Heater";
import Fan from "@/assets/svg/Fan";
import Gear from "@/assets/svg/Gear";
import Compress from "@/assets/svg/Compress";
import Roller from "@/assets/svg/Roller";

import { Colors } from "@/constants/Colors-Constants";
import useGlobal from "@/context/GlobalContext";

const index = () => {
  const {
    machineState,
    toggleMachineState,
    heaterState,
    heaterManual,
    toggleHeaterManual,
    fanState,
    toggleFanState,
    extractionLevel,
    setExtractionLevel,
    rollerSpeed,
    setRollerSpeed,
  } = useGlobal();

  return (
    <SafeAreaView className="dark:bg-dark-main flex-1 bg-main">
      <ScrollView contentContainerClassName="flex min-h-full">
        {/* Header */}
        <TabHeader icon={"settings-remote"} title={"Control"} />

        <View className="mb-5 flex flex-1 justify-center gap-2 px-2.5">
          <Text className="font-satoshi-bold text-lg text-dark-text dark:text-light-text">
            Machine Controls
          </Text>
          {/* Machine Switch */}
          <View className="flex flex-1 flex-row items-center justify-center rounded-lg bg-background p-9">
            <Gear width={200} height={120} />

            <View className="flex items-center justify-center">
              <Switch
                className="scale-[1.4]"
                trackColor={{
                  false: Colors.primary,
                  true: Colors.secondary,
                }}
                thumbColor={machineState ? Colors.primary : Colors.secondary}
                ios_backgroundColor={
                  machineState ? Colors.primary : Colors.secondary
                }
                onValueChange={toggleMachineState}
                value={machineState}
              />
              <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                {machineState ? "Machine On" : "Machine Off"}
              </Text>
            </View>
          </View>

          <View className="flex flex-1 flex-row gap-2 rounded-lg">
            {/* Extraction Level */}
            {/* <View className="flex flex-1 justify-center gap-5 rounded-lg bg-background py-9">
              <View className="flex items-center">
                <Compress width={100} height={100} />
              </View>
              <View className="flex items-center justify-end gap-3">
                <InputButton
                  state={extractionLevel}
                  setState={setExtractionLevel}
                  min={1}
                  max={5}
                  defaultVal={1}
                  setValue={0.5}
                  path={"/ExtractionLevel"}
                />
                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  Extraction Level
                </Text>
              </View>
            </View> */}

            {/* Roller Speed */}
            <View className="flex flex-1 justify-center gap-5 rounded-lg bg-background py-9">
              <View className="flex items-center">
                <Roller width={145} height={110} />
              </View>
              <View className="flex items-center justify-end gap-3">
                <InputButton
                  state={rollerSpeed}
                  setState={setRollerSpeed}
                  min={0}
                  max={255}
                  defaultVal={5}
                  setValue={5}
                  path={"/RollerSpeed"}
                />

                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  Roller Speed
                </Text>
              </View>
            </View>
          </View>

          <View className="flex flex-1 flex-row gap-2 rounded-lg">
            {/* Fan Switch */}
            <View className="flex flex-1 justify-center gap-4 rounded-lg bg-background py-9">
              <View className="mt-4 flex items-center">
                <Fan width={100} height={110} />
              </View>
              <View className="flex items-center justify-end">
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
                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  {fanState ? "Fan On" : "Fan Off"}
                </Text>
              </View>
            </View>

            {/* Heater Switch */}
            <View className="flex flex-1 justify-center gap-4 rounded-lg bg-background py-9">
              <View className="absolute right-0 top-1 m-0 flex w-full flex-1 flex-row items-center justify-between px-2">
                <Text className="px-2 font-satoshi-bold text-light-text">
                  {heaterManual ? "Manual" : "Auto"}
                </Text>

                <Switch
                  className="scale-[0.85]"
                  trackColor={{
                    false: Colors.primary,
                    true: Colors.secondary,
                  }}
                  thumbColor={heaterManual ? Colors.primary : Colors.secondary}
                  ios_backgroundColor={
                    heaterManual ? Colors.primary : Colors.secondary
                  }
                  onValueChange={toggleHeaterManual}
                  value={heaterManual}
                />
              </View>

              <View className="mt-4 items-center">
                <Heater width={100} height={110} />
              </View>
              <View className="flex items-center justify-end gap-1.5">
                <TripleSwitch />

                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  {heaterState === "off" ? "Heater Off" : "Heater On"}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

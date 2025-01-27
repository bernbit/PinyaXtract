import React, { useEffect } from "react";
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
import { useFocusEffect } from "@react-navigation/native";

const index = () => {
  const {
    machineState,
    toggleMachineState,
    heaterState,
    setHeaterState,
    heaterManual,
    toggleHeaterManual,
    fanState,
    toggleFanState,
    extractionLevel,
    setExtractionLevel,
    rollerSpeed,
    setRollerSpeed,
    setActiveTab,
  } = useGlobal();

  useFocusEffect(
    React.useCallback(() => {
      setActiveTab("control");
    }, [setActiveTab]),
  );

  return (
    <SafeAreaView className="h-full bg-main">
      <ScrollView contentContainerClassName="flex" removeClippedSubviews={true}>
        {/* Header */}
        <TabHeader icon={"settings-remote"} title={"Control"} />

        <View className="mb-5 flex grow gap-2 px-2.5">
          <Text className="font-satoshi-bold text-lg text-dark-text">
            Machine Controls
          </Text>
          {/* Machine Switch */}
          <View className="flex flex-row items-center justify-center rounded-lg bg-background p-9">
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

          <View className="flex flex-row gap-2 rounded-lg">
            {/* Fan Switch */}
            <View className="flex flex-1 gap-4 rounded-lg bg-background py-9">
              <View className="flex basis-[80%] items-center">
                <Fan width={100} height={120} />
              </View>
              <View className="flex flex-1 items-center justify-end">
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
            <View className="flex flex-1 gap-4 rounded-lg bg-background py-9">
              <View className="flex basis-[80%] items-center">
                <Heater width={100} height={120} />
              </View>
              <View className="flex flex-1 items-center justify-end gap-1.5">
                <TripleSwitch
                  state={heaterState}
                  setState={setHeaterState}
                  disable={heaterManual}
                />

                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  {heaterState === "off" ? "Heater Off" : "Heater On"}
                </Text>
              </View>

              <View className="absolute right-0 top-0 m-0 flex w-full flex-row items-center justify-between px-2">
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
            </View>
          </View>

          <View className="flex flex-row gap-2 rounded-lg">
            {/* Extraction Level */}
            <View className="flex flex-1 gap-5 rounded-lg bg-background py-9">
              <View className="flex basis-[80%] items-center">
                <Compress width={100} height={100} />
              </View>
              <View className="flex flex-1 items-center justify-end gap-3">
                <InputButton
                  state={extractionLevel}
                  setState={setExtractionLevel}
                  min={1}
                  max={5}
                  defaultVal={1}
                  setValue={0.5}
                />
                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  Extraction Level
                </Text>
              </View>
            </View>

            {/* Roller Speed */}
            <View className="flex flex-1 gap-5 rounded-lg bg-background py-9">
              <View className="flex basis-[80%] items-center">
                <Roller width={145} height={110} />
              </View>
              <View className="flex flex-1 items-center justify-end gap-3">
                <InputButton
                  state={rollerSpeed}
                  setState={setRollerSpeed}
                  min={0}
                  max={255}
                  defaultVal={5}
                  setValue={5}
                />

                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  Roller Speed
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

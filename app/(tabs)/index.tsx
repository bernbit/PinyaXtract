import React from "react";
import { SafeAreaView, View, Text, Switch, ScrollView } from "react-native";
import TripleSwitch from "@/components/TripleSwitch";
import TabHeader from "@/components/TabHeader";
import ItemBox from "@/components/ItemBox";
import InnerBox from "@/components/InnerBox";

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
  } = useGlobal();

  return (
    <SafeAreaView className="bg-main h-full">
      <ScrollView contentContainerClassName="flex gap-5">
        {/* Header */}
        <TabHeader icon={"settings-remote"} title={"Control"} />

        <View className="mb-5 flex grow gap-4 px-2.5">
          {/* Switches */}
          <ItemBox title={"Switches"}>
            <View className="flex gap-3">
              {/* Machine Switch */}
              <InnerBox title="Machine Switch">
                <View className="flex items-center gap-6">
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
              </InnerBox>

              {/* Heater Switch */}
              <InnerBox title="Heater Switch">
                <View className="flex items-center gap-6">
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
              </InnerBox>

              {/* Fan Switch */}
              <InnerBox title="Fan Switch">
                <View className="flex items-center gap-6">
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
              </InnerBox>
            </View>
          </ItemBox>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default index;

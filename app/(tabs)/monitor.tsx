import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import TabHeader from "@/components/TabHeader";
import SVG from "@/constants/SVG-Constants";
import useGlobal from "@/context/GlobalContext";

const monitor = () => {
  const { machineState, tempValue, weightValue } = useGlobal();

  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="flex min-h-full">
        {/* Header */}
        <TabHeader icon={"view-timeline"} title={"Monitor"} />

        <View className="mb-5 flex flex-1 justify-center gap-2 px-2.5">
          {/* Machine Status */}
          <Text className="font-satoshi-bold text-lg">Machine Status</Text>
          <View className="flex items-center justify-center gap-2 rounded-lg bg-background p-8">
            {machineState ? (
              <SVG.Extract width={45} height={45} />
            ) : (
              <SVG.Ready width={45} height={45} />
            )}

            <Text className="border border-transparent font-satoshi-bold text-2xl text-light-text">
              {machineState ? "Extracting" : "Ready to Start"}
            </Text>
          </View>

          {/* Machine Condition */}
          <Text className="font-satoshi-bold text-lg">Sensor Reading</Text>
          <View className="flex flex-1 gap-4 rounded-lg bg-background py-9">
            <View className="flex basis-[80%] items-center">
              <SVG.Condition width={125} height={105} />
            </View>

            <View className="flex flex-1 items-center justify-end">
              <Text className="font-satoshi-bold text-2xl text-light-text">
                {tempValue >= 70 ? "Overheating" : "Normal"}
              </Text>
              <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                Machine Condition
              </Text>
            </View>
          </View>

          {/* Sensor Reading */}
          <View className="flex flex-row gap-2">
            {/* Temperature */}
            <View className="flex flex-1 gap-4 rounded-lg bg-background py-9">
              <View className="flex basis-[80%] items-center">
                <SVG.TempMeter width={125} height={170} />
              </View>
              <View className="flex flex-1 items-center justify-end">
                <Text className="font-satoshi-bold text-2xl text-light-text">
                  {tempValue}°C
                </Text>
                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  Temperature
                </Text>
              </View>
            </View>

            {/* Fiber Weight */}
            <View className="flex flex-1 gap-4 rounded-lg bg-background py-9">
              <View className="flex basis-[80%] items-center">
                <SVG.WeightMeter width={125} height={170} />
              </View>
              <View className="flex flex-1 items-center justify-end">
                <Text className="font-satoshi-bold text-2xl text-light-text">
                  {weightValue}
                  <Text className="text-lg">kg</Text>
                </Text>
                <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                  Fiber Weight
                </Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default monitor;

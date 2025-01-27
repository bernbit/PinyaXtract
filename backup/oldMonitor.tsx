import React, { useState } from "react";
import { SafeAreaView, View, Text, ScrollView } from "react-native";
import TabHeader from "@/components/TabHeader";
import SVG from "@/constants/SVG-Constants";
import ItemBox from "@/components/ItemBox";
import InnerBox from "@/components/InnerBox";
import useGlobal from "@/context/GlobalContext";

const monitor = () => {
  const { weightValue, tempValue } = useGlobal();

  return (
    <SafeAreaView className="h-full bg-main">
      <ScrollView contentContainerClassName="flex gap-5">
        <TabHeader icon={"view-timeline"} title={"Monitor"} />

        <View className="mb-5 flex grow gap-4 px-2.5">
          {/* Machine Condition */}
          <ItemBox title={"Machine Condition"}>
            <View className="flex items-center gap-2 rounded-md bg-background-alt p-4">
              {/* Machine Switch */}
              <View className="flex items-center rounded-md bg-background-alt px-4 py-3">
                <SVG.Condition width={120} height={120} />

                <Text className="text-center font-satoshi-bold text-xl text-light-text">
                  {tempValue >= 70 ? "OverHeating" : "Stable"}
                </Text>
              </View>
            </View>
          </ItemBox>

          {/* Sensor Reading */}
          <ItemBox title={"Sensor Reading"}>
            <View className="flex gap-3">
              {/* Temperature */}
              <InnerBox title="Temperature">
                <View className="flex items-center gap-6">
                  <SVG.TempMeter width={140} height={80} />

                  <View className="flex flex-row justify-center">
                    <Text className="text-center font-cabinetGrotesk-bold text-3xl text-light-text">
                      {tempValue}
                    </Text>
                    <Text className="text-center font-cabinetGrotesk-bold text-xl text-light-text">
                      °C
                    </Text>
                  </View>
                </View>
              </InnerBox>

              {/* Temperature */}
              <InnerBox title="Fiber Weight">
                <View className="flex items-center gap-5">
                  <SVG.WeightMeter width={140} height={140} />

                  <View className="flex items-center justify-center">
                    <Text className="text-center font-cabinetGrotesk-bold text-3xl text-light-text">
                      {weightValue}
                      <Text className="text-xl">kg</Text>
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

export default monitor;

import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Switch,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import TabHeader from "@/components/TabHeader";
import InputButton from "@/components/InputButton";
import ItemBox from "@/components/ItemBox";
import InnerBox from "@/components/InnerBox";
import SVG from "@/constants/SVG-Constants";

import useGlobal from "@/context/GlobalContext";

const config = () => {
  const {
    extractionLevel,
    setExtractionLevel,
    rollerSpeed,
    setRollerSpeed,
    operationStatus,
    setOperationStatus,
  } = useGlobal();

  return (
    <SafeAreaView className="bg-main h-full">
      <ScrollView contentContainerClassName="flex gap-5">
        <TabHeader icon={"tune"} title={"Config"} />

        <View className="mb-5 flex grow gap-4 px-2.5">
          {/* Machine Status */}
          <ItemBox title="Machine Status">
            <View className="flex items-center gap-2 rounded-md bg-background-alt p-4">
              {!operationStatus ? (
                <SVG.Ready width={40} height={40} />
              ) : (
                <SVG.Extract width={40} height={40} />
              )}

              <Text className="border border-transparent font-cabinetGrotesk-bold text-2xl text-light-text">
                {`${!operationStatus ? "Ready to Start" : "Extracting"}`}
              </Text>
            </View>
          </ItemBox>

          {/* Configuration */}
          <ItemBox title="Configuration">
            <View className="flex gap-3">
              {/* Extraction Level */}
              <InnerBox title="Extraction Level">
                <View
                  className={`flex items-center gap-6 ${operationStatus ? "opacity-55" : ""}`}
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
              </InnerBox>

              {/* Roller Level */}
              <InnerBox title="Roller Speed">
                <View
                  className={`flex items-center gap-6 ${operationStatus ? "opacity-55" : ""}`}
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
              </InnerBox>

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
          </ItemBox>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default config;

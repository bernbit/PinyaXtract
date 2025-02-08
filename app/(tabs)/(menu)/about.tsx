import React from "react";
import { SafeAreaView, ScrollView, View, Text } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import SVG from "@/constants/SVG-Constants";

const about = () => {
  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Wrapper */}
        <View className="flex flex-1 justify-center px-2.5 py-3">
          {/* Main Container */}
          <View className="flex flex-1 justify-center gap-8 rounded-md bg-background px-4 py-8">
            <View className="flex items-center gap-2">
              <SVG.Logo width={110} height={110} />
              <SVG.Wordmark />
              <Text className="font-cabinetGrotesk-medium text-lg text-light-text">
                An loT Based Pineapple Leaf Fiber Extractor{" "}
              </Text>
            </View>
            <View className="flex flex-1 gap-4">
              <Text className="text-justify font-satoshi-regular text-light-text">
                PINYAXTRACT is an advanced, IoT-powered Pineapple Leaf Fiber
                Extractor Machine designed to streamline the fiber extraction
                process with precision and efficiency. Combining automation with
                smart connectivity, it transforms traditional methods into a
                seamless, data-driven operation.
              </Text>

              {/* Features */}
              <View className="flex gap-2">
                <Text className="font-cabinetGrotesk-bold text-2xl text-light-text">
                  Key Features
                </Text>

                <View className="flex flex-row justify-center gap-2">
                  <MaterialIcons
                    name="check-circle"
                    color={Colors.primary}
                    size={25}
                  />

                  <Text className="flex-1 text-justify font-satoshi-regular text-light-text">
                    <Text className="font-satoshi-bold">
                      Automated Extraction Unit
                    </Text>{" "}
                    - Equipped with mechanical scraping and pressing components,
                    ensuring maximum fiber yield with minimal waste.
                  </Text>
                </View>

                <View className="flex flex-row justify-center gap-2">
                  <MaterialIcons
                    name="check-circle"
                    color={Colors.primary}
                    size={25}
                  />

                  <Text className="flex-1 text-justify font-satoshi-regular text-light-text">
                    <Text className="font-satoshi-bold">
                      IoT-Enabled Monitoring & Control
                    </Text>{" "}
                    - Integrated smart sensors allow real-time tracking and
                    remote management of the entire extraction process.
                  </Text>
                </View>

                <View className="flex flex-row justify-center gap-2">
                  <MaterialIcons
                    name="check-circle"
                    color={Colors.primary}
                    size={25}
                  />

                  <Text className="flex-1 text-justify font-satoshi-regular text-light-text">
                    <Text className="font-satoshi-bold">
                      Data-Driven Insights
                    </Text>{" "}
                    - Advanced data analytics provide real-time performance
                    metrics, optimizing efficiency and productivity.
                  </Text>
                </View>

                <View className="flex flex-row justify-center gap-2">
                  <MaterialIcons
                    name="check-circle"
                    color={Colors.primary}
                    size={25}
                  />

                  <Text className="flex-1 text-justify font-satoshi-regular text-light-text">
                    <Text className="font-satoshi-bold">
                      User-Friendly Mobile App
                    </Text>{" "}
                    - Intuitive interface for seamless operation management,
                    accessible from anywhere.
                  </Text>
                </View>

                <View className="flex flex-row justify-center gap-2">
                  <MaterialIcons
                    name="check-circle"
                    color={Colors.primary}
                    size={25}
                  />

                  <Text className="flex-1 text-justify font-satoshi-regular text-light-text">
                    <Text className="font-satoshi-bold">
                      Scalable & Modular Design
                    </Text>{" "}
                    - Adaptable to various production capacities, making it
                    ideal for both small-scale and industrial applications.
                  </Text>
                </View>
              </View>

              <Text className="text-justify font-satoshi-regular text-light-text">
                By harnessing IoT technology, PINYAXTRACT enhances fiber
                quality, reduces manual labor, and improves overall efficiency,
                making it a game-changer in the textile and composite material
                industries.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default about;

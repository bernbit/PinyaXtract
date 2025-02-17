import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import TabHeader from "@/components/TabHeader";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const MenuSkeleton = () => {
  const skeletonCount = 5;
  const generalOptions = Array.from({ length: skeletonCount });

  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animate opacity when the component mounts
    opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true);
  }, []);

  const animate_pulse = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <SafeAreaView className="flex-1 bg-main">
      <ScrollView contentContainerClassName="min-h-full">
        {/* Header */}
        <TabHeader icon={"menu"} title={"Menu"} />

        <View className="flex flex-1 gap-2 px-2.5">
          {/* Header */}
          <View className="flex flex-row items-center gap-4 rounded-md bg-background px-3 py-3">
            {/* Profile Image */}
            <Animated.View
              className="h-[60] w-[60] rounded-full bg-gray-400"
              style={[animate_pulse]}
            />
            {/* Profile Label */}
            <View className="flex flex-1 items-start gap-1.5">
              <Animated.View
                className="h-6 w-[95%] bg-gray-400"
                style={[animate_pulse]}
              />
              <Animated.View
                className="h-4 w-[95%] bg-gray-400"
                style={[animate_pulse]}
              />
            </View>
          </View>
          {/* General */}
          <View className="flex flex-1 gap-8 rounded-md bg-background px-3 py-5">
            <Animated.View
              className="h-5 w-[45%] bg-gray-400"
              style={[animate_pulse]}
            />

            {generalOptions.map((option, index) => {
              return (
                <View className="flex flex-row items-center gap-4" key={index}>
                  <View
                    className="flex h-[35] w-[35] items-center justify-center rounded-full bg-gray-400"
                    style={[animate_pulse]}
                  />

                  <View className="flex-1 gap-2">
                    <Animated.View
                      className="h-[20] w-full bg-gray-400"
                      style={[animate_pulse]}
                    />
                    <Animated.View
                      className="h-[7] w-full bg-gray-400"
                      style={[animate_pulse]}
                    />
                  </View>

                  <View
                    className="h-[35] w-[35] bg-gray-400"
                    style={[animate_pulse]}
                  />
                </View>
              );
            })}
          </View>

          {/* Preferences */}
          <View className="flex flex-1 gap-6 rounded-md bg-background px-3 py-5">
            <View className="h-5 w-[45%] bg-gray-400" />
            <View className="flex flex-row items-center gap-4">
              <View className="flex h-[35] w-[35] items-center justify-center rounded-full bg-gray-400" />

              <View className="flex-1 gap-2">
                <View className="h-[20] w-full bg-gray-400" />
                <View className="h-[7] w-full bg-gray-400" />
              </View>

              <View className="h-[35] w-[35] bg-gray-400" />
            </View>
            <View className="flex flex-row items-center gap-4">
              <View className="flex h-[35] w-[35] items-center justify-center rounded-full bg-gray-400" />

              <View className="flex-1 gap-2">
                <View className="h-[20] w-full bg-gray-400" />
                <View className="h-[7] w-full bg-gray-400" />
              </View>

              <View className="h-[35] w-[35] bg-gray-400" />
            </View>
          </View>

          {/* Logout Button */}
          <View className="flex flex-1">
            <View className="h-[38.857] rounded-md bg-background p-4">
              <View className="h-full w-full bg-gray-400"></View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MenuSkeleton;

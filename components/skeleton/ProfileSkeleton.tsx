import React, { useEffect } from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const ProfileSkeleton = () => {
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
        {/* Wrapper */}
        <View className="flex flex-1 justify-center px-2.5 py-2.5">
          {/* Main Container */}
          <View className="flex flex-1 justify-center gap-20 rounded-md bg-background px-4 py-10">
            <View className="flex items-center gap-2">
              {/* Profile Image */}
              <Animated.View
                className="relative h-[125] w-[125] rounded-full bg-gray-300"
                style={[animate_pulse]}
              >
                <Animated.View
                  className="absolute bottom-0 right-0 h-[32] w-[32] rounded-full bg-gray-300 p-2"
                  style={[animate_pulse]}
                />
              </Animated.View>
              {/* Profile Label */}
              <Animated.View
                className="h-6 w-40 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
              <Animated.View
                className="mt-1 h-6 w-32 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
            </View>

            <View className="flex justify-center gap-2">
              <Animated.View
                className="my-2 h-12 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
              <Animated.View
                className="my-2 h-12 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
              <Animated.View
                className="my-2 h-12 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
              <Animated.View
                className="my-2 h-12 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
              <Animated.View
                className="mt-4 h-12 rounded-md bg-gray-300"
                style={[animate_pulse]}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProfileSkeleton;

import React, { useEffect } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

// Get device screen height
const { height: screenHeight } = Dimensions.get("window");

const ManageUserSkeleton = () => {
  const skeletonItemHeight = 80.76; // Approximate height of each skeleton item
  const skeletonCount = Math.floor(screenHeight / skeletonItemHeight); // Dynamically calculate skeletons needed
  const allUserData = Array.from({ length: skeletonCount });

  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animate opacity when the component mounts
    opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true);
  }, []);

  const animate_pulse = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 bg-main">
      <ScrollView contentContainerClassName="">
        <View className="flex flex-1 gap-1">
          {allUserData?.map((user, index) => (
            <Animated.View
              className={`flex flex-1 flex-row items-center justify-between gap-2 rounded-md bg-gray-300 p-3`}
              key={index}
              style={[animate_pulse]}
            >
              {/* Profile Image */}
              <Animated.View
                className="h-[60] w-[60] rounded-full bg-gray-400"
                style={[animate_pulse]}
              />

              {/*Name and Email */}
              <Animated.View
                className="h-[30] flex-1 bg-gray-400 font-satoshi-bold text-lg text-light-text"
                style={[animate_pulse]}
              />

              {/*Edit and Delete Button */}
              <View className="flex flex-row gap-2">
                <Animated.View
                  className="h-[30] w-[30] bg-gray-400"
                  style={[animate_pulse]}
                />
                <Animated.View
                  className="h-[30] w-[30] bg-gray-400"
                  style={[animate_pulse]}
                />
              </View>
            </Animated.View>
          ))}
        </View>
      </ScrollView>

      <Animated.View
        className="absolute bottom-2 right-2 h-[65] w-[65] rounded-full bg-gray-400 p-2.5"
        style={[animate_pulse]}
      />
    </View>
  );
};

export default ManageUserSkeleton;

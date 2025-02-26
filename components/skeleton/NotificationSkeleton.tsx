import React, { useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SectionList,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

const NotificationSkeleton = () => {
  const skeletonArray = Array(8).fill(null);

  const opacity = useSharedValue(1);

  useEffect(() => {
    // Animate opacity when the component mounts
    opacity.value = withRepeat(withTiming(0.5, { duration: 500 }), -1, true);
  }, []);

  const animate_pulse = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));
  return (
    <View className="flex">
      <View className="h-[2px] w-[30] flex-1 bg-gray-400" />

      {skeletonArray.map((_, index) => (
        <Animated.View
          key={index}
          className="bg-gray-300 py-3"
          style={[animate_pulse]}
        >
          <View className="flex flex-row items-start justify-center gap-4 p-3 px-2.5">
            <Animated.View
              className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-gray-400"
              style={[animate_pulse]}
            />
            <View className="flex-1">
              <Animated.View
                className="my-1 w-[40px] bg-gray-400"
                style={[animate_pulse]}
              />
              <Animated.View
                className="my-1 flex-1 bg-gray-400"
                style={[animate_pulse]}
              />
              <Animated.View
                className="my-1 flex-1 bg-gray-400"
                style={[animate_pulse]}
              />
              <Animated.View
                className="h-[10px] w-[30px] flex-1 bg-gray-400"
                style={[animate_pulse]}
              />
            </View>
          </View>
        </Animated.View>
      ))}
    </View>
  );
};

export default NotificationSkeleton;

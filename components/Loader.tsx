import React, { useEffect } from "react";
import { View, Text } from "react-native";
import SVG from "@/constants/SVG-Constants";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withRepeat,
} from "react-native-reanimated";

const Loader = () => {
  const opacity = useSharedValue(0);

  useEffect(() => {
    opacity.value = withRepeat(withTiming(1, { duration: 1000 }), -1, true);
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  return (
    <View className="flex-1 items-center justify-center bg-background">
      <Animated.View
        style={animatedStyle}
        className={"items-center justify-end gap-2"}
      >
        <SVG.Logo width={200} height={120} />
        <View className="flex items-center justify-center">
          <SVG.Wordmark />
          <Text className="font-cabinetGrotesk-medium text-lg text-light-text opacity-80">
            An loT Based Pineapple Leaf Fiber Extractor{" "}
          </Text>
        </View>
      </Animated.View>
    </View>
  );
};

export default Loader;

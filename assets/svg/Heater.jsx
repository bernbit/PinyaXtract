import React, { useEffect } from "react";
import Svg, { G, Path, Ellipse, Defs, ClipPath, Rect } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
  cancelAnimation,
} from "react-native-reanimated";
import useGlobal from "@/context/GlobalContext";
import { useIsFocused } from "@react-navigation/native";

const Heater = ({ width = 291, height = 215 }) => {
  const { heaterState, setHeaterState, toggleHeaterState, heaterManual } =
    useGlobal();
  const isFocused = useIsFocused();

  const heaterRotation = useSharedValue(0);
  const Heater = Animated.createAnimatedComponent(Path);

  // Update animation based on heaterState

  //* useEffect for Animation
  useEffect(() => {
    if (!isFocused) {
      // Stop the animation if the screen is not focused
      heaterRotation.value = withTiming(0, { duration: 500 });
      return;
    }
    if (heaterState === "off" && heaterRotation.value === 0) return;

    const animationSpeed = heaterState === "low" ? 1300 : 1000;

    if (heaterState !== "off") {
      heaterRotation.value = 0;
      heaterRotation.value = withRepeat(
        withTiming(360, { duration: animationSpeed, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      heaterRotation.value = withTiming(0, { duration: 500 });
    }
  }, [heaterState, isFocused]);

  //* Functions
  const heaterAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 107.442 }, // Move pivot point to the origin
      { translateY: 107.96 },
      { rotate: `${heaterRotation.value}deg` }, // Rotate the gear
      { translateX: -107.442 }, // Move pivot point back to its original position
      { translateY: -107.96 },
    ],
  }));

  return (
    <Svg
      width={width}
      height={height}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 222 215"
      onPress={toggleHeaterState}
      onLongPress={() => setHeaterState("off")}
      pointerEvents={`${!heaterManual ? "none" : "auto"}`}
    >
      <G clipPath="url(#a)">
        <Path
          d="M214.9 215H7c-3.9 0-7.1-4.6-7.1-10.3V11C0 5.4 3.2.8 7.1.8H215c3.9 0 7.1 4.6 7.1 10.3v193.6c0 5.7-3.2 10.3-7.1 10.3z"
          fill="#30F353"
        />
        <Path
          d="M214.9.8h-2.4V184c0 9.5-5.4 17.2-12 17.2H0v3.5c0 5.7 3.2 10.3 7.1 10.3H215c3.9 0 7.1-4.6 7.1-10.3V11c0-5.7-3.2-10.3-7.1-10.3z"
          fill="#26C242"
        />
        <Ellipse cx={107.1} cy={107.6} rx={86.3} ry={86} fill="#2B2B2B" />

        <Heater
          animatedProps={heaterAnimation}
          transform="rotate(0, 107.442, 107.960)"
          d="M121.4 23.5c-3.7-.7-7.5-1-11.3-1.1 9 24.7 8 51.5-3.1 75.2a108.5 108.5 0 00-66-44c-2.4 2.9-4.6 6-6.7 9.2 26 4.5 48.8 19 64 40.4A108.3 108.3 0 0027 138c1.4 3.6 3 7 4.7 10.3a98 98 0 0167-34.9 107.5 107.5 0 00-5.2 79c3.7.6 7.5 1 11.3 1a97.4 97.4 0 013.1-75.2 108.5 108.5 0 0066 44c2.4-2.9 4.6-6 6.6-9.2-26-4.5-48.7-19-63.8-40.4a108.3 108.3 0 0071.2-34.9c-1.4-3.5-3-7-4.7-10.3a98 98 0 01-67 34.9 107.5 107.5 0 005.2-79z"
          fill="#FFFDFD"
        />
        <Path
          d="M107.4 177.4A69.6 69.6 0 0137.8 108a69.6 69.6 0 01139.3 0 69.6 69.6 0 01-69.7 69.4zm0-128.5a59.2 59.2 0 00-59.2 59 59.2 59.2 0 00118.5 0c0-32.5-26.6-59-59.3-59z"
          fill="#26C242"
        />
        <Path
          d="M107.4 156a48.1 48.1 0 01-48.1-48 48.1 48.1 0 0196.3 0c0 26.4-21.6 48-48.2 48zm0-85.7A37.8 37.8 0 0069.7 108a37.8 37.8 0 0075.5 0c0-20.8-17-37.7-37.8-37.7z"
          fill="#26C242"
        />
        <Path
          d="M107.4 129.4a21.4 21.4 0 10.1-43 21.4 21.4 0 000 43z"
          fill="#26C242"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h222v215H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};

export default React.memo(Heater);

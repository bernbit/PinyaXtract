import React, { useEffect } from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  Easing,
} from "react-native-reanimated";
import useGlobal from "@/context/GlobalContext";
//Types
import { SVGPropsType } from "@/types/SVG";

//! ⚠️ IMPORTANT: Define Animated.createAnimatedComponent(SVGElement) OUTSIDE the Main!
//! If defined inside, it will be re-created on every re-render, causing animations to reset.
const GearWheel = React.memo(Animated.createAnimatedComponent(Path));

const Gear = ({ width = 273, height = 213 }: SVGPropsType) => {
  const { machineState, toggleMachineState } = useGlobal();

  const gearRotation = useSharedValue<number>(0);

  //* useEffect for Gear Animation
  useEffect(() => {
    if (machineState) {
      gearRotation.value = 0; // Reset rotation
      gearRotation.value = withRepeat(
        withTiming(360, { duration: 1300, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      gearRotation.value = withTiming(0, { duration: 200 });
    }
  }, [machineState]);

  const gearOneAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 138.405 },
      { translateY: 148.238 },
      { rotate: `${gearRotation.value}deg` },
      { translateX: -138.405 },
      { translateY: -148.238 },
    ],
  }));

  const gearTwoAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 59.31 },
      { translateY: 59.43 },
      { rotate: `${gearRotation.value}deg` },
      { translateX: -59.31 },
      { translateY: -59.43 },
    ],
  }));

  const gearThreeAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 213.629 },
      { translateY: 59.446 },
      { rotate: `${gearRotation.value}deg` },
      { translateX: -213.629 },
      { translateY: -59.446 },
    ],
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 273 213"
      fill="none"
      onPress={toggleMachineState}
    >
      <G clipPath="url(#a)">
        <GearWheel
          animatedProps={gearOneAnimation}
          transform="rotate(0, 138.405, 148.238)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M199.4 155.91c1.88-.24 3.27-1.66 3.26-3.53l-.06-9.61c-.01-1.76-1.43-3.16-3.3-3.38l-8.9-1.1a55.85 55.85 0 00-2.4-8.66l7.1-5.44a3.84 3.84 0 001.5-2.94c0-.58-.13-1.17-.48-1.75l-4.86-8.29c-.82-1.52-2.7-2.1-4.45-1.38l-8.29 3.7a55.8 55.8 0 00-6.48-6.4l3.58-8.35c.1-.47.22-.94.22-1.53 0-1.17-.6-2.33-1.66-2.91l-8.34-4.75c-1.65-.93-3.52-.45-4.68 1.09l-5.33 7.18a55.65 55.65 0 00-8.68-2.29l-1.23-8.9c-.24-1.87-1.66-3.26-3.41-3.25l-9.6.06c-1.87.02-3.27 1.43-3.49 3.3l-1 8.92c-3.03.6-5.95 1.33-8.75 2.4l-5.44-7.1c-1.18-1.52-3.05-1.98-4.57-1.03l-8.27 4.86a3.22 3.22 0 00-1.74 2.94c0 .59.12 1.05.36 1.52l3.57 8.3a55.8 55.8 0 00-6.4 6.48l-8.33-3.57a3.54 3.54 0 00-4.44 1.43l-4.74 8.35a3.3 3.3 0 00-.46 1.76c.01 1.06.6 2.23 1.55 2.92l7.17 5.34a55.81 55.81 0 00-2.28 8.69l-8.89 1.23c-1.87.25-3.15 1.66-3.13 3.42l.06 9.6a3.46 3.46 0 003.18 3.5l8.9 1c.61 3.04 1.33 5.96 2.4 8.77l-7.1 5.44a3.66 3.66 0 00-1.5 2.93c0 .59.13 1.18.48 1.64l4.85 8.29a3.31 3.31 0 004.46 1.37l8.29-3.57c2 2.33 4.12 4.43 6.48 6.4l-3.46 8.34c-.23.47-.34.94-.34 1.41.01 1.3.6 2.46 1.78 3.04l8.34 4.74c1.53.93 3.4.45 4.56-1.08l5.33-7.18c2.82.91 5.75 1.71 8.8 2.28l1.1 8.9a3.46 3.46 0 003.54 3.14l9.6-.07c1.75-.01 3.15-1.3 3.37-3.19l1.11-8.9c2.92-.61 5.84-1.45 8.64-2.4l5.44 7.1c1.18 1.52 3.05 1.97 4.69 1.02l8.27-4.85a3.4 3.4 0 001.62-3.06c0-.47-.12-.94-.24-1.4l-3.69-8.3a55.8 55.8 0 006.4-6.49l8.33 3.46c1.76.8 3.63.21 4.44-1.44l4.74-8.35c.35-.47.46-1.05.46-1.64-.01-1.17-.6-2.22-1.55-2.92l-7.17-5.34a53.94 53.94 0 002.28-8.8l8.89-1.12zm-61 30.76c21.19-.14 38.4-17.6 38.25-38.92a38.63 38.63 0 00-38.77-38.29 38.66 38.66 0 00-38.36 38.8 38.68 38.68 0 0038.89 38.41z"
          fill="#30F353"
        />
        <Path
          d="M104.2 148.24a33.98 33.98 0 0034.17 33.75c18.61-.13 33.72-15.47 33.6-34.21a33.93 33.93 0 00-34.06-33.63 33.96 33.96 0 00-33.7 34.09z"
          fill="#2B2B2B"
        />
        <GearWheel
          animatedProps={gearTwoAnimation}
          transform="rotate(0, 59.31, 59.43)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M53.85 13.8c-.66-1.51-2.36-2.39-3.82-1.98l-6.9 1.88c-1.57.44-2.47 2.02-2.27 3.66l.85 6.2c-1.72.84-3.4 1.79-5.02 2.96l-4.91-3.75a3.13 3.13 0 00-2.97-.65c-.45.13-.98.4-1.34.86l-4.95 5a3.19 3.19 0 00-.16 4.29l3.77 4.91a67.7 67.7 0 00-2.87 5.04l-6.15-.74c-.51-.1-1-.1-1.45.03a3.1 3.1 0 00-2.16 2.3l-1.78 6.8a3.19 3.19 0 002.01 3.81l5.73 2.32c-.18 2-.14 3.92.02 5.82L13.71 65a3.17 3.17 0 00-1.88 3.8l1.89 6.89a3.17 3.17 0 003.54 2.3l6.18-.96a31.85 31.85 0 002.98 5.14l-3.76 4.9a3.02 3.02 0 00.18 4.21l5.03 5.06a3.24 3.24 0 003 .76c.45-.13.9-.25 1.29-.6l4.88-3.89a46.63 46.63 0 005.07 2.98l-.75 6.16a3 3 0 002.3 3.5l6.83 1.9c.51.1 1.1.05 1.56-.07 1.01-.28 1.9-1 2.26-1.95l2.28-5.85c2 .18 3.92.14 5.82-.02l2.43 5.77c.69 1.64 2.24 2.42 3.82 2l6.9-1.9a3.26 3.26 0 002.27-3.66l-.96-6.17a51.15 51.15 0 005.16-2.87l4.8 3.79a3.5 3.5 0 004.31-.21l5.06-5.03a3.19 3.19 0 00.16-4.3l-3.89-4.88a35.85 35.85 0 002.96-5.18l6.07.89c.51.1.96-.03 1.41-.15 1.13-.3 2-1.15 2.2-2.18l1.86-6.95a3.13 3.13 0 00-1.98-3.7l-5.85-2.29c.19-1.99.14-3.92-.04-5.93l5.8-2.32c1.52-.66 2.42-2.24 1.98-3.82l-1.88-6.9c-.43-1.58-2.01-2.48-3.66-2.27l-6.2.85a33.4 33.4 0 00-2.95-5.02l3.87-4.95c.96-1.36.95-3.17-.21-4.31l-5.11-4.92a2.85 2.85 0 00-3.03-.87c-.45.13-.87.36-1.26.71l-4.92 3.78a33.84 33.84 0 00-5.03-2.87l.86-6.19a3.19 3.19 0 00-2.33-3.61l-6.91-1.75a2.35 2.35 0 00-1.6-.05c-1 .28-1.79.98-2.22 2.07l-2.2 5.7c-2-.18-4.04-.1-5.94.05l-2.31-5.8zM87.4 51.74A29.22 29.22 0 0051.59 31.3a29.25 29.25 0 00-20.42 35.83 29.15 29.15 0 1056.24-15.4z"
          fill="#30F353"
        />
        <Path
          d="M65.75 83.04a24.4 24.4 0 0017.14-30.08 24.45 24.45 0 00-30.06-17.14 24.55 24.55 0 00-17.14 30.07 24.45 24.45 0 0030.06 17.15z"
          fill="#2B2B2B"
        />
        <GearWheel
          animatedProps={gearThreeAnimation}
          transform="rotate(0, 213.629, 59.446)"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M208.16 13.82c-.66-1.52-2.35-2.39-3.82-1.99l-6.9 1.89c-1.57.43-2.47 2.02-2.27 3.66l.85 6.2c-1.71.84-3.4 1.78-5.02 2.96l-4.91-3.76a3.13 3.13 0 00-2.97-.64c-.45.12-.98.39-1.34.85l-4.95 5a3.19 3.19 0 00-.16 4.3l3.77 4.91a67.5 67.5 0 00-2.87 5.04l-6.15-.75c-.51-.1-1-.09-1.45.03a3.1 3.1 0 00-2.16 2.3l-1.78 6.8a3.18 3.18 0 002.01 3.82l5.74 2.31c-.19 2-.15 3.93.01 5.83L168.02 65a3.17 3.17 0 00-1.87 3.8l1.88 6.88a3.17 3.17 0 003.54 2.31l6.18-.96a31.84 31.84 0 002.98 5.13l-3.76 4.92a3.02 3.02 0 00.18 4.2l5.03 5.06a3.24 3.24 0 003 .75c.45-.12.9-.25 1.29-.6l4.88-3.88a46.63 46.63 0 005.07 2.98l-.74 6.16a3 3 0 002.29 3.5l6.83 1.89c.51.1 1.1.06 1.56-.07 1.01-.27 1.9-1 2.26-1.95l2.28-5.85c2 .19 3.92.14 5.82-.01l2.43 5.77c.7 1.63 2.24 2.42 3.82 1.99l6.9-1.89a3.26 3.26 0 002.27-3.66l-.96-6.17a51.27 51.27 0 005.16-2.87l4.8 3.78a3.5 3.5 0 004.31-.2l5.06-5.04a3.19 3.19 0 00.16-4.29l-3.88-4.89a35.82 35.82 0 002.95-5.18l6.07.9c.51.1.96-.03 1.41-.15 1.13-.31 2-1.16 2.2-2.18l1.86-6.95a3.13 3.13 0 00-1.98-3.7l-5.85-2.3c.19-1.98.14-3.91-.04-5.93l5.8-2.32c1.52-.65 2.42-2.24 1.99-3.82l-1.89-6.89c-.43-1.58-2.01-2.48-3.66-2.28l-6.2.85a33.37 33.37 0 00-2.95-5.02l3.87-4.94c.96-1.36.95-3.18-.21-4.32l-5.1-4.91a2.85 2.85 0 00-3.04-.87c-.45.12-.87.36-1.26.7l-4.92 3.78a33.83 33.83 0 00-5.03-2.87l.86-6.18a3.19 3.19 0 00-2.33-3.62l-6.9-1.74a2.35 2.35 0 00-1.6-.05c-1.02.27-1.8.97-2.23 2.06l-2.2 5.7c-2-.18-4.04-.1-5.94.05l-2.31-5.8zm33.56 37.92a29.22 29.22 0 00-35.81-20.42 29.25 29.25 0 00-20.43 35.83 29.15 29.15 0 1056.24-15.4z"
          fill="#30F353"
        />
        <Path
          d="M220.06 83.05a24.4 24.4 0 0017.14-30.07 24.45 24.45 0 00-30.06-17.14A24.55 24.55 0 00190 65.9a24.45 24.45 0 0030.06 17.14z"
          fill="#2B2B2B"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h273v213H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default React.memo(Gear);

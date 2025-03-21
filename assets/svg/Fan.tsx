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
const FanBlade = Animated.createAnimatedComponent(G);

function Fan({ width = 212, height = 212 }: SVGPropsType) {
  const { fanState, toggleFanState } = useGlobal();

  const fanRotation = useSharedValue<number>(0);

  //* useEffect for Fan Animation
  useEffect(() => {
    if (fanState) {
      fanRotation.value = 0; // Reset rotation
      fanRotation.value = withRepeat(
        withTiming(360, { duration: 1000, easing: Easing.linear }),
        -1,
        false,
      );
    } else {
      fanRotation.value = withTiming(0, { duration: 200 });
    }
  }, [fanState]);

  const fanAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 106.0 },
      { translateY: 105.999 },
      { rotate: `${fanRotation.value}deg` },
      { translateX: -106.0 },
      { translateY: -105.999 },
    ],
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 212 212"
      fill="none"
      onPress={toggleFanState}
    >
      <G clipPath="url(#a)">
        <Path
          d="M203.08 0H8.92C4 0 0 4 0 8.92v194.16C0 208 4 212 8.92 212h194.16c4.92 0 8.92-4 8.92-8.92V8.92C212 4 208 0 203.08 0zM106 195.9a89.9 89.9 0 110-179.8 89.9 89.9 0 010 179.8z"
          fill="#30F353"
        />
        <Path
          d="M106 195.9a89.9 89.9 0 110-179.8 89.9 89.9 0 010 179.8zM21.88 29.25a8.97 8.97 0 100-17.95 8.97 8.97 0 000 17.95zm168.25 0a8.97 8.97 0 100-17.95 8.97 8.97 0 000 17.95zM21.88 197.98a8.97 8.97 0 100-17.94 8.97 8.97 0 000 17.94zm168.25 0a8.97 8.97 0 100-17.94 8.97 8.97 0 000 17.94z"
          fill="#2B2B2B"
        />
        <Path
          d="M12.9 20.27a8.97 8.97 0 008.98 8.98V11.3a8.97 8.97 0 00-8.97 8.97zm168.25 0a8.97 8.97 0 008.97 8.98V11.3a8.97 8.97 0 00-8.97 8.97zm0 168.74a8.97 8.97 0 008.97 8.97v-17.94a8.97 8.97 0 00-8.97 8.97zm-168.24 0a8.97 8.97 0 008.97 8.97v-17.94a8.97 8.97 0 00-8.97 8.97z"
          fill="#2B2B2B"
        />

        <FanBlade
          animatedProps={fanAnimation}
          transform="rotate(0, 106.000, 105.999)"
        >
          <Path
            d="M106 182.85c-6.4 0-12.79-.8-19-2.37a7.17 7.17 0 01-4.93-4.39 7 7 0 01.75-6.48c8.18-12.12 12.88-23.64 13.97-34.24a7.12 7.12 0 017.06-6.44h6.33a7.1 7.1 0 017.1 6.5c.81 9.04 1.84 26.42-.41 41.24a7.14 7.14 0 01-6.61 6.07 75.7 75.7 0 01-4.26.11z"
            fill="#FFFDFD"
          />
          <Path
            d="M82.07 176.09a7.17 7.17 0 004.93 4.4 77 77 0 0010.29 1.86c7.04-20.12 10.05-49.19 10.46-53.42h-3.9a7.12 7.12 0 00-7.06 6.44c-1.1 10.6-5.8 22.12-13.97 34.24a7 7 0 00-.75 6.48zm19.75-93.02a7.1 7.1 0 01-7.1-6.5c-.81-9.04-1.84-26.42.41-41.24a7.14 7.14 0 016.61-6.07c7.82-.43 15.67.33 23.26 2.26a7.17 7.17 0 014.93 4.39 7 7 0 01-.75 6.48C121 54.51 116.3 66.03 115.21 76.63a7.12 7.12 0 01-7.06 6.44h-6.33z"
            fill="#FFFDFD"
          />
          <Path
            d="M129.93 35.91a7.17 7.17 0 00-4.93-4.4 77.1 77.1 0 00-12.05-2.05c-2.71 7.24-7.1 23.2-7.1 50.81 0 1 .03 1.93.1 2.8h2.2a7.1 7.1 0 007.03-6.22c.07-.7.17-1.42.27-2.14 1.43-10.06 6.05-20.92 13.73-32.32a7 7 0 00.75-6.48zM81.79 94.83a7.15 7.15 0 01-4.57-1.66c-6.97-5.82-19.98-17.38-28.88-29.45a7.14 7.14 0 01.39-8.97A77.09 77.09 0 0166.77 39.9a7.12 7.12 0 0110.65 4.73c2.78 14.35 7.6 25.82 14.33 34.09a7.12 7.12 0 01-.45 9.55l-4.47 4.47a7.08 7.08 0 01-5.04 2.09zm46.94-1.46a7.02 7.02 0 01-5-2.07l-4.47-4.47a7.1 7.1 0 01-.43-9.61c5.82-6.97 17.38-19.98 29.45-28.88a7.15 7.15 0 018.97.39 77.07 77.07 0 0114.85 18.04 7.18 7.18 0 01.38 6.59 7 7 0 01-5.1 4.06c-14.36 2.78-25.83 7.6-34.1 14.33a7.24 7.24 0 01-4.55 1.62zm12.85 79.74a7.12 7.12 0 01-7-5.74c-2.78-14.35-7.6-25.82-14.33-34.09a7.12 7.12 0 01.45-9.55l4.47-4.47a7.07 7.07 0 015.04-2.09c1.67 0 3.3.6 4.57 1.66 6.97 5.82 19.98 17.39 28.88 29.45a7.14 7.14 0 01-.39 8.97 77.1 77.1 0 01-18.04 14.85c-1.1.66-2.36 1-3.65 1.01zm-82.13-8.05a7.04 7.04 0 01-4.7-1.79 77.1 77.1 0 01-14.85-18.03 7.17 7.17 0 01-.38-6.6 7 7 0 015.1-4.06c14.36-2.78 25.83-7.6 34.1-14.33a7.23 7.23 0 014.55-1.62c1.89 0 3.66.73 5 2.07l4.47 4.47a7.1 7.1 0 01.43 9.61c-5.82 6.97-17.38 19.98-29.45 28.88a7.15 7.15 0 01-4.27 1.4zm114.1-34.66c-1.4 0-2.78-.43-3.94-1.22-12.12-8.18-23.64-12.88-34.24-13.97a7.12 7.12 0 01-6.44-7.06v-6.33a7.1 7.1 0 016.5-7.1 235.5 235.5 0 0120.58-.95c7.76 0 14.71.46 20.66 1.36a7.15 7.15 0 016.07 6.62 77.1 77.1 0 01-2.26 23.25 7.15 7.15 0 01-6.93 5.4zM55.99 118.23c-7.76 0-14.71-.46-20.66-1.36a7.14 7.14 0 01-6.07-6.61A77.09 77.09 0 0131.52 87a7.15 7.15 0 016.93-5.4c1.4 0 2.77.42 3.94 1.22C54.51 91 66.03 95.7 76.63 96.79a7.12 7.12 0 016.44 7.06v6.33a7.1 7.1 0 01-6.5 7.1c-4.82.43-12.3.95-20.58.95z"
            fill="#FFFDFD"
          />
          <Path
            d="M76.63 96.79c-10.6-1.1-22.12-5.8-34.24-13.97A7.15 7.15 0 0031.52 87a77.1 77.1 0 00-1.87 10.18c20.38 7.13 49.99 10.1 53.42 10.43v-3.77a7.1 7.1 0 00-6.44-7.06zm58.74 18.42c10.6 1.1 22.12 5.8 34.24 13.98a7.03 7.03 0 003.94 1.2 7.15 7.15 0 006.93-5.4 76.98 76.98 0 002.07-12.15c-7.26-2.73-23.28-7.13-51-7.13-.94 0-1.8.03-2.62.08v2.36a7.12 7.12 0 006.44 7.06zM70.42 38.9c-1.28 0-2.54.35-3.65 1.01a77.02 77.02 0 00-8.54 5.9c9.5 19.7 28.68 43.06 30.4 45.14l2.67-2.67a7.12 7.12 0 00.45-9.55c-6.33-7.78-10.97-18.4-13.82-31.59-.2-.88-.38-1.77-.55-2.65a7.12 7.12 0 00-6.96-5.59zm84.92 126.03c-3.28-7.17-11.57-21.66-31.2-41.3-.56-.55-1.13-1.1-1.72-1.62l-1.72 1.73a7.12 7.12 0 00-.45 9.55c6.73 8.27 11.55 19.74 14.33 34.1a7.12 7.12 0 0010.66 4.72 76.97 76.97 0 0010.1-7.18zM169.62 62.9l-.4-.59c-.46-.66-.93-1.31-1.41-1.96l-.07-.1a79.5 79.5 0 00-1.57-2.04c-18.58 8.9-41.1 27.08-45.14 30.4l2.7 2.7a7.03 7.03 0 005 2.07c1.65 0 3.27-.58 4.55-1.62 8.27-6.73 19.74-11.55 34.1-14.33a7 7 0 005.1-4.06 7.18 7.18 0 00-.38-6.6 74.84 74.84 0 00-2.48-3.87zm-130.1 75.75a7.18 7.18 0 00.38 6.6 77.06 77.06 0 007.02 9.91c7.06-3.2 21.53-11.4 41.18-31.05.6-.6 1.17-1.21 1.73-1.84l-1.56-1.56a7.02 7.02 0 00-5-2.07c-1.66 0-3.27.58-4.55 1.62-8.27 6.73-19.74 11.55-34.1 14.33a7 7 0 00-5.1 4.06z"
            fill="#FFFDFD"
          />
        </FanBlade>

        <Path
          d="M83.55 128.45a31.78 31.78 0 010-44.9 31.78 31.78 0 0144.9 0 31.78 31.78 0 010 44.9 31.78 31.78 0 01-44.9 0z"
          fill="#2B2B2B"
        />
        <Path
          d="M128.45 128.45a31.78 31.78 0 000-44.9l-44.9 44.9a31.78 31.78 0 0044.9 0z"
          fill="#2B2B2B"
        />
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 0h212v212H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default React.memo(Fan);

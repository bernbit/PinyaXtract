import React, { useEffect } from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import useGlobal from "@/context/GlobalContext";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  cancelAnimation,
  Easing,
} from "react-native-reanimated";
import Helpers from "@/constants/Helpers-Constant";
import { useIsFocused } from "@react-navigation/native";
//Types
import { SVGPropsType } from "@/types/SVG";

//! ⚠️ IMPORTANT: Define Animated.createAnimatedComponent(SVGElement) OUTSIDE the Main!
//! If defined inside, it will be re-created on every re-render, causing animations to reset.
const Leaf = Animated.createAnimatedComponent(G);
const Stand = Animated.createAnimatedComponent(G);
const Presser = Animated.createAnimatedComponent(G);

const Compress = ({ width = 68, height = 87 }: SVGPropsType) => {
  const { extractionLevel, machineState } = useGlobal();
  const isFocused = useIsFocused();

  // Shared Values
  const leafScale = useSharedValue<number>(1);
  const standScale = useSharedValue<number>(1);
  const presserTranslate = useSharedValue<number>(1);

  const leafScaleFinal = Helpers.getRangeValue(
    extractionLevel,
    0.7,
    5,
    1,
    0.13,
  );
  const standScaleFinal = Helpers.getRangeValue(
    extractionLevel,
    0.7,
    5,
    1,
    0.18,
  );
  const presserTranslateFinal = Helpers.getRangeValue(
    extractionLevel,
    0.7,
    5,
    1,
    42,
  );

  //* useEffect for Gear Animation
  useEffect(() => {
    if (!isFocused) {
      cancelAnimation(leafScale);
      cancelAnimation(standScale);
      cancelAnimation(presserTranslate);

      return;
    }

    if (machineState) {
      leafScale.value = 1;
      leafScale.value = withRepeat(
        withTiming(leafScaleFinal, { duration: 1000, easing: Easing.linear }),
        -1,
        true,
      );

      standScale.value = 1;
      standScale.value = withRepeat(
        withTiming(standScaleFinal, { duration: 1000, easing: Easing.linear }),
        -1,
        true,
      );

      presserTranslate.value = 1;
      presserTranslate.value = withRepeat(
        withTiming(presserTranslateFinal, {
          duration: 1000,
          easing: Easing.linear,
        }),
        -1,
        true,
      );
    } else {
      // Stop animations when machineState is false
      cancelAnimation(leafScale);
      cancelAnimation(standScale);
      cancelAnimation(presserTranslate);

      // Optionally reset the values to their initial state
      leafScale.value = 1;
      standScale.value = 1;
      presserTranslate.value = 1;
    }
  }, [machineState, extractionLevel]);

  const leafAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 0 },
      { translateY: 68 },
      { scaleX: 1 },
      { scaleY: leafScale.value },
      { translateX: 0 },
      { translateY: -68 },
    ],
  }));

  const standAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 0 },
      { translateY: 71 },
      { scaleX: 1 },
      { scaleY: standScale.value },
      { translateX: 0 },
      { translateY: -71 },
    ],
  }));

  const presserAnimation = useAnimatedProps(() => ({
    transform: [{ translateX: 0 }, { translateY: presserTranslate.value }],
  }));

  return (
    <Svg width={width} height={height} fill="none" viewBox="0 0 68 87">
      <G clipPath="url(#a)">
        <Leaf
          animatedProps={leafAnimation}
          transform={`translate(0,68) scale(1, ${!machineState ? leafScaleFinal : "1"}) translate(0, -68)`}
        >
          <Path
            d="M53.98 21.3a.8.8 0 00-1.26 0c-1.37 1.65-4.73 6.3-7.3 14.62a6 6 0 00.02 1.4A78.2 78.2 0 0042.1 60c0 12.49 5.04 5.8 11.25 5.8 6.22 0 11.26 6.69 11.26-5.8 0-9.04-1.99-16-3.56-21.75-.19-.7.25-2.34.25-2.34-2.58-8.33-5.94-12.97-7.32-14.63z"
            fill="#30F353"
          />
          <Path
            d="M64.61 60.01c0 12.49-5.04 5.8-11.26 5.8-6.21 0-11.25 6.69-11.25-5.8 0-10.14 1.45-18.08 3.31-24.1a43.6 43.6 0 013.46 3.03c.22.21.56.2.77-.02a5.25 5.25 0 017.4-.03c.22.22.55.24.77.03a48.05 48.05 0 013.49-3c1.86 6.02 3.31 13.96 3.31 24.1z"
            fill="#26C242"
          />
        </Leaf>

        <Stand
          animatedProps={standAnimation}
          transform={`translate(0,71) scale(1, ${!machineState ? standScaleFinal : 1}) translate(0, -71)`}
        >
          <Path d="M8.95 17.44h13.81v53.62H8.96V17.44z" fill="#2B2B2B" />
        </Stand>

        <Path
          d="M40.92 77.9v-6.88c0-.46.2-.9.58-1.22.37-.32.87-.5 1.39-.5h19.68c.52 0 1.02.18 1.4.5.36.33.57.76.57 1.22v6.88H40.92z"
          fill="#E5E5E5"
        />
        <Path
          d="M67.93 77.89v1.7c0 1.81-.73 3.55-2.03 4.83a7.01 7.01 0 01-4.92 2H39.07a8.8 8.8 0 01-4.47-1.22l-4.56-2.68a8.8 8.8 0 00-4.47-1.22H5.39a5.28 5.28 0 01-3.69-1.5 5.07 5.07 0 01-1.52-3.62v-3.41a1.7 1.7 0 011.73-1.71h27.13a8.8 8.8 0 014.47 1.22l4.56 2.68a8.8 8.8 0 004.47 1.22H66.2c.47 0 .9.18 1.23.5.33.32.51.75.51 1.2z"
          fill="#26C242"
        />

        <Presser
          animatedProps={presserAnimation}
          transform={`translate(0, ${!machineState ? presserTranslateFinal : 1})`}
        >
          <Path
            d="M40.92 8.9v8.5c0 .44.2.87.58 1.2.37.31.87.5 1.39.5h19.68c.52 0 1.02-.19 1.4-.5.36-.33.57-.76.57-1.2V8.9H40.92z"
            fill="#E5E5E5"
          />
          <Path
            d="M67.96 10.62v-1.7c0-1.81-.73-3.55-2.04-4.83a7.01 7.01 0 00-4.91-2h-25.4a8.8 8.8 0 00-4.46 1.22l-4.56 2.68a8.8 8.8 0 01-4.47 1.22H5.42c-1.39 0-2.71.54-3.69 1.5A5.07 5.07 0 00.2 12.33v3.41c0 .46.19.9.51 1.21.33.32.77.5 1.23.5H25.6a8.8 8.8 0 004.47-1.22l4.56-2.68a8.8 8.8 0 014.47-1.22h27.13c.46 0 .9-.18 1.23-.5.33-.32.5-.75.5-1.2z"
            fill="#26C242"
          />
        </Presser>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0h68v86H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default React.memo(Compress);

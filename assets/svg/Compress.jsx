import React, { useEffect } from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
import useGlobal from "@/context/GlobalContext";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withRepeat,
  withTiming,
  cancelAnimation,
} from "react-native-reanimated";
import Helpers from "@/constants/Helpers-Constant";

const Compress = ({ width = 68, height = 87 }) => {
  const { extractionLevel, operationStatus } = useGlobal();

  // Animation
  const leafScale = useSharedValue(1);
  const standScale = useSharedValue(1);
  const presserTranslate = useSharedValue(1);

  const Leaf = Animated.createAnimatedComponent(G);
  const Stand = Animated.createAnimatedComponent(G);
  const Presser = Animated.createAnimatedComponent(G);

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
    if (operationStatus) {
      leafScale.value = 1; // Reset rotation
      leafScale.value = withRepeat(
        withTiming(leafScaleFinal, { duration: 1000 }),
        -1,
        true,
      );

      standScale.value = 1;
      standScale.value = withRepeat(
        withTiming(standScaleFinal, { duration: 1000 }),
        -1,
        true,
      );

      presserTranslate.value = 1;
      presserTranslate.value = withRepeat(
        withTiming(presserTranslateFinal, { duration: 1000 }),
        -1,
        true,
      );
    } else {
      // Stop animations when operationStatus is false
      cancelAnimation(leafScale);
      cancelAnimation(standScale);
      cancelAnimation(presserTranslate);

      // Optionally reset the values to their initial state
      leafScale.value = 1;
      standScale.value = 1;
      presserTranslate.value = 1;
    }
  }, [operationStatus]);

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
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      fill="none"
      viewBox="0 0 68 87"
    >
      <G clipPath="url(#a)">
        {/* Leaf */}
        <Leaf
          animatedProps={leafAnimation}
          transform={`translate(0,68) scale(1, ${!operationStatus ? leafScaleFinal : "1"}) translate(0, -68)`}
        >
          <Path
            fill="#30F353"
            d="M53.983 21.295a.808.808 0 0 0-1.258 0c-1.376 1.66-4.737 6.296-7.314 14.622 0 0 .127 1.047.025 1.4-1.71 5.88-3.34 13.13-3.34 22.693 0 12.488 5.04 5.796 11.258 5.796 6.218 0 11.258 6.692 11.258-5.796 0-9.04-1.99-16.01-3.56-21.749-.19-.694.247-2.339.247-2.339-2.577-8.33-5.94-12.967-7.316-14.627Z"
          />
          <Path
            fill="#26C242"
            d="M64.614 60.012c0 12.485-5.042 5.794-11.26 5.794-6.216 0-11.259 6.691-11.259-5.794 0-10.138 1.453-18.081 3.316-24.095 1.17.917 2.327 1.921 3.459 3.02a.541.541 0 0 0 .775-.02c2.064-2.166 5.546-1.921 7.397-.023.213.219.548.236.772.026a48.046 48.046 0 0 1 3.485-2.998c1.862 6.014 3.315 13.955 3.315 24.09Z"
          />
        </Leaf>

        {/* Stand */}
        <Stand
          animatedProps={standAnimation}
          transform={`translate(0,71) scale(1, ${!operationStatus ? standScaleFinal : 1}) translate(0, -71)`}
        >
          <Path fill="#2B2B2B" d="M8.952 17.438h13.81v53.621H8.952V17.438Z" />
        </Stand>

        <Path
          fill="#E5E5E5"
          d="M40.922 77.9v-6.88c0-.456.208-.894.577-1.216a2.12 2.12 0 0 1 1.391-.504h19.68a2.12 2.12 0 0 1 1.392.504c.37.322.577.76.577 1.216v6.88H40.922Z"
        />
        <Path
          fill="#26C242"
          d="M67.932 77.887v1.706c0 1.81-.732 3.547-2.035 4.828a7.013 7.013 0 0 1-4.914 1.999H39.067c-1.575 0-3.12-.42-4.47-1.217l-4.56-2.686a8.805 8.805 0 0 0-4.47-1.217H5.389a5.26 5.26 0 0 1-3.685-1.5 5.075 5.075 0 0 1-1.527-3.62v-3.413c0-.453.183-.887.51-1.207.325-.32.767-.5 1.228-.5h27.128c1.575 0 3.12.42 4.47 1.217l4.559 2.686a8.804 8.804 0 0 0 4.47 1.217h23.654c.46 0 .903.18 1.228.5.326.32.51.754.51 1.207Z"
        />

        {/* Presser */}
        <Presser
          animatedProps={presserAnimation}
          transform={`translate(0, ${!operationStatus ? presserTranslateFinal : 1})`}
        >
          <Path
            fill="#E5E5E5"
            d="M40.922 8.89v8.5c0 .452.208.884.577 1.203.369.319.87.498 1.391.498h19.68c.523 0 1.023-.18 1.392-.498.37-.319.577-.751.577-1.202v-8.5H40.922Z"
          />
          <Path
            fill="#26C242"
            d="M67.96 10.624V8.918c0-1.811-.733-3.547-2.036-4.828a7.013 7.013 0 0 0-4.914-2H35.619c-1.575 0-3.12.422-4.47 1.218L26.59 5.994a8.805 8.805 0 0 1-4.47 1.217H5.416a5.26 5.26 0 0 0-3.686 1.5 5.075 5.075 0 0 0-1.526 3.62v3.413c0 .453.183.887.508 1.207.326.32.768.5 1.229.5h23.654c1.574 0 3.12-.42 4.47-1.217l4.558-2.686a8.804 8.804 0 0 1 4.47-1.217h27.129c.46 0 .903-.18 1.228-.5.326-.32.51-.754.51-1.207Z"
          />
        </Presser>
      </G>
      <Defs>
        <ClipPath id="a">
          <Path fill="#fff" d="M0 .5h68v86H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
export default Compress;

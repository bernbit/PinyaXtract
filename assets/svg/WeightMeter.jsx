import React, { useEffect } from "react";
import Svg, { G, Path, Defs, ClipPath, Mask, Circle } from "react-native-svg";
import Helpers from "@/constants/Helpers-Constant";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import useGlobal from "@/context/GlobalContext";

function WeightMeter({ width = 114, height = 114 }) {
  const { weightValue } = useGlobal();

  const pointerRotationFinal = Helpers.getRangeValue(
    weightValue,
    0,
    10,
    -74,
    74,
  );
  const Pointer = Animated.createAnimatedComponent(Path);
  const pointerRotation = useSharedValue(-74);

  useEffect(() => {
    pointerRotation.value = withTiming(pointerRotationFinal, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [pointerRotationFinal]);

  const pointerAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 55.976 },
      { translateY: 31.849 },
      { rotate: `${pointerRotation.value}deg` },
      { translateX: -55.976 },
      { translateY: -31.849 },
    ],
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 114 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_350_11)">
        <Path
          d="M112.957 11.948v89.06c0 6.585-5.336 11.949-11.949 11.949h-89.06C5.364 112.957 0 107.593 0 101.008v-89.06C0 5.336 5.364 0 11.948 0h89.06a11.931 11.931 0 0111.949 11.948z"
          fill="#2B2B2B"
        />
        <Path
          d="M101.53.543h-5.15v31.32c0 36.636-29.7 66.336-66.336 66.336H.522v3.352c0 6.572 5.377 11.949 11.948 11.949h89.06c6.599 0 11.949-5.349 11.949-11.948v-89.06c0-6.6-5.35-11.949-11.949-11.949z"
          fill="#2B2B2B"
        />
        <Path
          d="M83.756 9.356v12.001c0 6.448-5.227 11.675-11.675 11.675H40.876c-6.448 0-11.675-5.227-11.675-11.675v-12a3.07 3.07 0 013.07-3.071h48.414a3.07 3.07 0 013.071 3.07z"
          fill="#30F353"
        />
        <Path
          d="M34.852 31.311c0-12.007 9.734-21.74 21.74-21.74h27.164v-.215a3.07 3.07 0 00-3.07-3.07H32.271a3.07 3.07 0 00-3.071 3.07v12.001c0 4.235 2.276 7.908 5.65 9.954z"
          fill="#26C242"
        />

        {/* Pointer         */}
        <Circle cx={55.9768} cy={31.85} r={5.5} fill="#fff" />
        <Pointer
          animatedProps={pointerAnimation}
          transform="rotate(0, 55.976, 31.849)"
          d="M58.226 29.824l-4.552.03 2.195-12.504 2.357 12.474z"
          fill="#fff"
        />

        <Path
          d="M55.503 7.487h1.948v3.791h-1.948v-3.79zM49.57 8.515l1.882-.505.982 3.662-1.882.505-.982-3.662zM44.093 11.066l1.688-.975 1.895 3.283-1.687.975-1.896-3.284zM39.46 14.94l1.378-1.378 2.68 2.68-1.377 1.378-2.68-2.68zM35.999 19.873l.974-1.687 3.283 1.895-.974 1.688-3.283-1.896zM33.94 25.54l.504-1.883 3.662.982-.505 1.882-3.661-.982zM74.874 24.622l3.662-.982.504 1.882-3.661.982-.505-1.882zM72.696 20.078l3.283-1.896.974 1.687-3.283 1.896-.974-1.687zM69.423 16.242l2.68-2.68 1.378 1.378-2.68 2.68-1.378-1.378zM65.281 13.375l1.896-3.283 1.687.974-1.896 3.283-1.687-.974zM60.545 11.679l.982-3.662 1.882.504-.982 3.662-1.882-.504zM38.453 33.032h38.5v13.3h-38.5v-13.3z"
          fill="#2B2B2B"
        />
        <Mask
          id="a"
          style={{
            maskType: "alpha",
          }}
          maskUnits="userSpaceOnUse"
          x={0}
          y={0}
          width={114}
          height={114}
        >
          <Path
            d="M112.957 11.948v89.06c0 6.585-5.336 11.949-11.949 11.949h-89.06C5.364 112.957 0 107.593 0 101.008v-89.06C0 5.336 5.364 0 11.948 0h89.06a11.931 11.931 0 0111.949 11.948z"
            fill="#2B2B2B"
          />
          <Path
            d="M101.53.543h-5.15v31.32c0 36.636-29.7 66.336-66.336 66.336H.522v3.352c0 6.572 5.377 11.949 11.948 11.949h89.06c6.599 0 11.949-5.349 11.949-11.948v-89.06c0-6.6-5.35-11.949-11.949-11.949z"
            fill="#2B2B2B"
          />
        </Mask>
        <G mask="url(#a)">
          <Path
            d="M102.134 58.992v76.651c0 5.667-4.264 10.284-9.548 10.284H21.415c-5.262 0-9.548-4.617-9.548-10.284v-76.65c0-5.692 4.286-10.284 9.548-10.284h71.17c5.285 0 9.549 4.592 9.549 10.283z"
            fill="#383838"
          />
        </G>
      </G>
      <Defs>
        <ClipPath id="clip0_350_11">
          <Path fill="#fff" d="M0 0H114V114H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default WeightMeter;

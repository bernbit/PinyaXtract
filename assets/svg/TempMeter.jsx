import React, { useEffect } from "react";
import Svg, { Path, Mask, G, Rect } from "react-native-svg";
import Helpers from "@/constants/Helpers-Constant";
import Animated, {
  useSharedValue,
  useAnimatedProps,
  withTiming,
  Easing,
} from "react-native-reanimated";
import useGlobal from "@/context/GlobalContext";

function TempMeter({ width = 114, height = 68 }) {
  const { tempValue } = useGlobal();

  const meterHeightFinal = Helpers.getRangeValue(tempValue, 1, 80, 1, 100);

  const meterHeight = useSharedValue(0);
  const Meter = Animated.createAnimatedComponent(Rect);

  useEffect(() => {
    // meterHeight.value = meterHeightFinal; // Set initial value
    meterHeight.value = withTiming(meterHeightFinal, {
      duration: 1000,
      easing: Easing.inOut(Easing.ease),
    });
  }, [meterHeightFinal]);

  const meterAnimation = useAnimatedProps(() => ({
    transform: [
      { translateX: 48 },
      { translateY: 100 - meterHeight.value },
      { translateX: -48 },
    ],
    height: meterHeight.value,
  }));

  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 112 114"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <Rect width={112} height={114} rx={10} fill="#383838" />
      <Rect x={4} y={4} width={104} height={106} rx={10} fill="#2B2B2B" />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M55.98 12c1.564 0 2.807 1.207 2.807 2.725v69.21c3.048 1.09 5.213 3.932 5.213 7.28C64 95.497 60.431 99 55.98 99 51.569 99 48 95.497 48 91.215c0-3.348 2.166-6.19 5.213-7.28v-69.21c0-1.518 1.243-2.725 2.767-2.725z"
        fill={`${tempValue >= 70 ? "#CC0000" : "#26C242"}`}
      />
      <Mask
        id="a"
        style={{
          maskType: "alpha",
        }}
        maskUnits="userSpaceOnUse"
        x={48}
        y={12}
        width={16}
        height={87}
      >
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M55.98 12c1.564 0 2.807 1.207 2.807 2.725v69.21c3.048 1.09 5.213 3.932 5.213 7.28C64 95.497 60.431 99 55.98 99 51.569 99 48 95.497 48 91.215c0-3.348 2.166-6.19 5.213-7.28v-69.21c0-1.518 1.243-2.725 2.767-2.725z"
          fill={`${tempValue >= 70 ? "#CC0000" : "#26C242"}`}
        />
      </Mask>

      <G mask="url(#a)">
        <Meter
          animatedProps={meterAnimation}
          width={17}
          height={100}
          rx={0}
          fill={`${tempValue >= 70 ? "#FF0000" : "#30F353"}`}
          transform={`translate(48, ${100 - 100})`}
        />
      </G>

      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M53.563 91c1.399 0 2.517 1.084 2.517 2.439 0 1.354-1.118 2.483-2.517 2.483-1.398 0-2.563-1.129-2.563-2.483C51 92.084 52.165 91 53.563 91zM27.418 36.831h10.164c.803 0 1.418.609 1.418 1.347 0 .695-.615 1.304-1.418 1.304H27.418c-.756 0-1.418-.609-1.418-1.304 0-.738.662-1.347 1.418-1.347zm0 11.21h10.164c.803 0 1.418.608 1.418 1.303 0 .74-.615 1.347-1.418 1.347H27.418c-.756 0-1.418-.608-1.418-1.347 0-.695.662-1.303 1.418-1.303zm0 11.21h10.164c.803 0 1.418.608 1.418 1.303 0 .739-.615 1.347-1.418 1.347H27.418c-.756 0-1.418-.608-1.418-1.347 0-.695.662-1.303 1.418-1.303zm0 11.21h10.164c.803 0 1.418.608 1.418 1.303 0 .738-.615 1.347-1.418 1.347H27.418c-.756 0-1.418-.609-1.418-1.347 0-.695.662-1.304 1.418-1.304zm0 11.21h10.164c.803 0 1.418.607 1.418 1.302 0 .739-.615 1.304-1.418 1.304H27.418c-.756 0-1.418-.565-1.418-1.303 0-.696.662-1.304 1.418-1.304zm0-56.05h10.164c.803 0 1.418.609 1.418 1.348 0 .695-.615 1.303-1.418 1.303H27.418c-.756 0-1.418-.608-1.418-1.303 0-.739.662-1.347 1.418-1.347z"
        fill="#FEFEFE"
      />
      <Path
        d="M37.582 16H27.418c-.756 0-1.418.608-1.418 1.347 0 .695.662 1.303 1.418 1.303h10.164c.803 0 1.418-.608 1.418-1.303 0-.739-.614-1.347-1.418-1.347z"
        fill="#FEFEFE"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M71.418 36.831h10.164c.803 0 1.418.609 1.418 1.347 0 .695-.615 1.304-1.418 1.304H71.418c-.756 0-1.418-.609-1.418-1.304 0-.738.662-1.347 1.418-1.347zm0 11.21h10.164c.803 0 1.418.608 1.418 1.303 0 .74-.615 1.347-1.418 1.347H71.418c-.756 0-1.418-.608-1.418-1.347 0-.695.662-1.303 1.418-1.303zm0 11.21h10.164c.803 0 1.418.608 1.418 1.303 0 .739-.615 1.347-1.418 1.347H71.418c-.756 0-1.418-.608-1.418-1.347 0-.695.662-1.303 1.418-1.303zm0 11.21h10.164c.803 0 1.418.608 1.418 1.303 0 .738-.615 1.347-1.418 1.347H71.418c-.756 0-1.418-.609-1.418-1.347 0-.695.662-1.304 1.418-1.304zm0 11.21h10.164c.803 0 1.418.607 1.418 1.302 0 .739-.615 1.304-1.418 1.304H71.418c-.756 0-1.418-.565-1.418-1.303 0-.696.662-1.304 1.418-1.304zm0-56.05h10.164c.803 0 1.418.609 1.418 1.348 0 .695-.615 1.303-1.418 1.303H71.418c-.756 0-1.418-.608-1.418-1.303 0-.739.662-1.347 1.418-1.347z"
        fill="#FEFEFE"
      />
      <Path
        d="M81.582 16H71.418c-.756 0-1.418.608-1.418 1.347 0 .695.662 1.303 1.418 1.303h10.164c.803 0 1.418-.608 1.418-1.303 0-.739-.615-1.347-1.418-1.347z"
        fill="#FEFEFE"
      />
    </Svg>
  );
}

export default TempMeter;

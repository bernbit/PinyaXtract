import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function Paused({ width = 36, height = 36 }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_83_498)">
        <Path
          d="M18 36.5c9.941 0 18-8.059 18-18S27.941.5 18 .5 0 8.559 0 18.5s8.059 18 18 18z"
          fill="#FB4141"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.415 11.165h13.17c.413 0 .75.337.75.75v13.17c0 .413-.337.75-.75.75h-13.17a.751.751 0 01-.75-.75v-13.17c0-.413.337-.75.75-.75z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_83_498">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H36V36H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Paused;

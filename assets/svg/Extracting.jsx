import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

function Extract({ width = 36, height = 36 }) {
  return (
    <Svg
      width={width}
      height={height}
      viewBox="0 0 36 37"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G clipPath="url(#clip0_83_502)">
        <Path
          d="M18 36.5c9.941 0 18-8.059 18-18S27.941.5 18 .5 0 8.559 0 18.5s8.059 18 18 18z"
          fill="#FFC145"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M22.992 26.938a10.112 10.112 0 005.105-8.768c0-4.486-2.974-8.438-7.256-9.69l-.612 2.307a7.732 7.732 0 015.491 7.39 7.72 7.72 0 01-3.91 6.707.23.23 0 01-.33-.126l-.555-1.66-2.363 4.993 5.499.45-1.125-1.245c-.099-.12-.077-.288.056-.358zM14.196 12.13a.23.23 0 01.33.126l.556 1.66 2.363-5-5.506-.45 1.125 1.245a.236.236 0 01-.056.358 10.12 10.12 0 00-5.098 8.768c0 4.486 2.974 8.438 7.256 9.69l.612-2.3a7.725 7.725 0 01-5.491-7.39 7.744 7.744 0 013.91-6.707z"
          fill="#FFFFFE"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_83_502">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H36V36H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Extract;

import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";
//Types
import { SVGPropsType } from "@/types/SVG";

function Ready({ width = 36, height = 36 }: SVGPropsType) {
  return (
    <Svg width={width} height={height} viewBox="0 0 36 37" fill="none">
      <G clipPath="url(#clip0_83_508)">
        <Path
          d="M18 36.5c9.941 0 18-8.059 18-18S27.941.5 18 .5 0 8.559 0 18.5s8.059 18 18 18z"
          fill="#30F353"
        />
        <Path
          d="M13.4 26.62l9.256 9.255C30.322 33.831 36 26.847 36 18.5v-.511l-7.268-6.7L13.4 26.619z"
          fill="#30F353"
        />
        <Path
          d="M18.454 22.532c.795.794.795 2.157 0 2.952l-1.646 1.647c-.795.795-2.158.795-2.953 0l-7.211-7.268c-.795-.795-.795-2.158 0-2.953l1.646-1.647c.795-.794 2.158-.794 2.953 0l7.211 7.269z"
          fill="#fff"
        />
        <Path
          d="M24.757 9.983c.795-.795 2.158-.795 2.953 0l1.646 1.646c.795.795.795 2.158 0 2.953L16.864 27.017c-.795.795-2.157.795-2.952 0l-1.647-1.646c-.795-.795-.795-2.158 0-2.953L24.757 9.983z"
          fill="#fff"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_83_508">
          <Path fill="#fff" transform="translate(0 .5)" d="M0 0H36V36H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}

export default Ready;

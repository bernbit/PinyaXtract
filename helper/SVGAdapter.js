//* Function for Formatting Value in useAnimateProps in Rect Native Reanimated Library
const SVGAdapter = createAnimatedPropAdapter((props) => {
  "worklet";
  const keys = Object.keys(props);
  // transform
  if (keys.includes("transform")) {
    console.log(typeof props.transform);

    if (Array.isArray(props.transform)) {
      // case of array with 6 values => https://github.com/react-native-svg/react-native-svg/blob/b2e2c355204ff4b10973d3afce1495f7e4167ff7/src/elements/Shape.tsx#L200
      if (props.transform.length !== 6) {
        throw new Error(
          `invalid transform length of ${props.transform.length}, should be 6`,
        );
      }
      const transform = props.transform;
      const x = props.x || 0;
      const y = props.y || 0;
      props.transform = [
        { translateX: transform[0] * x + transform[2] * y + transform[4] },
        { translateY: transform[1] * x + transform[3] * y + transform[5] },
      ];
    } else if (typeof props.transform === "string") {
      if (props.transform.startsWith("translate(")) {
        // Handle "translate(x y)"
        const arr = props.transform
          .replace("translate(", "")
          .replace(")", "")
          .split(" ");
        props.transform = [
          { translateX: parseFloat(arr[0]) },
          { translateY: parseFloat(arr[1]) },
        ];
      } else if (props.transform.startsWith("rotate(")) {
        // Handle "rotate(angle cx cy)"
        const arr = props.transform
          .replace("rotate(", "")
          .replace(")", "")
          .split(" ");

        props.transform = [
          { rotate: parseFloat(arr[0]) }, // Angle
          { rotateX: parseFloat(arr[1]) }, // Center X
          { rotateY: parseFloat(arr[2]) }, // Center Y
        ];
      }
    }
  }
  // todo: other props
});

const getRangeValue = (
  value: number,
  min: number,
  max: number,
  outputMin: number,
  outputMax: number,
): number => {
  // Clamp the value to ensure it's within the range
  const clampedValue = Math.max(min, Math.min(max, value));

  // Map the value to the specified output range
  const mappedValue =
    outputMin + ((clampedValue - min) / (max - min)) * (outputMax - outputMin);

  return mappedValue;
};

export default getRangeValue;

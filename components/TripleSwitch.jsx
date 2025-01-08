import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const TripleSwitch = ({ state, setState }) => {
  const options = ["LOW", "OFF", "HIGH"];

  return (
    <View className="flex flex-row items-center justify-center gap-2 bg-secondary px-2 py-2">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => setState(option.toLowerCase())}
        >
          <Text
            className={`grow basis-1/3 p-1 font-cabinetGrotesk-medium ${state === option.toLowerCase() ? "bg-primary text-secondary" : "bg-secondary text-primary"}`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TripleSwitch;

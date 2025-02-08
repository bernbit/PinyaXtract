import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useGlobal from "@/context/GlobalContext";

const TripleSwitch = () => {
  const options: string[] = ["LOW", "OFF", "HIGH"];
  const { heaterState, heaterManual, toggleHeaterState_Switch } = useGlobal();

  return (
    <View
      className={`relative flex flex-row items-center justify-center gap-2 rounded-md bg-secondary px-2 py-2 ${!heaterManual ? "pointer-events-none" : "pointer-events-auto"}`}
    >
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            toggleHeaterState_Switch(option.toLowerCase());
          }}
          className={`${heaterState === option.toLowerCase() ? "bg-primary text-secondary" : "bg-secondary text-primary"}`}
        >
          <Text
            className={`grow basis-1/3 p-1 font-cabinetGrotesk-medium ${heaterState === option.toLowerCase() ? "text-secondary" : "text-primary"}`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TripleSwitch;

import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import useGlobal from "@/context/GlobalContext";

const TripleSwitch = ({ state, setState }) => {
  const options = ["LOW", "OFF", "HIGH"];
  const { heaterClickCount, setHeaterClickCount } = useGlobal();

  const handleChange = (value) => {
    const valParse = value.toLowerCase();
    setState(valParse);

    if (valParse === "low") {
      setHeaterClickCount(1);
    } else if (valParse === "off") {
      setHeaterClickCount(2);
    } else if (valParse === "high") {
      setHeaterClickCount(3);
    } else {
      setHeaterClickCount(0);
    }
  };

  return (
    <View className="flex flex-row items-center justify-center gap-2 rounded-md bg-secondary px-2 py-2">
      {options.map((option, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            handleChange(option.toLowerCase());
          }}
          className={`${state === option.toLowerCase() ? "bg-primary text-secondary" : "bg-secondary text-primary"}`}
        >
          <Text
            className={`grow basis-1/3 p-1 font-cabinetGrotesk-medium ${state === option.toLowerCase() ? "text-secondary" : "text-primary"}`}
          >
            {option}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default TripleSwitch;

import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors-Constants";
import useGlobal from "@/context/GlobalContext";

const InputButton = ({ state, setState, min, max, defaultVal, setValue }) => {
  const { operationStatus } = useGlobal();

  const handleStateChange = (value, type, min, max) => {
    setState((prevValue) => {
      let newValue;

      if (type === "add") {
        newValue = Math.min(prevValue + value, max);
      } else if (type === "subtract") {
        newValue = Math.max(prevValue - value, min);
      } else if (type === "manual") {
        const regex = /^(\d+(\.\d*)?|\.\d*)$/;
        // Check if the value is a valid number
        if (value !== undefined && !isNaN(value) && regex.test(value)) {
          newValue = value; // Temporarily allow incomplete input like "1."
        } else {
          newValue = ""; // Keep previous value if invalid
        }
      }

      return newValue;
    });
  };

  const handleBlur = () => {
    if (state === "") {
      setState(defaultVal);
    }

    setState((prevValue) => {
      let finalValue = parseFloat(prevValue);
      if (isNaN(finalValue)) {
        finalValue = min; // Default to minimum if invalid
      }
      return Math.min(Math.max(finalValue, min), max); // Clamp final value
    });
  };

  return (
    <View
      className="flex h-10 w-[40%] flex-row"
      pointerEvents={`${operationStatus ? "none" : "auto"}`}
    >
      {/* Minus (-) */}
      <TouchableOpacity
        className={`flex items-center justify-center bg-secondary px-2 ${state <= min ? "opacity-55" : ""}`}
        onPress={() => handleStateChange(setValue, "subtract", min, max)}
        onLongPress={() => setState(min)}
        disabled={state <= min}
      >
        <AntDesign name="minus" size={15} color={Colors["light-text"]} />
      </TouchableOpacity>

      <TextInput
        className="flex-1 grow bg-primary p-0 text-center font-cabinetGrotesk-bold text-lg"
        keyboardType="numeric"
        onChangeText={(input) => handleStateChange(input, "manual", min, max)}
        onBlur={handleBlur}
        placeholder={`${defaultVal}`}
        value={`${state}`}
        maxLength={6}
        on
      />

      {/* Plus (+) */}
      <TouchableOpacity
        className={`gitems-center flex justify-center bg-secondary px-2 ${state >= max ? "opacity-55" : ""}`}
        onPress={() => handleStateChange(setValue, "add", min, max)}
        onLongPress={() => setState(max)}
        disabled={state >= max}
      >
        <AntDesign name="plus" size={20} color={Colors["light-text"]} />
      </TouchableOpacity>
    </View>
  );
};

export default InputButton;

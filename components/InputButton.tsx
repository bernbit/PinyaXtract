import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Colors } from "@/constants/Colors-Constants";
import { writeData } from "@/firebase/database";

// Types
interface InputButtonProps {
  state: number;
  setState: React.Dispatch<React.SetStateAction<number>>;
  min: number;
  max: number;
  defaultVal: number;
  setValue: number;
  path: string;
}

const InputButton = ({
  state,
  setState,
  min,
  max,
  defaultVal,
  setValue,
  path,
}: InputButtonProps) => {
  const [localInput, setLocalInput] = useState<string>(`${state}`);

  const handleStateChange = (
    value: number,
    type: "add" | "subtract",
    min: number,
    max: number,
  ) => {
    setState((prevValue) => {
      let newValue = prevValue;

      if (type === "add") {
        newValue = Math.min(prevValue + value, max);
      } else if (type === "subtract") {
        newValue = Math.max(prevValue - value, min);
      }

      writeData(path, newValue);

      return newValue;
    });
  };

  const handleInputChange = (input: string) => {
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (input === "" || regex.test(input)) {
      setLocalInput(input);
    } else {
      setLocalInput("");
      return;
    }
  };

  const handleBlur = () => {
    if (localInput === "") {
      setState(defaultVal);
      setLocalInput(`${defaultVal}`);
      writeData(path, defaultVal);
      return;
    }

    const parsedValue = parseFloat(localInput);

    if (isNaN(parsedValue)) {
      setState(min);
      setLocalInput(`${min}`);
      writeData(path, min);
    } else {
      const newValue = Math.min(Math.max(parsedValue, min), max);
      setState(newValue);
      setLocalInput(`${newValue}`);
      writeData(path, newValue);
    }
  };

  return (
    <View className="flex h-9 w-[60%] flex-row">
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
        className="flex-1 bg-primary p-0 text-center font-cabinetGrotesk-bold text-lg"
        keyboardType="numeric"
        onChangeText={handleInputChange}
        onBlur={handleBlur}
        placeholder={`${defaultVal}`}
        value={localInput}
        maxLength={6}
      />

      {/* Plus (+) */}
      <TouchableOpacity
        className={`flex items-center justify-center bg-secondary px-2 ${state >= max ? "opacity-55" : ""}`}
        onPress={() => handleStateChange(setValue, "add", min, max)}
        onLongPress={() => setState(max)}
        disabled={state >= max}
      >
        <AntDesign name="plus" size={15} color={Colors["light-text"]} />
      </TouchableOpacity>
    </View>
  );
};

export default InputButton;

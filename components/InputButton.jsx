import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

const InputButton = ({ state, setState, handleState }) => {
  const handleBlur = () => {
    if (state === "") {
      setState(1);
    }
  };
  return (
    <View className="flex w-[130] flex-row">
      {/* Minus (-) */}
      <TouchableOpacity
        className={`flex grow items-center justify-center bg-secondary ${state <= 1 ? "opacity-55" : ""}`}
        onPress={() => handleState(5, "subtract")}
        onLongPress={() => setState(1)}
        disabled={state <= 1}
      >
        <Text className="font-cabinetGrotesk-bold text-3xl text-light-text">
          -
        </Text>
      </TouchableOpacity>

      {/* Input Field */}
      <TextInput
        className="h-full basis-[35%] items-center bg-primary p-0 text-center font-cabinetGrotesk-bold text-lg"
        keyboardType="numeric"
        onChangeText={(input) => handleState(input, "manual")}
        onBlur={handleBlur}
        placeholder="1"
        value={`${state}`}
        maxLength={3}
      />

      {/* Plus (+) */}
      <TouchableOpacity
        className={`flex grow items-center justify-center bg-secondary ${state >= 100 ? "opacity-55" : ""}`}
        onPress={() => handleState(5, "add")}
        onLongPress={() => setState(100)}
        disabled={state >= 100}
      >
        <Text className="font-cabinetGrotesk-bold text-3xl text-light-text">
          +
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default InputButton;

import React, { useState } from "react";
import { View, Text, TextInput } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";

const Input = ({
  icon = "email",
  type = "email",
  label = "Email Address",
  ...props
}) => {
  const [isFocus, setIsFocus] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  return (
    <View>
      <Text className="py-1 font-satoshi text-primary">{label}</Text>

      <View
        className={`flex h-12 flex-row items-center gap-2 rounded-md border px-2 leading-[1.25] ${isFocus ? "border-primary" : "border-light-text"}`}
      >
        <MaterialIcons name={icon} size={24} color={Colors.primary} />
        <TextInput
          className="flex-1 text-lg text-light-text"
          // keyboardType="email-address"
          placeholderTextColor={"#cccccc"}
          secureTextEntry={showPassword && type === "password"}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          {...props}
        />

        {type === "password" && (
          <MaterialIcons
            className="opacity-80"
            onPress={() => setShowPassword(!showPassword)}
            name={`${!showPassword ? "visibility" : "visibility-off"}`}
            size={24}
            color={Colors.primary}
          />
        )}
      </View>

      {/* <Text className="pt-0.5 text-danger">Incorrect Password</Text> */}
    </View>
  );
};

export default Input;

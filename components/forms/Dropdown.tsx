import React, { useState } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors-Constants";
import Modal from "@/components/Modal";

//Types
interface DropdownProps {
  icon?: keyof typeof MaterialIcons.glyphMap;
  label?: string;
  options: { label: string; value: string }[];
  selectedValue: string;
  onValueChange?: (newValue: string) => void;
  error?: string;
  enable?: boolean;
}

const Dropdown = ({
  icon = "manage-accounts",
  label = "Email Address",
  options = [],
  selectedValue = "Select",
  onValueChange = () => {},
  error = "",
  enable = true,
}: DropdownProps) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <View className="w-full">
      <Text className="py-1 font-satoshi text-primary">{label}</Text>

      <TouchableOpacity
        className={`flex h-12 flex-row items-center gap-2 rounded-md border px-2 leading-[1.25] ${error ? "border-danger" : "border-light-text"} ${!enable ? "pointer-events-none opacity-50" : ""} `}
        onPress={() => setShowModal(true)}
      >
        <MaterialIcons name={icon} size={24} color={Colors.primary} />

        <Text className="flex-1 px-2 text-lg text-light-text">
          {options.find((opt) => opt.value === selectedValue)?.label ||
            "Select"}
        </Text>

        <MaterialIcons
          name={`${showModal ? "keyboard-arrow-up" : "keyboard-arrow-down"}`}
          size={24}
          color={Colors.primary}
        />
      </TouchableOpacity>

      <Modal showModal={showModal} setShowModal={setShowModal}>
        <View className="">
          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex flex-row items-center gap-2 py-2"
                onPress={() => {
                  onValueChange(item.value);
                  setShowModal(false);
                }}
              >
                <MaterialIcons
                  name={`${item.label === "User" ? "account-box" : "admin-panel-settings"}`}
                  size={26}
                  color={Colors.primary}
                />
                <Text className="flex-1 font-satoshi-medium text-xl text-light-text">
                  {item.label}
                </Text>
              </TouchableOpacity>
            )}
          />
        </View>
      </Modal>
    </View>
  );
};

export default Dropdown;

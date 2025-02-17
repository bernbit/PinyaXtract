import React, { ReactNode } from "react";
import {
  View,
  Modal as NativeModal,
  TouchableWithoutFeedback,
} from "react-native";

interface ModalProps {
  children: ReactNode;
  showModal: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
}

const Modal = ({ children, showModal, setShowModal }: ModalProps) => {
  return (
    <NativeModal animationType="fade" transparent={true} visible={showModal}>
      <TouchableWithoutFeedback onPress={() => setShowModal?.(false)}>
        <View className="flex h-full w-full items-center justify-center bg-black/50 px-6">
          <View className="flex w-full justify-center gap-4 rounded-md bg-background px-4 py-8">
            {children}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </NativeModal>
  );
};

export default Modal;

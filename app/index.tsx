import { Text, View } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Bernardo L. Salva Jr.</Text>
      <MaterialIcons name="home" size={30} color="#30F353" />
      <FontAwesome name="user" size={40} color="purple" />
    </View>
  );
}

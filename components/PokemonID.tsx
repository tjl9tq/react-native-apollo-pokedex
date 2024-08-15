import { View } from "react-native";
import { ThemedText } from "./ThemedText";

const PokemonID = ({ id }: { id: number }) => {
  const paddedId = id.toString().padStart(4, "0");
  return (
    <View>
      <ThemedText style={{ fontSize: 11, color: "#616161" }}>
        #{paddedId}
      </ThemedText>
    </View>
  );
};

export default PokemonID;

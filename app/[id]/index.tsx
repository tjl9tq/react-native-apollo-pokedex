import { useLocalSearchParams } from "expo-router";
import { Text, View } from "react-native";

const PokemonId = () => {
  const local = useLocalSearchParams();

  return (
    <View>
      <Text>{local.id}</Text>
    </View>
  );
};

export default PokemonId;

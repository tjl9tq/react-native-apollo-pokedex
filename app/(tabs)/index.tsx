import { Button, Image, StyleSheet, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import useGetPokemonSpeciesQuery from "@/hooks/useGetPokemonSpeciesQuery";
import { useState } from "react";
import TypeBadge from "@/components/TypeBadge";

export default function HomeScreen() {
  const { data, loading, error } = useGetPokemonSpeciesQuery();
  const [pokemonToShow, setPokemonToShow] = useState(6);

  const hideLoadMoreButton = data && pokemonToShow >= data.length;

  if (loading) {
    return <ThemedText>...loading</ThemedText>;
  }

  if (error) {
    return <ThemedText>error</ThemedText>;
  }

  const handleButtonPress = () => {
    if (!hideLoadMoreButton) {
      setPokemonToShow((prev) => prev + 6);
    }
  };

  console.log(data?.slice(10, 16));

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.pokemonContainer}>
        {data?.slice(0, pokemonToShow).map((pokemon) => (
          <View style={styles.pokemon} key={pokemon.id}>
            <View
              style={{
                backgroundColor: "#f2f2f2",
                width: 160,
                height: 160,
                borderRadius: 6,
                margin: "auto",
              }}
            >
              <Image
                source={{ uri: pokemon?.sprite }}
                style={{
                  width: 140,
                  height: 140,
                  margin: "auto",
                }}
              />
            </View>
            <View style={{ marginLeft: 16 }}>
              <ThemedText>{pokemon?.id}</ThemedText>
              <ThemedText
                style={{ textTransform: "capitalize", marginBottom: 4 }}
              >
                {pokemon?.name}
              </ThemedText>
              <View style={styles.typeContainer}>
                {pokemon?.types.map((type) => (
                  <TypeBadge key={type} type={type} />
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
      <View style={{ marginBottom: 300 }}>
        <Button onPress={handleButtonPress} title="Load more Pokémon" />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
  pokemonContainer: {
    display: "flex",
    flexDirection: "row",
    margin: "auto",
    width: 360,
    height: "auto",
    flexWrap: "wrap",
    marginBottom: 200,
  },
  pokemon: {
    width: 180,
    height: 240,
    marginBottom: 12,
  },
  typeContainer: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
  },
});

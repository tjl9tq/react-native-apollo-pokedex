import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import useGetPokemonSpeciesQuery from "@/hooks/useGetPokemonSpeciesQuery";
import { useState } from "react";
import TypeBadge from "@/components/TypeBadge";
import { router } from "expo-router";
import PokemonID from "@/components/PokemonID";

export default function HomeScreen() {
  const { data, loading, error } = useGetPokemonSpeciesQuery();
  const [pokemonToShow, setPokemonToShow] = useState(12);

  const hideLoadMoreButton = data && pokemonToShow >= data.length;

  if (loading) {
    return <ThemedText>...loading</ThemedText>;
  }

  if (error) {
    return <ThemedText>error</ThemedText>;
  }

  const handleButtonPress = () => {
    if (!hideLoadMoreButton) {
      setPokemonToShow((prev) => prev + 12);
    }
  };
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
          <View
            style={styles.pokemon}
            key={pokemon.id}
            onTouchEnd={() => {
              router.push(`/${pokemon.id}`);
            }}
          >
            <View
              style={{
                backgroundColor: "#f2f2f2",
                width: 160,
                height: 160,
                borderRadius: 6,
                marginHorizontal: "auto",
                marginBottom: -4,
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
              <PokemonID id={pokemon?.id} />
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
      <View style={{ marginBottom: 40 }}>
        <Pressable onPress={handleButtonPress} style={styles.button}>
          <Text style={styles.buttonText}>Load more Pokémon</Text>
        </Pressable>
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
    marginBottom: 40,
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
  button: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 5,
    elevation: 3,
    backgroundColor: "#4aa9d5",
    width: 200,
    margin: "auto",
    cursor: "pointer",
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "bold",
    letterSpacing: 0.25,
    color: "white",
  },
});

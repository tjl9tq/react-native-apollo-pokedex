import { gql, useQuery } from "@apollo/client";

const GET_POKEMON_SPECIES = gql`
  query GetPokemonSpecies {
    gen1_species: pokemon_v2_pokemonspecies(
      where: { pokemon_v2_generation: { name: { _eq: "generation-i" } } }
      order_by: { id: asc }
    ) {
      name
      id
      pokemon_v2_pokemons(where: { is_default: { _eq: true } }) {
        pokemon_v2_pokemonsprites {
          sprites
        }
        pokemon_v2_pokemontypes {
          pokemon_v2_type {
            name
          }
        }
      }
    }
  }
`;

interface PokemonSpeciesResponse {
  gen1_species: Array<{
    name: string;
    id: number;

    pokemon_v2_pokemons: Array<{
      pokemon_v2_pokemontypes: Array<{
        pokemon_v2_type: {
          name: string;
        };
      }>;
      pokemon_v2_pokemonsprites: Array<{
        // sprites is marked as String!, but its actually an object
        sprites: any;
      }>;
    }>;
  }>;
}

const useGetPokemonSpeciesQuery = () => {
  const { data, loading, error } =
    useQuery<PokemonSpeciesResponse>(GET_POKEMON_SPECIES);

  console.log(data);

  const formattedData = data?.gen1_species.map((pokemon) => {
    const { name, id, pokemon_v2_pokemons } = pokemon;
    return {
      name,
      id,
      sprite:
        pokemon_v2_pokemons[0]?.pokemon_v2_pokemonsprites[0]?.sprites?.other[
          "official-artwork"
        ]?.front_default,
      types: pokemon_v2_pokemons[0]?.pokemon_v2_pokemontypes?.map(
        (type) => type.pokemon_v2_type.name
      ),
    };
  });

  return { data: formattedData, loading, error };
};

export default useGetPokemonSpeciesQuery;

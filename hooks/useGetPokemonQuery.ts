import { gql, useQuery } from "@apollo/client";

interface PokemonData {
  pokemon_v2_pokemon: Pokemon[];
}

interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  pokemon_v2_pokemonspecy: PokemonSpecy;
  pokemon_v2_pokemontypes: PokemonType[];
  pokemon_v2_pokemonstats: PokemonStat[];
}

interface PokemonSpecy {
  pokemon_v2_evolutionchain: EvolutionChain;
  pokemon_v2_pokemonspeciesflavortexts: FlavorText[];
}

interface EvolutionChain {
  pokemon_v2_pokemonspecies: PokemonSpecies[];
}

interface PokemonSpecies {
  id: number;
}

interface FlavorText {
  flavor_text: string;
}

interface PokemonType {
  pokemon_v2_type: Type;
}

interface Type {
  name: string;
}

interface PokemonStat {
  base_stat: number;
  pokemon_v2_stat: Stat;
}

interface Stat {
  name: string;
}

const GET_POKEMON = gql`
  query GetPokemon($id: Int) {
    pokemon: pokemon_v2_pokemon(where: { id: { _eq: $id } }) {
      id
      name
      height
      weight
      pokemon_v2_pokemonspecy {
        pokemon_v2_evolutionchain {
          pokemon_v2_pokemonspecies {
            id
          }
        }
        pokemon_v2_pokemonspeciesflavortexts(
          where: { language_id: { _eq: 9 }, version_id: { _eq: 34 } }
        ) {
          flavor_text
        }
      }
      pokemon_v2_pokemontypes {
        pokemon_v2_type {
          name
        }
      }
      pokemon_v2_pokemonstats {
        base_stat
        pokemon_v2_stat {
          name
        }
      }
    }
  }
`;

interface GetPokemonResponse {
  pokemon: PokemonData;
}

const useGetPokemonQuery = (id: string) => {
  const { data, loading, error } = useQuery<GetPokemonResponse>(GET_POKEMON, {
    variables: { id },
  });

  return { data, loading, error };
};

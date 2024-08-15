const GET_POKEMON = (id: string) => gql`
query GetPokemon {
    pokemon: pokemon_v2_pokemon(where)
}
`;

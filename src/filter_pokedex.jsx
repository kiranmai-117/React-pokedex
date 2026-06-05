const filterPokemon = (pokemon, type) =>
  pokemon.filter((poke) => poke.types.includes(type) || type === "all");

export const updatePokemonByType = (type, pokemon, setPokemon) =>{
  setPokemon(filterPokemon(pokemon, type));
}

const filterPokemon = (pokemon, type) =>
  pokemon.filter((poke) => poke.types.includes(type) || type === "all");

export const updatePokemonByType = (type, pokemon, stateFn) =>
  stateFn(filterPokemon(pokemon, type));

import { data, allTypes } from "./assets/pokemon_data.js";
import { createContext } from "react";

export const PokemonContext = createContext({ pokedex: data, allTypes });

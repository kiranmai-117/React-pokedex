import { useContext, useReducer, useState } from "react";
import { updatePokemonByType } from "./filter_pokedex";
import "./styles/search.css";
import { produce } from "immer";
import { PokemonContext } from "./context";

const searchPokemonByType = (e, pokemon, setPokemon) => {
  e.preventDefault();
  const type = new FormData(e.target).get("search");
  updatePokemonByType(type.toLowerCase(), pokemon, setPokemon);
  e.target.reset();
};

const getSelectedType = (e, props) => {
  const type = e.target.textContent;
  updatePokemonByType(type, props.pokemon, props.setPokemon);
  props.setList([]);
};

const searchReducer = (state, action) => {
  switch (action.type) {
    case "make-list": {
      if (!action.text) return [];
      return produce(action.types, (draft) =>
        draft.filter((type) => type.includes(action.text)),
      );
    }
    case "search-type": {
      updatePokemonByType(action.pType, action.pokemon, action.setPokemon);
      return [];
    }
  }
};

const SuggestionList = (props) => {
  if (!props.list.length) return null;

  const items = props.list.map((item, idx) => <li key={idx}>{item}</li>);
  return <ul onClick={props.handleSelection}>{items}</ul>;
};

const Search = (props) => {
  const [list, dispatch] = useReducer(searchReducer, []);

  const context = useContext(PokemonContext);

  const handleInput = (e) => {
    const text = e.target.value.trim();
    dispatch({ type: "make-list", text, types: context.allTypes });
  };

  const handleSelection = (e) => {
    dispatch({
      type: "search-type",
      pText: e.target.textContent,
      pokemon: context.pokemon,
      setPokemon: context.setPokemon,
    });
  };

  return (
    <form
      className="search"
      onSubmit={(e) => {
        searchPokemonByType(e, context.pokemon, context.setPokemon);
      }}
    >
      <input
        type="text"
        name="search"
        placeholder="search"
        onChange={handleInput}
      />
      <button id="search-btn">search</button>
      <SuggestionList
        list={list}
        handleSelection={handleSelection}
      ></SuggestionList>
    </form>
  );
};

export default Search;

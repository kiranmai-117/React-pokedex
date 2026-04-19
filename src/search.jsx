import { useState } from "react";
import { updatePokemonByType } from "./filter_pokedex";

const searchPokemonByType = (e, props) => {
  e.preventDefault();
  const type = new FormData(e.target).get("search");
  updatePokemonByType(type.toLowerCase(), props.pokemon, props.setPokemon);
  e.target.reset();
};

const getSelectedType = (e, props) => {
  const type = e.target.textContent;
  updatePokemonByType(type, props.pokemon, props.setPokemon);
  props.setList([]);
};

const makeSuggestionList = (e, types, setList) => {
  const text = e.target.value.trim();
  if (text) {
    const relatedType = types.filter((type) => type.includes(text));
    setList(relatedType);
  }
};

const SuggestionList = (props) => {
  const items = props.list.map((item, idx) => <li key={idx}>{item}</li>);
  return <ul onClick={(e) => getSelectedType(e, props)}>{items}</ul>;
};

const Search = (props) => {
  const [list, setList] = useState([]);
  return (
    <form
      className="search"
      onSubmit={(e) => {
        searchPokemonByType(e, props);
      }}
    >
      <input
        type="text"
        name="search"
        placeholder="search"
        onChange={(e) => makeSuggestionList(e, props.types, setList)}
      />
      <button id="search-btn">search</button>
      <SuggestionList
        list={list}
        setPokemon={props.setPokemon}
        setList={setList}
        pokemon={props.pokemon}
      ></SuggestionList>
    </form>
  );
};

export default Search;

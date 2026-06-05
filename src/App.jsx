import "./styles/card_layout.css";
import "./styles/page_layout.css";
import "./styles/colors.css";
import Search from "./search";
import { updatePokemonByType } from "./filter_pokedex";
import { data, allTypes } from "./assets/pokemon_data.js";
import { createContext, useContext, useState } from "react";
import { PokemonContext } from "./context";

const StatsTable = (props) => {
  const rows = [];
  for (const [key, value] of Object.entries(props.stats)) {
    const row = (
      <tr key={key}>
        <td>{key}</td>
        <td>{value}</td>
      </tr>
    );
    rows.push(row);
  }
  return (
    <table className="info">
      <tbody>{rows}</tbody>
    </table>
  );
};

const Types = (props) =>
  props.types.map((type, idx) => (
    <p className={`types ${type}`} key={idx}>
      {type}
    </p>
  ));

const Name = (props) => <h3 className="name">{props.name}</h3>;

const Image = (props) => <img src={props.img} alt="someone" />;

const Card = (props) => (
  <div className="card">
    <Image img={props.data.img}></Image>
    <div className="header">
      <Name name={props.data.name}></Name>
      <Types types={props.data.types}></Types>
    </div>
    <StatsTable stats={props.data.stats}></StatsTable>
  </div>
);

const Pokedex = (props) => {
  const pokemon = props.pokemon;
  const cards = pokemon.map((poke, idx) => <Card data={poke} key={idx}></Card>);
  return <div className="card-container">{cards}</div>;
};

const NavBar = (props) => {
  const context = useContext(PokemonContext);
  const types = context.allTypes.map((type) => (
    <button
      className="nav-btn"
      id={type}
      key={type}
      onClick={({ target }) =>
        updatePokemonByType(target.id, context.pokemon, context.setPokemon)
      }
    >
      {type}
    </button>
  ));
  return (
    <nav className="sidebar">
      <Search></Search>
      {types}
    </nav>
  );
};

const App = (props) => {
  const [pokemon, setPokemon] = useState(props.pokemon);
  const context = useContext(PokemonContext);

  return (
    <PokemonContext value={{ ...context, pokemon, setPokemon }}>
      <NavBar key="nav"></NavBar>
      <Pokedex pokemon={pokemon} type="all" key="pokedex"></Pokedex>
    </PokemonContext>
  );
};

export default App;

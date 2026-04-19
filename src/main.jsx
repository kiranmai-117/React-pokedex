import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { data, allTypes } from "./assets/pokemon_data.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App pokemon={data} allTypes={allTypes} />
  </StrictMode>,
);

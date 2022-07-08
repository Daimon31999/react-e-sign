import React, { useReducer } from "react";
import ESign from "../Svelte";
import { reducer, initialState } from "./store";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="App">
      <ESign state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;

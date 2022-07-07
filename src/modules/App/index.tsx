/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useReducer } from "react";
import ESign from "../Svelte";
import { reducer, initialState } from "./store";

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    console.log("stadsaadsadte", state.pdfName);
  }, [state]);

  return (
    <div className="App">
      <ESign state={state} dispatch={dispatch} />
    </div>
  );
};

export default App;

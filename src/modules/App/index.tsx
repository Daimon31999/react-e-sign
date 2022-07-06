/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { useReducer } from "react";
import { IDrawingObj } from "./types/IDrawingObj";
import { readAsPDF } from "../../utils/js/asyncReader";
import { ggID } from "../../utils/js/helper";
import prepareAssets, {
  getAsset,
  fetchFont,
} from "../../utils/js/prepareAssets";
import { addPDF, onUploadPDF } from "./helpers";
import { initialState, reducer } from "./store";
import ESign from "../Svelte";

// for generating PDF
getAsset("pdfjsLib");

const App: React.FC = () => {
  const genID = ggID();
  const [state, dispatch] = useReducer(reducer, initialState);

  // utils functions declarations

  // for test purpose
  useEffect(() => {
    const loadTestPdf = async () => {
      try {
        const res = await fetch(require("./test.pdf"));
        const pdfBlob = await res.blob();

        await addPDF(pdfBlob, state, dispatch);

        dispatch({ type: "setSelectedPageIndex", payload: 0 });

        setTimeout(() => {
          fetchFont(state.currentFont);
          prepareAssets();
        }, 5000);
      } catch (e) {
        console.log(e);
      }
    };

    loadTestPdf();
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        name="pdf"
        id="pdf"
        accept="application/pdf"
        onChange={(e) => onUploadPDF(e, state, dispatch)}
      />
      <h1>hell</h1>
      <ESign />
    </div>
  );
};

export default App;

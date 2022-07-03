/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from "react";
import { IDrawingObj } from "../../types/IDrawingObj";
import { IPdfFile } from "../../types/IPdfFile";
import { readAsPDF } from "../../utils/js/asyncReader";
import { ggID } from "../../utils/js/helper";
import prepareAssets, {
  getAsset,
  fetchFont,
} from "../../utils/js/prepareAssets";

// for generating PDF
getAsset("pdfjsLib");
const App: React.FC = () => {
  const genID = ggID();
  // TODO: add type File
  const [pdfFile, setPdfFile] = useState<IPdfFile>();
  const [pdfName, setPdfName] = useState<string>("");
  const [pages, setPages] = useState<any>([]);
  const [pageScale, setPageScale] = useState<number[]>([]);
  const [allObjects, setAllObjects] = useState<IDrawingObj[]>([]);
  const [currentFont, setCurrentFont] = useState<string>("Times-Roman");
  const [selectedPageIndex, setSelectedPageIndex] = useState<number>(-1);
  const [saving, setSaving] = useState<boolean>(false);
  // is drawing modal open
  const [addingDrawing, setAddingDrawing] = useState<boolean>(false);

  // utils functions declarations
  const addPDF = async (file: any) => {
    try {
      console.log("file", file);
      const pdf = await readAsPDF(file);
      const numPages = pdf.numPages;

      setPdfName(file.name);
      setPdfFile(file);
      setPages(
        Array(numPages)
          .fill(undefined)
          .map((_, i) => pdf.getPage(i + 1))
      );
      setAllObjects(pages.map(() => []));
      setPageScale(Array(numPages).fill(1));
    } catch (e) {
      console.log("Failed to add pdf.");
      throw e;
    }
  };

  // for test purpose
  useEffect(() => {
    const loadTestPdf = async () => {
      try {
        const res = await fetch(require("./test.pdf"));
        const pdfBlob = await res.blob();

        await addPDF(pdfBlob);

        setSelectedPageIndex(0);

        setTimeout(() => {
          fetchFont(currentFont);
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
      <h1>hell</h1>
    </div>
  );
};

export default App;
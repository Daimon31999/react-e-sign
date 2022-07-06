import { IAction } from "./types/IAction";
import { IState } from "./types/IState";
import {
  readAsDataURL,
  readAsImage,
  readAsPDF,
} from "../../utils/js/asyncReader";
import { save } from "../../utils/js/PDF";
import { fetchFont } from "../../utils/js/prepareAssets";

type IDispatch = React.Dispatch<IAction>;

export const addPDF = async (file: any, state: IState, dispatch: IDispatch) => {
  try {
    const pdf = await readAsPDF(file);
    const numPages = pdf.numPages;

    dispatch({ type: "setPdfName", payload: file.name });
    dispatch({ type: "setPdfFile", payload: file });
    dispatch({
      type: "setPages",
      payload: Array(numPages)
        .fill(undefined)
        .map((_, i) => pdf.getPage(i + 1)),
    });

    dispatch({ type: "setAllObjects", payload: state.pages.map(() => []) });
    dispatch({ type: "setPagesScale", payload: Array(numPages).fill(1) });
  } catch (e) {
    console.log("Failed to add pdf.");
    throw e;
  }
};

export const onUploadPDF = async (
  e: any,
  state: IState,
  dispatch: IDispatch
) => {
  const files = e.target.files || (e.dataTransfer && e.dataTransfer.files);
  const file = files[0];

  if (!file || file.type !== "application/pdf") return;

  dispatch({ type: "setSelectedPageIndex", payload: -1 });

  try {
    await addPDF(file, state, dispatch);

    dispatch({ type: "setSelectedPageIndex", payload: 0 });
  } catch (e) {
    console.log(e);
  }
};

export const addImage = async (
  file: any,
  state: IState,
  dispatch: IDispatch,
  getId: () => number
) => {
  try {
    // get dataURL to prevent canvas from tainted
    const url = await readAsDataURL(file);
    const img = await readAsImage(url);

    // BUG: possible bug here
    const id = getId();
    const { width, height } = img;
    const object = {
      id,
      type: "image",
      width,
      height,
      x: 0,
      y: 0,
      payload: img,
      file,
    };

    const payload = state.allObjects.map((objects, pIndex) =>
      pIndex === state.selectedPageIndex ? [...objects, object] : objects
    );

    dispatch({ type: "setAllObjects", payload: payload });
  } catch (e) {
    console.log(`Fail to add image.`, e);
  }
};

export const onUploadImage = (
  e: any,
  state: IState,
  dispatch: IDispatch,
  genId: () => number
) => {
  // BUG: possible bug here
  const file = e.target.files && e.target.files[0];

  if (file && state.selectedPageIndex >= 0) {
    addImage(file, state, dispatch, genId);
  }

  e.target.value = null;
};

export const onAddTextField = (
  state: IState,
  dispatch: IDispatch,
  genID: () => number,
  text = "New Text Field"
) => {
  const { selectedPageIndex, allObjects, currentFont } = state;

  if (selectedPageIndex >= 0) {
    const id = genID();

    fetchFont(currentFont);

    const object = {
      id,
      text,
      type: "text",
      size: 16,
      width: 0, // recalculate after editing
      lineHeight: 1.4,
      fontFamily: currentFont,
      x: 0,
      y: 0,
    };

    const payload = allObjects.map((objects, pIndex) =>
      pIndex === selectedPageIndex ? [...objects, object] : objects
    );

    dispatch({ type: "setAllObjects", payload });
  }
};

export const onAddDrawing = (state: IState, dispatch: IDispatch) => {
  if (state.selectedPageIndex >= 0) {
    dispatch({ type: "setAddingDrawing", payload: true });
  }
};

export const addDrawing = (
  originWidth: number,
  originHeight: number,
  path: string,
  scale = 1,
  state: IState,
  dispatch: IDispatch,
  getId: () => number
) => {
  const id = getId();

  const object = {
    id,
    path,
    type: "drawing",
    x: 0,
    y: 0,
    originWidth,
    originHeight,
    width: originWidth * scale,
    scale,
  };

  const payload = state.allObjects.map((objects, pIndex) =>
    pIndex === state.selectedPageIndex ? [...objects, object] : objects
  );

  dispatch({ type: "setAllObjects", payload });
};

export const selectFontFamily = (e: any, dispatch: IDispatch) => {
  const name = e.detail.name;
  fetchFont(name);

  dispatch({ type: "setCurrentFont", payload: name });
};

export const selectPage = (index: number, dispatch: IDispatch) => {
  dispatch({ type: "setSelectedPageIndex", payload: index });
};

export const updateObject = (
  objectId: number,
  payload: any,
  state: IState,
  dispatch: IDispatch
) => {
  const { allObjects, selectedPageIndex } = state;

  const computedPayload = allObjects.map((objects, pIndex) =>
    pIndex == selectedPageIndex
      ? objects.map((object) =>
          object.id === objectId ? { ...object, ...payload } : object
        )
      : objects
  );

  dispatch({ type: "setAllObjects", payload: computedPayload });
};

export const deleteObject = (
  objectId: number,
  state: IState,
  dispatch: IDispatch
) => {
  const { allObjects, selectedPageIndex } = state;

  const payload = allObjects.map((objects, pIndex) =>
    pIndex == selectedPageIndex
      ? objects.filter((object) => object.id !== objectId)
      : objects
  );

  dispatch({ type: "setAllObjects", payload });
};

export const onMeasure = (
  scale: number,
  index: number,
  dispatch: IDispatch
) => {
  dispatch({ type: "setPagesScale", payload: { index, scale } });
};

export const savePDF = async (state: IState, dispatch: IDispatch) => {
  const { pdfFile, saving, pages, allObjects, pdfName } = state;

  if (!pdfFile || saving || !pages.length) return;

  dispatch({ type: "setSaving", payload: true });
  try {
    await save(pdfFile, allObjects, pdfName);
  } catch (e) {
    console.log(e);
  } finally {
    dispatch({ type: "setSaving", payload: false });
  }
};

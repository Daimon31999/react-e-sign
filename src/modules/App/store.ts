import { IAction } from "./types/IAction";
import { IState } from "./types/IState";

export const reducer = (state: IState, action: IAction): IState => {
  const { type, payload } = action;

  switch (type) {
    case "setPdfFile":
      return { ...state, pdfFile: payload };
    case "setPdfName":
      return { ...state, pdfName: payload };
    case "setPages":
      return { ...state, pages: payload };
    case "setPagesScale":
      let computedPagesScale = state.pagesScale;

      if (Array.isArray(payload)) {
        computedPagesScale = payload;
      } else {
        computedPagesScale[payload.index] = payload.scale;
      }

      return { ...state, pagesScale: computedPagesScale };
    case "setAllObjects":
      return { ...state, allObjects: payload };
    case "setCurrentFont":
      return { ...state, currentFont: payload };
    case "setSelectedPageIndex":
      return { ...state, selectedPageIndex: payload };
    case "setSaving":
      return { ...state, saving: payload };
    case "setAddingDrawing":
      return { ...state, addingDrawing: payload };
    default:
      throw new Error("unknown action type");
  }
};

export const initialState: IState = {
  pdfFile: undefined,
  pdfName: "",
  pages: [],
  pagesScale: [],
  allObjects: [],
  currentFont: "Times-Roman",
  selectedPageIndex: -1,
  saving: false,
  addingDrawing: false,
};

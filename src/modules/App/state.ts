import { IAction } from "../../types/IAction";
import { IState } from "../../types/IState";

export const reducer = (state: IState, { type, payload }: IAction): IState => {
  switch (type) {
    case "setPdfFile":
      return { ...state, pdfFile: payload };
    case "setPdfName":
      return { ...state, pdfName: payload };
    case "setPages":
      return { ...state, pages: payload };
    case "setPageScale":
      return { ...state, pageScale: payload };
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
  pageScale: [],
  allObjects: [],
  currentFont: "Times-Roman",
  selectedPageIndex: -1,
  saving: false,
  addingDrawing: false,
};

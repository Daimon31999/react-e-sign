import { IState } from "./IState";

interface IPdfFileActionType {
  type: "setPdfFile";
  payload: IState["pdfFile"];
}

interface IPdfNameActionType {
  type: "setPdfName";
  payload: IState["pdfName"];
}

interface IPagesActionType {
  type: "setPages";
  payload: IState["pages"];
}

interface IPagesScaleActionType {
  type: "setPagesScale";
  payload: IState["pagesScale"] | { index: number; scale: number };
}

interface IAllObjectsScaleActionType {
  type: "setAllObjects";
  payload: IState["allObjects"];
}

interface ICurrentFontActionType {
  type: "setCurrentFont";
  payload: IState["currentFont"];
}

interface ISelectedPageIndexActionType {
  type: "setSelectedPageIndex";
  payload: IState["selectedPageIndex"];
}

interface ISavingActionType {
  type: "setSaving";
  payload: IState["saving"];
}

interface IAddingDrawingActionType {
  type: "setAddingDrawing";
  payload: IState["addingDrawing"];
}

export type IAction =
  | IPdfFileActionType
  | IPdfNameActionType
  | IPagesActionType
  | IPagesScaleActionType
  | IAllObjectsScaleActionType
  | ICurrentFontActionType
  | ISelectedPageIndexActionType
  | ISavingActionType
  | IAddingDrawingActionType;

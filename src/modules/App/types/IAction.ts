import { IState } from "./IState";

interface IPdfFileAction {
  type: "setPdfFile";
  payload: IState["pdfFile"];
}

interface IPdfNameAction {
  type: "setPdfName";
  payload: IState["pdfName"];
}

interface IPagesAction {
  type: "setPages";
  payload: IState["pages"];
}

interface IPagesScaleAction {
  type: "setPagesScale";
  payload: IState["pagesScale"] | { index: number; scale: number };
}

interface IAllObjectsScaleAction {
  type: "setAllObjects";
  payload: IState["allObjects"];
}

interface ICurrentFontAction {
  type: "setCurrentFont";
  payload: IState["currentFont"];
}

interface ISelectedPageIndexAction {
  type: "setSelectedPageIndex";
  payload: IState["selectedPageIndex"];
}

interface ISavingAction {
  type: "setSaving";
  payload: IState["saving"];
}

interface IAddingDrawingAction {
  type: "setAddingDrawing";
  payload: IState["addingDrawing"];
}

export type IAction =
  | IPdfFileAction
  | IPdfNameAction
  | IPagesAction
  | IPagesScaleAction
  | IAllObjectsScaleAction
  | ICurrentFontAction
  | ISelectedPageIndexAction
  | ISavingAction
  | IAddingDrawingAction;

export type actionTypes = IAction["type"];

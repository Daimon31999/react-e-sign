import { IDrawingObj } from "./IDrawingObj";
import { IPdfFile } from "./IPdfFile";

export interface IState {
  pdfFile: IPdfFile | undefined;
  pdfName: string;
  pages: any[];
  pageScale: number[];
  allObjects: IDrawingObj[][];
  currentFont: string;
  selectedPageIndex: number;
  saving: boolean;
  addingDrawing: boolean;
}

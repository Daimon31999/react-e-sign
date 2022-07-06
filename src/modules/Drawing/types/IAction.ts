import { IState } from "./IState";

// export interface IState {
//   startX: NumberUndefined;
//   startY: NumberUndefined;
//   svg: any;
//   operation: string;
//   dx: number;
//   dy: number;
//   dw: number;
//   direction: string;
// }

interface IStartXAction {
  type: "setStartX";
  payload: IState["startX"];
}

interface IStartYAction {
  type: "setStartY";
  payload: IState["startY"];
}

interface ISvgAction {
  type: "setSvg";
  payload: IState["svg"];
}

interface IOperationAction {
  type: "setOperation";
  payload: IState["operation"];
}

export type IAction = IStartXAction | IStartYAction;

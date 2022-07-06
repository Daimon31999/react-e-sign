import { IAction } from "./types";
import { IState } from "./types";

export const reducer = (state: IState, { type, payload }: IAction): IState => {
  switch (type) {
    case "setStartX":
      return { ...state, startX: payload };
    case "setStartY":
      return { ...state, startY: payload };
    case "setSvg":
      return { ...state, svg: payload };
    case "setOperation":
      return { ...state, operation: payload };

    case "setDx":
      return { ...state, dx: payload };
    case "dy":
      return { ...state, dy: payload };
    case "dw":
      return { ...state, dw: payload };
    case "direction":
      return { ...state, direction: payload };
    default:
      throw new Error("unknown action type");
  }
};

export const initialState: IState = {
  startX: undefined,
  startY: undefined,
  svg: undefined,
  operation: "",
  dx: 0,
  dy: 0,
  dw: 0,
  direction: "",
};

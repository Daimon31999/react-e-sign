export type IDrawingObj =
  // drawing
  | {
      id: number;
      type: string;
      path: string;
      width: number;
      x: number;
      y: number;
      originWidth: number;
      originHeight: number;
      scale: number;
    }
  // image
  | {
      id: number;
      type: string;
      width: any;
      height: any;
      x: number;
      y: number;
      payload: any;
      file: any;
    }
  // text
  | {
      id: number;
      text: string;
      type: string;
      size: number;
      width: number;
      lineHeight: number;
      fontFamily: string;
      x: number;
      y: number;
    };

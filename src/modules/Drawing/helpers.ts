export default {};

// import React from "react";
// import { IAction, IState } from "./types";

// export const renderSvg = (
//   state: IState,
//   originWidth: number,
//   originHeight: number
// ) => {
//   // BUG: possible bug (probably dispatch needed)
//   state.svg.setAttribute("viewBox", `0 0 ${originWidth} ${originHeight}`);
// };

// export const handlePanMove = (
//   event: any,
//   state: IState,
//   dispatch: React.Dispatch<IAction>,
//   pageScale: number
// ) => {
//   const { startX, startY, operation, direction, dx, dy, dw } = state;

//   if (startX && startY) {
//     const _dx = (event.detail.x - startX) / pageScale;
//     const _dy = (event.detail.y - startY) / pageScale;

//     if (operation === "move") {
//       dispatch({});
//       dx = _dx;
//       dy = _dy;
//     } else if (operation === "scale") {
//       if (direction === "left-top") {
//         let d = Infinity;
//         d = Math.min(_dx, _dy * ratio);
//         dx = d;
//         dw = -d;
//         dy = d / ratio;
//       }

//       if (direction === "right-bottom") {
//         let d = -Infinity;
//         d = Math.max(_dx, _dy * ratio);
//         dw = d;
//       }
//     }
//   }
// };

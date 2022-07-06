import React from "react";
import { IProps } from "./types";

const Drawing: React.FC<IProps> = (props) => {
  const { path, x, y, width, originHeight, originWidth, pageScale } = props;
  const ratio = originWidth / originHeight;

  return <div>Drawing</div>;
};

export default Drawing;

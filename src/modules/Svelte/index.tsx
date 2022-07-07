import React, { useEffect, useRef } from "react";
import { IAction } from "../App/types/IAction";
import { IState } from "../App/types/IState";

import SvelteComponent from "./src/App.svelte";

interface IProps {
  state: IState;
  dispatch: React.Dispatch<IAction>;
}

const ESign: React.FC<IProps> = ({ state, dispatch }) => {
  const ref = useRef(null);

  useEffect(() => {
    const component = new SvelteComponent({
      target: ref.current,
      props: { state, dispatch },
    });

    return () => {
      component.$destroy();
    };
  }, [ref]);

  return <div ref={ref} />;
};

export default ESign;

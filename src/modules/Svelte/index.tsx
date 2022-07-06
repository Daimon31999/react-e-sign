import React, { useEffect, useRef } from "react";

import SvelteComponent from "./src/App.svelte";

const ESign: React.FC = () => {
  const ref = useRef(null);

  useEffect(() => {
    const component = new SvelteComponent({
      target: ref.current,
    });

    return () => {
      component.$destroy();
    };
  }, [ref]);

  return <div ref={ref} />;
};

export default ESign;

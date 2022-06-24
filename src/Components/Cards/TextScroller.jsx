import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

const TextScroller = ({ text }) => {
  const [key, setKey] = useState(1);

  const scrolling = useSpring({
    from: { transform: "translate(80%,30%)" },
    to: { transform: "translate(-90%,0)" },
    config: { duration: 9000 },
    reset: true,
    //reverse: key % 2 == 0,
    onRest: () => {
      setKey(key + 1);
    },
  });

  return (
    <span key={key}>
      <animated.div style={scrolling}>
        <h6>{text}</h6>
      </animated.div>
    </span>
  );
};

export default TextScroller;


import React, { useState, useEffect } from "react";
import { Animate } from "react-move";

export const AnimatedProgressProvider = ({
  valueStart,
  valueEnd,
  duration,
  easingFunction,
  children
}) => {
  const [isAnimated, setIsAnimated] = useState(false);

  useEffect(() => {
    setIsAnimated(true);
  }, []);

  return (
    <Animate
      start={() => ({
        value: valueStart
      })}
      update={() => ({
        value: [isAnimated ? valueEnd : valueStart],
        timing: {
          duration: isAnimated ? duration * 1000 : 0,
          ease: easingFunction
        }
      })}
    >
      {({ value }) => children(value)}
    </Animate>
  );
};

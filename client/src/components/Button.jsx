import React from "react";

import { useStateContext } from "../contexts/ContextProvider";

const Button = ({
  icon,
  bgColor,
  color,
  bgHoverColor,
  size,
  text,
  borderRadius,
  topMenu,
}) => {
  const { handleClick } = useStateContext();
  return (
    <button
      type="button"
      style={{ backgroundColor: bgColor, color, borderRadius }}
      className={`text-${size} p-3 hover:drop-shadow-xl hover:bg-${bgHoverColor} `}
      onClick={() => handleClick(topMenu)}
    >
      {icon} {text}
    </button>
  );
};

export default Button;

import React from "react";

const RoundButton = ({
  children,
  type = "button",
  btnType = "primary",
  onClick = () => {},
  className = "",
}) => {
  return (
    <button
      className={`btn m-1 btn-circle btn-${btnType} ${className}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default RoundButton;

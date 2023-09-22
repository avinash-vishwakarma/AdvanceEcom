import React from "react";

const Button = ({
  btnType = "primary",
  btnClass = "w-100",
  type = "button",
  children,
  isLoading,
  onClick = () => {},
}) => {
  return (
    <button
      className={`btn btn-${btnType} ${btnClass}`}
      type={type}
      disabled={isLoading}
      onClick={onClick}
    >
      {isLoading && (
        <div class="spinner-border spinner-border-sm text-light" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      )}

      {children}
    </button>
  );
};

export default Button;

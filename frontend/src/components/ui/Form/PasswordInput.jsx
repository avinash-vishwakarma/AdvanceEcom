import React, { useState } from "react";

const PasswordInput = ({ name, placeholder = "Enter Password" }) => {
  const [showInput, setShowInput] = useState(false);

  return (
    <div className="form-group position-relative">
      <input
        className="form-control"
        id="psw-input"
        type={showInput ? "text" : "password"}
        placeholder={placeholder}
        name={name}
      />
      <div
        className={`position-absolute ${showInput && "active"}`}
        id="password-visibility"
        onClick={() => {
          setShowInput((old) => !old);
        }}
      >
        <i className="bi bi-eye"></i>
        <i className="bi bi-eye-slash"></i>
      </div>
    </div>
  );
};

export default PasswordInput;

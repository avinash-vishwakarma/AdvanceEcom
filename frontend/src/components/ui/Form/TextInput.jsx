import React from "react";

const TextInput = ({ name, placeholder }) => {
  return (
    <div className="form-group text-start mb-3">
      <input
        className="form-control"
        name={name}
        type="text"
        placeholder={placeholder}
      />
    </div>
  );
};

export default TextInput;

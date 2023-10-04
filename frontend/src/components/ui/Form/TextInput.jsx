import React, { useState } from "react";

const TextInput = ({ name, placeholder, value, title }) => {
  const [textValue, setTextValue] = useState(value || "");

  const updateInputValue = (e) => {
    setTextValue(e.target.value);
  };

  return (
    <div className="form-group text-start mb-3">
      {title && <label className="form-label">{title}</label>}
      <input
        className="form-control"
        name={name}
        type="text"
        placeholder={placeholder}
        value={textValue}
        onChange={updateInputValue}
      />
    </div>
  );
};

export default TextInput;

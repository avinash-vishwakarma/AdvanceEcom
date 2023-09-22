import React from "react";

const EmailInput = ({ name, placeholder = "Email address" }) => {
  return (
    <div className="form-group text-start mb-3">
      <input
        className="form-control"
        name={name}
        type="email"
        placeholder={placeholder}
      />
    </div>
  );
};

export default EmailInput;

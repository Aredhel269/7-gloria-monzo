import React from "react";

const Input = ({ value, onChange, ...props }) => {
  return (
    <input value={value} onChange={onChange} {...props} />
  );
};

export default Input;

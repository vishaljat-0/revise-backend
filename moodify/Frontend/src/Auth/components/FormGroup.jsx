import React from "react";

function FormGroup({ label, placeholder, value, onChange }) {
  return (
    <div className="FromGroup">
      <label htmlFor={label}>{label}</label>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={label}
        id={label}
      />
    </div>
  );
}

export default FormGroup;

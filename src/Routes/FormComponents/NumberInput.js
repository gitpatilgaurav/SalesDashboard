import React from "react";

export default function NumberInput({ label, id, placeholder, value, onChange }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="number"
        className="form-control"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
     
     </>
  );
}

import React from "react";

export default function TextInput({ label, id, placeholder, value, onChange }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

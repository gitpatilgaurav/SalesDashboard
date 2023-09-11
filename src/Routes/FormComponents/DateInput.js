import React from "react";

export default function DateInput({ label, id, value, onChange }) {
  return (
    <>
      <label htmlFor={id}>{label}</label>
      <input
        type="date"
        className="form-control"
        id={id}
        value={value}
        onChange={onChange}
      />
    </>
  );
}

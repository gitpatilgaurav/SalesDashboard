import React from "react";

export default function TextInput(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="text"
        className="form-control"
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}

import React from "react";

export default function DateInput(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="date"
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
    </>
  );
}

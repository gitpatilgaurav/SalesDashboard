import React from "react";

export default function NumberInput(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <input
        type="number"
        className="form-control"
        placeholder={props.placeholder}
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      />
     
     </>
  );
}

import React from 'react';

export default function SelectInput(props) {
  return (
    <>
      <label htmlFor={props.id}>{props.label}</label>
      <select
        className="form-control"
        id={props.id}
        value={props.value}
        onChange={props.onChange}
      >
        <option value="" disabled>
          {props.label}
        </option>
        {props.options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    </>
  );
}

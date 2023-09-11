import React from "react";

export default function ResetForm(props) {
  const handleReset = () => {
    props.setProductCategory("");
    props.setSubCategory("");
    props.setUnitPrice("");
    props.setUnitCost("");
    props.setDate("");
    props.setQuantity("");
    props.setAge("");
    props.setGender("");
    props.setCountry("");
    props.setState("");
    props.setShowSuccess(false);
  };

  return (
    <button className="btn btn-danger" onClick={handleReset}>
      Reset
    </button>
  );
}

import React from "react";

export default function SuccessMessage(props) {
  const formData = props.formData;

  const handleEditClick = () => {
    if (props.onClosePopup) {
      props.onClosePopup();
    }
  };

  return (
    <div className="success">
      <div className="submit-message">
        <p>Your submission details</p>
        <div className="form-data">
          <p>Product Category: {formData.productCategory}</p>
          <p>Sub Category: {formData.subCategory}</p>
          <p>Unit Price: {formData.unitPrice}</p>
          <p>Unit Cost: {formData.unitCost}</p>
          <p>Date: {formData.date}</p>
          <p>Quantity: {formData.quantity}</p>
          <p>Age: {formData.age}</p>
          <p>Gender: {formData.gender}</p>
          <p>Country: {formData.country}</p>
          <p>State: {formData.state}</p>
        </div>
        <button className="btn btn-danger close" onClick={handleEditClick}>
          Close
        </button>
      </div>
    </div>
  );
}

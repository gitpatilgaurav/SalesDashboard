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
          <p>Product Category: {formData.product_category}</p>
          <p>Sub Category: {formData.sub_category}</p>
          <p>Unit Price: {formData.unit_price}</p>
          <p>Unit Cost: {formData.unit_cost}</p>
          <p>Date: {formData.date}</p>
          <p>Quantity: {formData.quantity}</p>
          <p>Age: {formData.customer_age}</p>
          <p>Gender: {formData.customer_gender}</p>
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

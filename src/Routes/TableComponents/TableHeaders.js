import React from "react";

export default function TableHeaders({ onSorting }) {
  function onIDClick() {
    onSorting("index");
  }
  function onDateClick() {
    onSorting("date");
  }
  function onYearClick() {
    onSorting("year");
  }
  function onMonthClick() {
    onSorting("month");
  }
  function onAgeClick() {
    onSorting("customer_age");
  }
  function onGenderClick() {
    onSorting("customer_gender");
  }
  function onCountryClick() {
    onSorting("country");
  }
  function onStateClick() {
    onSorting("state");
  }
  function onPCClick() {
    onSorting("product_category");
  }
  function onSCClick() {
    onSorting("sub_category");
  }
  function onUCClick() {
    onSorting("unit_cost");
  }
  function onUPClick() {
    onSorting("unit_price");
  }
  function onCostClick() {
    onSorting("cost");
  }
  function onRevenueClick() {
    onSorting("revenue");
  }
  function onQuantityClick() {
    onSorting("quantity");
  }

  return (
    <tr>
      <th onClick={onIDClick}>ID</th>
      <th onClick={onDateClick}>Date</th>
      <th onClick={onYearClick}>Year</th>
      <th onClick={onMonthClick}>Month</th>
      <th onClick={onAgeClick}>Age</th>
      <th onClick={onGenderClick}>Gender</th>
      <th onClick={onCountryClick}>Country</th>
      <th onClick={onStateClick}>State</th>
      <th onClick={onPCClick}>Product Category</th>
      <th onClick={onSCClick}>Sub Category</th>
      <th onClick={onQuantityClick}>Quantity</th>
      <th onClick={onUCClick}>Unit Cost</th>
      <th onClick={onUPClick}>Unit Price</th>
      <th onClick={onCostClick}>Cost</th>
      <th onClick={onRevenueClick}>Revenue</th>
    </tr>
  );
}
    
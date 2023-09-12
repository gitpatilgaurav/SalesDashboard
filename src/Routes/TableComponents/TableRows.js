import React from "react";

export default function TableRows({ apiData, search, page, itemsPerPage }) {
  return apiData
    .filter((data) => {
      if (search === "") {
        return true;
      }
      const searchTerm = search.toLowerCase().trim();
      for (const key in data) {
        if (
          data[key] &&
          data[key].toString().toLowerCase().includes(searchTerm)
        ) {
          return true;
        }
      }
      return false;
    })
    .slice((page - 1) * itemsPerPage, page * itemsPerPage)
    .map((data, index) => (
      <tr key={index}>
        <td>{data.index}</td>
        <td>{data.date}</td>
        <td>{data.year}</td>
        <td>{data.month}</td>
        <td>{data.customer_age || data.age}</td>
        <td>{data.customer_gender || data.gender}</td>
        <td>{data.country}</td>
        <td>{data.state}</td>
        <td>{data.product_category || data.productCategory}</td>
        <td>{data.sub_category || data.subCategory}</td>
        <td>{data.quantity}</td>
        <td>{data.unit_cost || data.unitCost}</td>
        <td>{data.unit_price || data.unitPrice}</td>
        <td>{data.cost}</td>
        <td>{data.revenue}</td>
      </tr>
    ));
}
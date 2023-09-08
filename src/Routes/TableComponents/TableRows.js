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
        <td>{data.customer_age}</td>
        <td>{data.customer_gender}</td>
        <td>{data.country}</td>
        <td>{data.state}</td>
        <td>{data.product_category}</td>
        <td>{data.sub_category}</td>
        <td>{data.quantity}</td>
        <td>{data.unit_cost}</td>
        <td>{data.unit_price}</td>
        <td>{data.cost}</td>
        <td>{data.revenue}</td>
      </tr>
    ));
}

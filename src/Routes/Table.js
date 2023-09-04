import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function Table() {
  const apiData = useSelector((state) => state.ApiReducer);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const itemsPerPage = 10;
  const pagesToShow = 10;
  function TableRows() {
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

  function onSearchHandeler(e) {
    setSearch(e.target.value);
    console.log(search);
  }

  const totalPages = Math.ceil(apiData.length / itemsPerPage);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };
  function handleNextPage() {
    handlePageChange(page + 1);
  }
  function handlePrevPage() {
    handlePageChange(page - 1);
  }
  function onPageNumber(newPage) {
    return function () {
      handlePageChange(newPage);
    };
  }

  const startPage = Math.max(1, page - Math.floor(pagesToShow / 2));
  const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

  return (
    <>
      <div className="table-responsive">
        <div className="table-container">
          <div className="input">
            <input
              type="text"
              name=""
              id=""
              className="input"
              placeholder="Type to search"
              onChange={onSearchHandeler}
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Year</th>
                <th>Month</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Country</th>
                <th>State</th>
                <th>Product Category</th>
                <th>Sub Category</th>
                <th>Quantity</th>
                <th>Unit Cost</th>
                <th>Unit Price</th>
                <th>Cost</th>
                <th>Revenue</th>
              </tr>
            </thead>
            <tbody>
              <TableRows />
            </tbody>
          </table>
          {apiData.length > 0 && (
            <div className="pagination">
              <span
                onClick={handlePrevPage}
                className={page === 1 ? "disabled" : ""}
              >
                ◀
              </span>
              {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                <span
                  key={i}
                  onClick={onPageNumber(startPage + i)}
                  className={page === startPage + i ? "active" : ""}
                >
                  {startPage + i}
                </span>
              ))}
              <span
                onClick={handleNextPage}
                className={page === totalPages ? "disabled" : ""}
              >
                ▶
              </span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

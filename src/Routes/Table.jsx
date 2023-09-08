import React, { useState } from "react";
import { useSelector } from "react-redux";
import TableRows from "./TableComponents/TableRows";
import TableHeaders from "./TableComponents/TableHeaders";

export default function Table() {
  const apiData = useSelector((state) => state.ApiReducer);

  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("ASC");

  function onSorting(col) {
    setOrder(order === "ASC" ? "DESC" : "ASC");
    const sorted = [...apiData].sort((a, b) => {
      if (col === "date") {
        const dateA = new Date(a[col]);
        const dateB = new Date(b[col]);
        if (order === "ASC") {
          return dateA - dateB;
        } else {
          return dateB - dateA;
        }
      } else if (col === "month") {
        const monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December",
        ];

        if (order === "ASC") {
          return monthNames.indexOf(a[col]) - monthNames.indexOf(b[col]);
        } else {
          return monthNames.indexOf(b[col]) - monthNames.indexOf(a[col]);
        }
      } else if (typeof a[col] === "string" && typeof b[col] === "string") {
        const strA = a[col].toLowerCase();
        const strB = b[col].toLowerCase();

        if (order === "ASC") {
          if (strA < strB) return -1;
          if (strA > strB) return 1;
          return 0;
        } else {
          if (strA > strB) return -1;
          if (strA < strB) return 1;
          return 0;
        }
      } else {
        if (order === "ASC") {
          return a[col] - b[col];
        } else {
          return b[col] - a[col];
        }
      }
    });

    apiData.length = 0;
    apiData.push(...sorted);
  }

  function onSearchHandeler(e) {
    setSearch(e.target.value);
  }

  const itemsPerPage = 10;
  const pagesToShow = 10;

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
              className="input"
              placeholder="Type to search"
              onChange={onSearchHandeler}
            />
          </div>
          <table className="table table-bordered">
            <thead>
              <TableHeaders onSorting={onSorting} />
            </thead>
            <tbody>
              <TableRows
                apiData={apiData}
                search={search}
                page={page}
                itemsPerPage={itemsPerPage}
              />
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
              {Array.from({ length: endPage - startPage + 1 }, (index, i) => (
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

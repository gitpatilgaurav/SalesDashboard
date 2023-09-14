import React from "react";

export default function CombinedFilter(props) {
  return (
    <div className="filters">
      <div className="yearDropdown">
        <select onChange={props.onYearChange} value={props.selectedYear}>
          <option value="">All Years</option>
          {props.yearOptions.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div className="yearDropdown">
        <select onChange={props.onMonthChange} value={props.selectedMonth}>
          <option value="">All Months</option>
          {props.months.map((month) => (
            <option key={month} value={month}>
              {month}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

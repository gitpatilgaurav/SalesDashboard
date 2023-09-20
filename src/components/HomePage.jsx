import React, { useState } from "react";
import { Routes, Route } from "react-router";
import _ from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import Home from "../Routes/Home";
import Sales from "../Routes/Sales";
import Table from "../Routes/Table";
import Form from "../Routes/Form";
import Navbar from "./Navbar";
import Inventory from "../Routes/Inventory";
import Error404 from "../Routes/Error404";
import AboutUS from "../Routes/AboutUS";
import WorldMap from "../Routes/WorldMap";
import Edit from "../Routes/Edit";

export default function HomePage(props) {
  const apiData = useSelector((state) => state.ApiReducer);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const yearGroup = _.groupBy(apiData, "year");
  const yearOptions = Object.keys(yearGroup);
  const monthOrder = [
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

  const filteredData = apiData.filter((item) => {
    return (
      (!selectedYear || item.year === selectedYear) &&
      (!selectedMonth || item.month === selectedMonth)
    );
  });

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
  };

  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              filteredData={filteredData}
              selectedMonth={selectedMonth}
              monthOrder={monthOrder}
              selectedYear={selectedYear}
              yearOptions={yearOptions}
              handleMonthChange={handleMonthChange}
              handleYearChange={handleYearChange}
            />
          }
        ></Route>
        <Route
          path="/sales"
          element={
            <Sales
              filteredData={filteredData}
              selectedMonth={selectedMonth}
              apiData={apiData}
              monthOrder={monthOrder}
              selectedYear={selectedYear}
              yearOptions={yearOptions}
              handleMonthChange={handleMonthChange}
              handleYearChange={handleYearChange}
            />
          }
        ></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/form" element={<Form getdata={props.getdata} />}></Route>
        <Route
          exact
          path="/edit/:index"
          element={<Edit getdata={props.getdata} />}
        ></Route>
        <Route path="/aboutus" element={<AboutUS />}></Route>
        <Route path="/worldmap" element={<WorldMap />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}

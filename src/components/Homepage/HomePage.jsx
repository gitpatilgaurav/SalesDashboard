import React from "react";
import { Routes, Route } from "react-router";
import Home from "../../Routes/Home";
import Table from "../../Routes/Table";
import Form from "../../Routes/Form";
import Navbar from "../Navbar";
import Error404 from "../../Routes/Error404";

export default function HomePage({apiData}) {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/table" element={<Table/>}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}

import React from "react";
import { Routes, Route } from "react-router";
import Home from "../Routes/Home";
import Sales from "../Routes/Sales";
import Table from "../Routes/Table";
import Form from "../Routes/Form";
import Navbar from "./Navbar";
import Inventory from "../Routes/Inventory";
import Error404 from "../Routes/Error404";
import AboutUS from "../Routes/AboutUS";
import WorldMap from "../Routes/WorldMap";

export default function HomePage() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/sales" element={<Sales />}></Route>
        <Route path="/inventory" element={<Inventory />}></Route>
        <Route path="/table" element={<Table />}></Route>
        <Route path="/form" element={<Form />}></Route>
        <Route path="/aboutus" element={<AboutUS />}></Route>
        <Route path="/worldmap" element={<WorldMap />}></Route>
        <Route path="/*" element={<Error404 />}></Route>
      </Routes>
    </div>
  );
}
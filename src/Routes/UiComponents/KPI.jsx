import React from "react";

export default function KPI({ title, value }) {
   
  return (
    <div className="first">
      <div className="name">{title}</div>
      <div className="kpiValue">{value}</div>
    </div>
  );
}
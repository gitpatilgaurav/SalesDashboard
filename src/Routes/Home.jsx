import React from "react";
import _, { groupBy } from "lodash";

import HomeGenderPie from "../components/Charts/HomeChart/HomeGenderPie";
import HomeCountryBar from "../components/Charts/HomeChart/HomeCountryBar";
import DropDownFilter from '../components/Filters/DropDownFilter'
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";

export default function Home(props) {
  
  const total_Transaction = props.filteredData.length;
  const totalRevenue = props.filteredData.reduce(
    (revenue, item) => revenue + item.revenue,
    0
  );
  const totalCost = props.filteredData.reduce((cost, item) => cost + item.cost, 0);
  const totalprofit = totalRevenue - totalCost;
  const country = groupBy(props.filteredData, "country");
  const countries = Object.keys(country);
  const total_countries = countries.length;

  const language = "en";
  const total_cost = Intl.NumberFormat(language, {
    notation: "compact",
  }).format(totalCost);
  const total_profit = Intl.NumberFormat(language, {
    notation: "compact",
  }).format(totalprofit);


  return (
    <div className="home">
      <div className="home-container">
        <div className="kpi">
          <KPI title="Total Countries" value={total_countries} />
          <KPI title="Total Sales" value={total_Transaction} />
          <KPI title="Total Cash Flow" value={`$ ${total_cost}`} />
          <KPI title="Total Profit" value={`$ ${total_profit}`} />
           <DropDownFilter
            yearOptions={props.yearOptions}
            selectedYear={props.selectedYear}
            monthOrder={props.monthOrder}
            selectedMonth={props.selectedMonth}
            onYearChange={props.handleYearChange}
            onMonthChange={props.handleMonthChange}
          />
        </div>
        
        <div className="charts">
          <Chart
            title="Sales by Gender: Who's Driving the Revenue Growth?"
            chartName={<HomeGenderPie filteredData= {props.filteredData} />}
          />
          <Chart
            title="Which Country Dominates Sales?"
            chartName={<HomeCountryBar filteredData= {props.filteredData} />}
          />
        </div>
      </div>
    </div>
  );
}
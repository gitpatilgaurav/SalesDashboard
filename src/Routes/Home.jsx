import React from "react";
import _, { groupBy } from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import HomeGenderPie from "../components/Charts/HomeChart/HomeGenderPie";
import HomeCountryBar from "../components/Charts/HomeChart/HomeCountryBar";
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts"
import HomeGeoChart from "../components/Charts/HomeChart/HomeGeoChart";


export default function Home() {

  const apiData = useSelector((state) => state.ApiReducer);

  const total_Transaction = apiData.length;
  const totalRevenue = apiData.reduce(
    (revenue, item) => revenue + item.revenue,
    0
  );
  const totalCost = apiData.reduce((cost, item) => cost + item.cost, 0);
  const totalprofit = totalRevenue - totalCost;
  const country = groupBy(apiData, "country");
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
        </div>
        <div className="charts">
          <Chart title="Sales by Gender: Who's Driving the Revenue Growth?" chartName={<HomeGenderPie/>}/>
          <Chart title="Which Country Dominates Sales?" chartName={<HomeCountryBar/>}/>
        </div>
      </div>
    </div>
  );
}

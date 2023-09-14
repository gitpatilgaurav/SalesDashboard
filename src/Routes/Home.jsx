import React,{useState} from "react";
import _, { groupBy } from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import HomeGenderPie from "../components/Charts/HomeChart/HomeGenderPie";
import HomeCountryBar from "../components/Charts/HomeChart/HomeCountryBar";
import DropDownFilter from '../components/Filters/DropDownFilter'
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";

export default function Home() {
  const apiData = useSelector((state) => state.ApiReducer);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const yearGroup = _.groupBy(apiData,'year')
  const yearOptions = Object.keys(yearGroup);
  
  const filteredData = apiData.filter((item) => {
    return (  
      (!selectedYear || item.year === selectedYear) &&
      (!selectedMonth || item.month === selectedMonth)
    );
  });

  const total_Transaction = filteredData.length;
  const totalRevenue = filteredData.reduce(
    (revenue, item) => revenue + item.revenue,
    0
  );
  const totalCost = filteredData.reduce((cost, item) => cost + item.cost, 0);
  const totalprofit = totalRevenue - totalCost;
  const country = groupBy(filteredData, "country");
  const countries = Object.keys(country);
  const total_countries = countries.length;

  const language = "en";
  const total_cost = Intl.NumberFormat(language, {
    notation: "compact",
  }).format(totalCost);
  const total_profit = Intl.NumberFormat(language, {
    notation: "compact",
  }).format(totalprofit);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  const handleMonthChange = (event) => {
    const month = event.target.value;
    setSelectedMonth(month);
  };

  const months = [
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

  return (
    <div className="home">
      <div className="home-container">
        <div className="kpi">
          <KPI title="Total Countries" value={total_countries} />
          <KPI title="Total Sales" value={total_Transaction} />
          <KPI title="Total Cash Flow" value={`$ ${total_cost}`} />
          <KPI title="Total Profit" value={`$ ${total_profit}`} />
           <DropDownFilter
            yearOptions={yearOptions}
            selectedYear={selectedYear}
            months={months}
            selectedMonth={selectedMonth}
            onYearChange={handleYearChange}
            onMonthChange={handleMonthChange}
          />
          
        </div>
        
        <div className="charts">
          <Chart
            title="Sales by Gender: Who's Driving the Revenue Growth?"
            chartName={<HomeGenderPie filteredData= {filteredData} />}
          />
          <Chart
            title="Which Country Dominates Sales?"
            chartName={<HomeCountryBar filteredData= {filteredData} />}
          />
        </div>
      </div>
    </div>
  );
}
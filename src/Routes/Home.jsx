import React,{useState} from "react";
import _, { groupBy } from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import HomeGenderPie from "../components/Charts/HomeChart/HomeGenderPie";
import HomeCountryBar from "../components/Charts/HomeChart/HomeCountryBar";
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";

export default function Home() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const apiData = useSelector((state) => state.ApiReducer);

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
          <div className="filters">
        <div className="yearDropdown">
          <select onChange={handleYearChange}>
            <option value="">All Years</option>
            {yearOptions.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
          </select>
        </div>
        <div className="yearDropdown">
          <select onChange={handleMonthChange}>
            <option value="">All Months</option>
            {months.map((month) => (
              <option key={month} value={month}>
                {month}
              </option>
            ))}
          </select>
          
        </div>
      </div>
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
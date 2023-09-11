import React, {useState}from "react";
import _ from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SalesCRBar from "../components/Charts/SalesChart/SalesCRBar";
import SalesTreemap from "../components/Charts/SalesChart/SalesTreemap";
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";

export default function Sales() {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const apiData = useSelector((state) => state.ApiReducer);

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

  const totalCost = filteredData.reduce((cost, item) => cost + item.cost, 0);
  const totalRevenue = filteredData.reduce(
    (revenue, item) => revenue + item.revenue,
    0
  );
  const totalprofit = totalRevenue - totalCost;
  const profitPercentage = ((totalprofit / totalRevenue) * 100).toFixed(2);
  const totalQuantity = filteredData.reduce((quan, item) => quan + item.quantity, 0);
  const categoryGroup = _.groupBy(filteredData, "product_category");
  const subCategoryGroup = _.groupBy(filteredData, "sub_category");

  const highestSoldSubCategory = _.maxBy(
    Object.keys(subCategoryGroup),
    (subCategory) => {
      return subCategoryGroup[subCategory].length;
    }
  );

  const highestSalesCategory = _.maxBy(
    Object.keys(categoryGroup),
    (category) => {
      return categoryGroup[category].length;
    }
  );
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

  return (
    <div className="home">
      <div className="home-container">
        <div className="kpi">
          <KPI title="Most Demanding Category" value={highestSalesCategory} />
          <KPI title="Most Demanding Product" value={highestSoldSubCategory} />
          <KPI title="Total Items Sold" value={totalQuantity} />
          <KPI title="Profit Percentage" value={`${profitPercentage}%`} />
          <div className="filters">
        <div className="yearDropdown">
          <select onChange={handleYearChange} value={selectedYear}>
            <option value="">All Years</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
          </select>
        </div>
        <div className="yearDropdown">
          <select onChange={handleMonthChange} value={selectedMonth}>
            <option value="">All Months</option>
            {monthOrder.map((month) => (
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
            title="Which Month Made The Highest Revenue? (in $)"
            chartName={<SalesCRBar filteredData ={filteredData} monthOrder={monthOrder} />}
          />
          <Chart
            title="Do States Vary Significantly in Revenue? (in $)"
            chartName={<SalesTreemap filteredData={filteredData}  />}
          />
        </div>
      </div>
    </div>
  );
}

import React from "react";
import _ from "lodash";
import SalesCRBar from "../components/Charts/SalesChart/SalesCRBar";
import SalesTreemap from "../components/Charts/SalesChart/SalesTreemap";
import DropDownFilter from '../components/Filters/DropDownFilter'
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";

export default function Sales(props) {
  
  const totalCost = props.filteredData.reduce((cost, item) => cost + item.cost, 0);
  const totalRevenue = props.filteredData.reduce(
    (revenue, item) => revenue + item.revenue,
    0
  );
  const totalprofit = totalRevenue - totalCost;
  const profitPercentage = ((totalprofit / totalRevenue) * 100).toFixed(2);
  const totalQuantity = props.filteredData.reduce((quan, item) => quan + item.quantity, 0);
  const categoryGroup = _.groupBy(props.filteredData, "product_category");
  const subCategoryGroup = _.groupBy(props.filteredData, "sub_category");

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

  return (
    <div className="home">
      <div className="home-container">
        <div className="kpi">
          <KPI title="Most Demanding Category" value={highestSalesCategory} />
          <KPI title="Most Demanding Product" value={highestSoldSubCategory} />
          <KPI title="Total Items Sold" value={totalQuantity} />
          <KPI title="Profit Percentage" value={`${profitPercentage}%`} />
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
            title="Which Month Made The Highest Revenue? (in $)"
            chartName={<SalesCRBar filteredData ={props.filteredData} monthOrder={props.monthOrder} />}
          />
          <Chart
            title="Do States Vary Significantly in Revenue? (in $)"
            chartName={<SalesTreemap filteredData={props.filteredData}  />}
          />
        </div>
      </div>
    </div>
  );
}
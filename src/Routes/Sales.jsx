import React from "react";
import _ from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import SalesCRBar from "../components/Charts/SalesChart/SalesCRBar";
import SalesTreemap from "../components/Charts/SalesChart/SalesTreemap";
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";

export default function Sales() {
  const apiData = useSelector((state) => state.ApiReducer);

  const totalCost = apiData.reduce((cost, item) => cost + item.cost, 0);
  const totalRevenue = apiData.reduce(
    (revenue, item) => revenue + item.revenue,
    0
  );
  const totalprofit = totalRevenue - totalCost;
  const profitPercentage = ((totalprofit / totalRevenue) * 100).toFixed(2);
  const totalQuantity = apiData.reduce((quan, item) => quan + item.quantity, 0);
  const categoryGroup = _.groupBy(apiData, "product_category");
  const subCategoryGroup = _.groupBy(apiData, "sub_category");

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
        </div>
        <div className="charts">
          <Chart
            title="Which Month Made The Highest Revenue? (in $)"
            chartName={<SalesCRBar />}
          />
          <Chart
            title="Do States Vary Significantly in Revenue? (in $)"
            chartName={<SalesTreemap />}
          />
        </div>
      </div>
    </div>
  );
}

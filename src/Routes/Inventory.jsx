import React from 'react'
import _ from "lodash";
import { useSelector } from "react-redux/es/hooks/useSelector";
import KPI from "./UiComponents/KPI";
import Chart from "./UiComponents/Charts";
import ProductPie from '../components/Charts/InventoryCharts/ProductPie'
import SubProductPie from '../components/Charts/InventoryCharts/SubProductPie'

export default function Inventory() {

  const apiData = useSelector((state) => state.ApiReducer);

  const categoryGroup = _.groupBy(apiData, "product_category");
  const subCategoryGroup = _.groupBy(apiData, "sub_category");

  return (
    <div className="home">
    <div className="home-container">
      <div className="kpi">
      <div className="heading">
      <p>Inventory</p>
      </div>
        {/* <KPI title="Most Demanding Category" value={highestSalesCategory} />
        <KPI title="Most Sold Product" value={highestSoldSubCategory} />
        <KPI title="Total Quantity Sold" value={totalQuantity} />
        <KPI title="Profit Percentage" value={`${profitPercentage}%`} /> */}
      </div>
      <div className="charts">
        <Chart
          title="Where Should We Invest More?"
          chartName={<ProductPie/>}
        />
        <Chart
          title="Which Products Brings Most Sales?"
          chartName={<SubProductPie />}
        />
      </div>
    </div>
  </div>
  )
}

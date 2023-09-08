import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

import _ from "lodash";

export default function ProductPie() {
  const apiData = useSelector((state) => state.ApiReducer);

  const productGroup = _.groupBy(apiData, "product_category");

  const productData = Object.keys(productGroup).map((category) => ({
    product_category: category,
    count: productGroup[category].length,
  }));

  useLayoutEffect(() => {
    let root = am5.Root.new("productCategoryPie");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(70),
        innerRadius: am5.percent(1),
      })
    );

    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "count",
        categoryField: "product_category",
      })
    );
    series.data.setAll(productData);
    series.animate({
      key: "startAngle",
      to: 1,
      loops: 1,
      duration: 2000,
      easing: am5.ease.yoyo(am5.ease.cubic),
    });

    return () => {
      root.dispose();
    };
  }, [productData]);

  return <div className="chartdiv" id="productCategoryPie"></div>;
}

import React, { useLayoutEffect, useState } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import _ from "lodash";

export default function SalesCrBar({filteredData, monthOrder}) {
  
  const groups = _.groupBy(filteredData, "month");

  const sortedMonths = monthOrder.map((month) => ({
    month: month,
    totalRevenue: groups[month]?.reduce(
      (totalRevenue, item) => totalRevenue + item.revenue,
      0
    ),
    totalCost: groups[month]?.reduce(
      (totalCost, item) => totalCost + item.cost,
      0
    ),
  }));

  useLayoutEffect(() => {
    let root = am5.Root.new("chartdiv");

    root.setThemes([am5themes_Animated.new(root)]);

    let chart = root.container.children.push(
      am5xy.XYChart.new(root, {
        panY: false,
        layout: root.verticalLayout,
        wheelY: "zoomX",
      })
    );

    // Create Y-axis
    let yAxis = chart.yAxes.push(
      am5xy.ValueAxis.new(root, {
        renderer: am5xy.AxisRendererY.new(root, {}),
      })
    );

    // Create X-Axis
    let xAxis = chart.xAxes.push(
      am5xy.CategoryAxis.new(root, {
        renderer: am5xy.AxisRendererX.new(root, {}),
        categoryField: "month",
      })
    );
    xAxis.data.setAll(sortedMonths);

    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Revenue",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "totalRevenue",
        categoryXField: "month",
      })
    );
    series1.data.setAll(sortedMonths);
    series1.set("fill", am5.color("#79ea86"));
    series1.columns.template.set("tooltipText", "{categoryX}: ${valueY}");

    let series2 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "Cost",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "totalCost",
        categoryXField: "month",
      })
    );
    series2.data.setAll(sortedMonths);
    series2.set("fill", am5.color("#ff6347"));
    series2.columns.template.set("tooltipText", "{categoryX}: ${valueY}");

    let legend = chart.children.push(am5.Legend.new(root, {}));
    legend.data.setAll(chart.series.values);
    series1.appear(2000);
    series2.appear(2000);

    series1.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });
    series2.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });

    return () => {
      root.dispose();
    };
  }, [sortedMonths]);

  

  return (
    <div>
      <div className="chartdiv" id="chartdiv"></div>
    </div>
  );
}
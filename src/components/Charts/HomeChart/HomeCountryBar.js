import React, { useLayoutEffect, useState } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as am5 from "@amcharts/amcharts5";
import * as am5xy from "@amcharts/amcharts5/xy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import _ from "lodash";

export default function Home_Country_Bar() {

  const apiData = useSelector((state) => state.ApiReducer);
  const [selectedYear, setSelectedYear] = useState('');

  const countryGroup = _.groupBy(apiData, "country");

  const filteredData = selectedYear
    ? apiData.filter((item) => item.year === selectedYear)
    : apiData;

  const countrySales = Object.keys(countryGroup).map((country) => {
    const totalSales = filteredData.filter((item) => item.country === country).length;
    return { country, totalSales };
  });

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
        categoryField: "country",
      })
    );
    xAxis.data.setAll(countrySales);

    // Create series
    let series1 = chart.series.push(
      am5xy.ColumnSeries.new(root, {
        name: "countrys",
        xAxis: xAxis,
        yAxis: yAxis,
        valueYField: "totalSales",
        categoryXField: "country",
      })
    );
    series1.data.setAll(countrySales);
    series1.set("fill", am5.color("#7259ff"));
    series1.columns.template.set("tooltipText", `{categoryX}: {valueY} sales`);
    series1.columns.template.setAll({
      width: am5.percent(80)
    });

    series1.appear(2000);
    series1.columns.template.setAll({
      cornerRadiusTL: 5,
      cornerRadiusTR: 5,
      strokeOpacity: 0,
    });

    return () => {
      root.dispose();
    };
  }, [countrySales]);

  const handleYearChange = (event) => {
    const year = parseInt(event.target.value);
    setSelectedYear(year);
  };

  return (
    <div>
      <div className="yearDropdown">
      <select onChange={handleYearChange}>
        <option value="">All Years</option>
        <option value="2016">2016</option>
        <option value="2015">2015</option>
      </select>
      </div>
      <div className="chartdiv" id="chartdiv"></div>
    </div>
  );
}

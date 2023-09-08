import React, { useLayoutEffect } from "react";
import { useSelector } from "react-redux/es/hooks/useSelector";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";

import _ from "lodash";

export default function HomeGenderPie() {
  const apiData = useSelector((state) => state.ApiReducer);

  const genderGroup = _.groupBy(apiData, "customer_gender");
  const maleCount = genderGroup.M.length;
  const femaleCount = genderGroup.F.length;

  useLayoutEffect(() => {
    // Create root and chart
    let root = am5.Root.new("genderPie");
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        radius: am5.percent(70),
        innerRadius: am5.percent(30),
      })
    );
    let data = [
      {
        customer_gender: "Male",
        count: maleCount,
      },
      {
        customer_gender: "Female",
        count: femaleCount,
      },
    ];

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        name: "Series",
        valueField: "count",
        categoryField: "customer_gender",
      })
    );
    series.data.setAll(data);
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
  }, [maleCount, femaleCount]);

  return <div className="chartdiv" id="genderPie"></div>;
}

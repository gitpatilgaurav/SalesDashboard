import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import _ from "lodash";

export default function HomeGenderPie({ filteredData }) {
  const genderGroup = _.groupBy(filteredData, "customer_gender");
  const maleCount = genderGroup.M ? genderGroup.M.length : 0;
  const femaleCount = genderGroup.F ? genderGroup.F.length : 0;

  useLayoutEffect(() => {
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

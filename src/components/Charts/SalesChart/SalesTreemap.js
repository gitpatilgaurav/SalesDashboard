import React, { useEffect } from 'react';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import _ from "lodash";
import * as am5 from "@amcharts/amcharts5";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";

export default function SalesTreemap() {
  const apiData = useSelector((state) => state.ApiReducer);

  const statesGroup = _.groupBy(apiData, "state");
  const stateSales = Object.keys(statesGroup).map((state) => ({
    name: state,
    value: statesGroup[state].length,
  }));

  useEffect(() => {
    let root = am5.Root.new("chartdiv3");

    root.setThemes([am5themes_Animated.new(root)]);

    let container = root.container.children.push(
      am5.Container.new(root, {
        width: am5.percent(100),
        height: am5.percent(100),
        layout: root.verticalLayout,

      })
    );

    let series = container.children.push(
      am5hierarchy.Treemap.new(root, {
        singleBranchOnly: true,
        downDepth: 1,
        upDepth: -1,
        initialDepth: 1,
        valueField: "value",
        categoryField: "name",
        childDataField: "children",
        nodePaddingOuter: 0,
        nodePaddingInner: 1,
      })
    );

    series.rectangles.template.setAll({
      strokeWidth: 1,
      
    });
    let data = {
      name: "Root",
      children: stateSales,
    };

    series.data.setAll([data]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);
    
    return () => {
      root.dispose();
    };
  }, [stateSales]);

  return (
    <div id="chartdiv3" style={{ width: "100%", height: "100%" }}>
    </div>
  );
}


import { useSelector } from "react-redux";
import _ from "lodash";
import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";
import * as am5hierarchy from "@amcharts/amcharts5/hierarchy";

function WorldMap() {
  const apiData = useSelector((state) => state.ApiReducer);
  const groupedData = _.groupBy(apiData,'product_category');
  const hierarchicalData = {
    name: "Products",
    children: Object.keys(groupedData).map((category) => ({
      name: category,
      children: _.uniqBy(groupedData[category], 'sub_category').map((subcategory) => ({
        name: subcategory.sub_category,
      }))
    }))
  };

  useLayoutEffect(() => {
   
    var root = am5.Root.new("chartdiv");

    
    root.setThemes([am5themes_Animated.new(root)]);

    var container = root.container.children.push(am5.Container.new(root, {
      width: am5.percent(100),
      height: am5.percent(100),
      layout: root.verticalLayout
    }));

    
    

    var series = container.children.push(am5hierarchy.Tree.new(root, {
      singleBranchOnly: true,
      downDepth: 1,
      initialDepth: 10,
      categoryField: "name",
      childDataField: "children"
    }));

    series.data.setAll([hierarchicalData]);
    series.set("selectedDataItem", series.dataItems[0]);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [apiData]); 
  return (
    <div className="tree" id="chartdiv" style={{ width: '100%', height: '100vh' }}></div>
  );
}

export default WorldMap;


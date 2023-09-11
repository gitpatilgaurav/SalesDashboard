import { useSelector } from "react-redux";
import _ from "lodash";
import React, { useLayoutEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5map from "@amcharts/amcharts5/map";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5geodata_worldLow from "@amcharts/amcharts5-geodata/worldLow";

 export default function WorldMap(){

    const apiData = useSelector((state) => state.ApiReducer);
    const countryGroup = _.groupBy(apiData, "country");
    const countryAverages = Object.keys(countryGroup).map((country) => {
    const countryData = countryGroup[country];
    const totalAge = countryData.reduce((totalAge, age) => totalAge + age.customer_age, 0);
    const averageAge = totalAge / countryData.length;
    return { country, averageAge };
      });
      console.log(countryAverages);
       
 
    useLayoutEffect(() => {
 
      let root = am5.Root.new("chartdiv");
  
  
      root.setThemes([am5themes_Animated.new(root)]);
  
    
      let chart = root.container.children.push(
        am5map.MapChart.new(root, {
          panX: "rotateX",
          panY: "rotateY",
          projection: am5map.geoMercator(),
        })
      );
  

      let backgroundSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {})
      );
      backgroundSeries.mapPolygons.template.setAll({
        fill: root.interfaceColors.get("alternativeBackground"),
        fillOpacity: 0,
        strokeOpacity: 0,
      });
  
      backgroundSeries.data.push({
        geometry: am5map.getGeoRectangle(90, 180, -90, -180),
      });
  

      let polygonSeries = chart.series.push(
        am5map.MapPolygonSeries.new(root, {
          geoJSON: am5geodata_worldLow, 
        })
      );
      polygonSeries.mapPolygons.template.setAll({
        fill: root.interfaceColors.get("alternativeBackground"),
        fillOpacity: 0.15,
        strokeWidth: 0.5,
        stroke: root.interfaceColors.get("background"),
      });
  
      let circleTemplate = am5.Template.new({
        tooltipText: "{name}: {value}",
      });
  
      let bubbleSeries = chart.series.push(
        am5map.MapPointSeries.new(root, {
          calculateAggregates: true,
          valueField: "value",
          polygonIdField: "id",
        })
      );
  
      bubbleSeries.bullets.push(function () {
        return am5.Bullet.new(root, {
          sprite: am5.Circle.new(
            root,
            {
              radius: 10,
              templateField: "circleTemplate",
            },
            circleTemplate
          ),
        });
      });
  
      bubbleSeries.set("heatRules", [
        {
          target: circleTemplate,
          min: 3,
          max: 30,
          key: "radius",
          dataField: "value",
        },
      ]);
  
      let colors = am5.ColorSet.new(root, {});
  
      const usData = countryAverages.find((data) => data.country === "United States");
      const franceData = countryAverages.find((data) => data.country === "France");
      const ukData = countryAverages.find((data) => data.country === "United Kingdom");
      const germanyData = countryAverages.find((data) => data.country === "Germany");

      bubbleSeries.data.setAll([
        {
          id: "US",
          name: "United States",
          value: usData.averageAge,
          circleTemplate: { fill: colors.getIndex(10) },
        },
        {
            id: "GB",
            name: "United Kingdom",
            value: ukData.averageAge,
            circleTemplate: { fill: colors.getIndex(12) },
          },
          {
            id: "FR",
            name: "France",
            value: franceData.averageAge,
            circleTemplate: { fill: colors.getIndex(13) },
          },
          {
            id: "DE",
            name: "Germany",
            value: germanyData.averageAge,
            circleTemplate: { fill: colors.getIndex(14) },
          },
      ]);
  
      let cont = chart.children.push(am5.Container.new(root, {
        layout: root.horizontalLayout,
        x: 20,
        y: 40,
      }));
  
      cont.children.push(am5.Label.new(root, {
        centerY: am5.p50,
        text: "Map",
      }));
  
      let switchButton = cont.children.push(
        am5.Button.new(root, {
          themeTags: ["switch"],
          centerY: am5.p50,
          icon: am5.Circle.new(root, {
            themeTags: ["icon"],
          }),
        })
      );
  
      switchButton.on("active", function () {
        if (!switchButton.get("active")) {
          chart.set("projection", am5map.geoMercator());
          backgroundSeries.mapPolygons.template.set("fillOpacity", 0.5);
        } else {
          chart.set("projection", am5map.geoOrthographic());
          backgroundSeries.mapPolygons.template.set("fillOpacity", 0.5);
        }
      });
  
      cont.children.push(am5.Label.new(root, {
        centerY: am5.p50,
        text: "Globe",
      }));
  
      chart.appear(1000, 100);
  
      return () => root.dispose();
    }, [countryAverages]); 
  
    return ( 
    <div className="map-container">
       <div id="chartdiv" className="worldMap">
        <h2>What is average age of your customer?</h2>
       </div>
  </div>)};

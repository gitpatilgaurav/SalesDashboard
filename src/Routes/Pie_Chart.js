import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { useSelector } from "react-redux";
import _ from "lodash";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

function LineChart() {
  const apiData = useSelector((state) => state.ApiReducer);
  const groups = _.groupBy(apiData, "month");
  const month = Object.keys(groups);
  // console.log(groups)
  // console.log(month)
  const monthOrder = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  month.sort((a, b) => {
    return monthOrder.indexOf(a) - monthOrder.indexOf(b);
  });

  const revenueByMonth = month.map((month) =>
    groups[month].reduce((totalRevenue, item) => (totalRevenue + item.revenue),0)
  );

  
 
 

  return (
    <div>
    </div>
  );
}

export default LineChart;

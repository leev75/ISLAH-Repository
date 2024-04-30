"use client";
import { Line } from "react-chartjs-2";
import {
  Chart,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement);

function Reportchart() {
  const data = {
    labels: ["1h", "hour 2", "hour 4", "hour 5", "hour 6 "],
    datasets: [
      {
        data: [8, 30, 37, 41, 55],
        borderColor: "red",
        backgroundColor: "transparent",
        pointBorderWidth: 4,
        tension: 0.5,
      },
    ],
  };

  const options = {
    plugins: {
      legend: false,
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
      },
      y: {
        min: 2,
        max: 70,
        ticks: {
          stepSize: 10,
        },
        grid: {
          borderDash: [70],
        },
      },
    },
  };
  return (
    <div style={{ width: "380px", height: "380px", marginLeft: "20px" }}>
      <h1>Line chart for number of created accountes by user in 1H</h1>
      <Line data={data} options={options}></Line>
    </div>
  );
}
export default Reportchart;

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
    <div>
      <div className="chart-container">
        <Line data={data} options={options} />
        <h1 className="chart-title">Users by hour</h1>
      </div>
    </div>
  );
}

<style jsx>{`
  .chart-container {
    padding: 20px;
    background-color: #f7f7f7;
    border: 1px solid #ddd;
    border-radius: 10px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }

  .chart-title {
    font-weight: bold;
    font-size: 24px;
    margin-bottom: 10px;
  }
`}</style>;

export default Reportchart;

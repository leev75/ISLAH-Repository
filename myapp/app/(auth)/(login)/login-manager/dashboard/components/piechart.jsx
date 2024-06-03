import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import "./style.css";

function PieChart() {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Reported", "In progress", "Completed"],
        datasets: [
          {
            data: [12, 19, 3],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
              "rgba(75, 192, 192, 1)",
            ],
          },
        ],
      },
      options: {
        plugins: {
          datalabels: {
            color: "#fff",
            anchor: "center",
            align: "center",
            font: {
              size: 12,
              weight: "bold",
            },
            formatter: (value, context) => {
              return `\n(${value})`;
            },
          },
        },
        responsive: true,
        maintainAspectRatio: false,
      },
    });

    return () => myChart.destroy();
  }, []);

  return (
    <div className="pie-chart-container">
      <canvas className="pie-chart-canvas" ref={chartRef}></canvas>
    </div>
  );
}

export default PieChart;

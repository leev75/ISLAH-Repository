"use client";
import React, { useRef, useState, useEffect } from "react";
import Chart from "chart.js/auto";
import "chartjs-plugin-datalabels";
import "./style.css";

function PieChart({ managerAuthToken, managerCategory }) {
  const chartRef = useRef(null);

  const [status, setStatus] = useState({
    reportedCount: 1,
    inProgressCount: 1,
    completedCount: 1,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchTotalReports() {
      const url = "http://localhost:5000/api/auth/total-reports";
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${managerAuthToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ managerCategory }),
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setStatus(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching report data:", error);
        setError(error.message);
        setLoading(false);
      }
    }

    fetchTotalReports();
  });

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Reported", "In Progress", "Completed"],
        datasets: [
          {
            data: [
              status.reportedCount,
              status.inProgressCount,
              status.completedCount,
            ],
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(255, 206, 86, 0.2)",
            ],
            borderColor: [
              "rgba(255, 99, 132, 1)",
              "rgba(54, 162, 235, 1)",
              "rgba(255, 206, 86, 1)",
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

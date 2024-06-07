"use client";
import React, { useState, useEffect } from "react";
import Profile from "./profile";
import ReportSection from "./ReportSection";
import { useAuth } from "@/app/hook/useAuth";

function Menu() {
  const [activeMenuItem, setActiveMenuItem] = useState("profile");
  const [report, setReports] = useState([]);
  const { authToken } = useAuth();
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState(null);
  console.log(report);

  useEffect(() => {
    const fetchReportsDate = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/profile", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setReports(data);
        } else {
          const errorMessage = await res.text();
          setError(errorMessage);
        }
      } catch (error) {
        console.error(error);
        setError(error.message || "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchReportsDate();
  }, []);

  return (
    <div
      style={{
        backgroundColor: "#f2f2f2",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "90%",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <h1
          style={{
            color: "#198754",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Menu
        </h1>
        <div style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>
            <ul style={{ listStyleType: "none", padding: "0" }}>
              <li
                onClick={() => setActiveMenuItem("profile")}
                style={{
                  cursor: "pointer",
                  padding: "15px",
                  borderBottom: "1px solid #ddd",
                  backgroundColor:
                    activeMenuItem === "profile" ? "#198754" : "transparent",
                  color: activeMenuItem === "profile" ? "#fff" : "#198754",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Profile
              </li>
              <li
                onClick={() => setActiveMenuItem("report")}
                style={{
                  cursor: "pointer",
                  padding: "15px",
                  borderBottom: "1px solid #ddd",
                  backgroundColor:
                    activeMenuItem === "report" ? "#198754" : "transparent",
                  color: activeMenuItem === "report" ? "#fff" : "#198754",
                  fontSize: "18px",
                  textAlign: "center",
                }}
              >
                Report
              </li>
            </ul>
          </div>
          <div style={{ flex: 2 }}>
            {activeMenuItem === "profile" && <Profile />}
            {activeMenuItem === "report" && <ReportSection report={report} />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Menu;

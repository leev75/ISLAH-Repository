"use client";
import { useState, useEffect } from "react";
import "./style.css";
import { Image } from "react-bootstrap";

function Status({ managerCategory, managerAuthToken }) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function fetchTotalReports() {
    const url = "http://localhost:5000/api/auth/total-reports";
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${managerAuthToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ managerCategory: managerCategory }),
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

  useEffect(() => {
    fetchTotalReports();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  console.log(status);

  return (
    <div className="dashboard-row gradient-background">
      <div className="dashboard-container">
        <div className="dashboard-text">
          <Image
            src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717367919/png-transparent-computer-icons-send-miscellaneous-angle-rectangle-thumbnail_j0nkts.png"
            width={30}
            height={30}
            alt="Icon"
          />
          <h2>Reported</h2> <p>{status.reportedCount}</p>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-text">
          <Image
            src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717367810/images_vovsun.jpg"
            width={30}
            height={30}
            alt="Icon"
          />
          <h2>In prograss</h2> <p>{status.inProgressCount}</p>
        </div>
      </div>
      <div className="dashboard-container">
        <div className="dashboard-text">
          <Image
            src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717367269/png-clipart-check-mark-computer-icons-icon-design-complete-angle-logo-thumbnail_lzhwsb.png"
            width={30}
            height={30}
            alt="Icon"
          />
          <h2>Completed</h2> <p>{status.completedCount}</p>
        </div>
      </div>
    </div>
  );
}

export default Status;

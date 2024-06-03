"use client";
import React, { useEffect, useState } from "react";
import PlaceContainer from "./Placeholder";
import { useAuth } from "@/app/hook/useAuth";
import Container from "react-bootstrap/Container";
import "./layout.css";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

// Define SortContainer outside of Tap component
const SortContainer = ({ reports, reportVote }) => {
  const [sortBy, setSortBy] = useState("date");

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  return (
    <div>
      <div className="sort-container">
        <label htmlFor="sortBy" className="sort-label">
          Sort by:
        </label>
        <div className="custom-select-wrapper">
          <select
            id="sortBy"
            className="sort-select"
            onChange={handleSortChange}
            value={sortBy}
          >
            <option value="date">Date</option>
            <option value="voteCount">Number of Votes</option>
          </select>
        </div>
      </div>
      <div className="hello">
        {/* Render PlaceContainer based on the selected option */}
        {sortBy === "date" && <PlaceContainer size="lg" reports={reports} />}
        {sortBy === "voteCount" && (
          <PlaceContainer size="lg" reports={reportVote} />
        )}
      </div>
    </div>
  );
};

const Tap = () => {
  const { authToken } = useAuth();
  const [reports, setReports] = useState([]);
  const [reportVote, setReportsVote] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/community/Date", {
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
        setError(error.message, "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/api/community/Vote", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          setReportsVote(data);
        } else {
          const errorMessage = await res.text();
          setError(errorMessage);
        }
      } catch (error) {
        console.error(error);
        setError(error.message, "An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  // Render SortContainer
  return (
    <div className="gradiante">
      <SortContainer reports={reports} reportVote={reportVote} />
    </div>
  );
  // return
};

export default Tap;

"use client";
import React, { useEffect, useState } from "react";
import PlaceContainer from "./Placeholder";
import { useAuth } from "@/app/hook/useAuth";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

function Tap() {
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
        setError(error.message || "An error occurred. Please try again.");
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
        setError(error.message || "An error occurred. Please try again.");
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

  return (
    <>
      <Tabs
        defaultActiveKey="Report DashBaord"
        id="fill-tab-example"
        className="mb-3"
        fill
      >
        <Tab eventKey="sort by Date" title="sort by Date">
          <div className="flex-container">
            <PlaceContainer xs={30} size="lg" reports={reportVote} />
          </div>
        </Tab>
        <Tab eventKey="sort by Vote" title="sort by Vote">
          <div className="flex-container">
            <PlaceContainer xs={30} size="lg" reports={reports} />
          </div>
        </Tab>
      </Tabs>
    </>
  );
}

export default Tap;

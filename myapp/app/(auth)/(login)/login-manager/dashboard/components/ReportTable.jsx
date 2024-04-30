"use client";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import ChangeStatus from "./ChangeStatus";

function ReportTable({ managerCategory, managerAuthToken }) {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/GetUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${managerAuthToken}`,
          },
          body: JSON.stringify({ managerCategory }),
        });

        if (res.ok) {
          const data = await res.json();
          setUsers(data);
        } else {
          const errorMessage = await res.text();
          setErrorMessage(errorMessage);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error.message || "An error occurred. Please try again."
        );
      }
    };

    fetchUsers();
  }, [managerCategory]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedUsers = users.slice().sort((a, b) => {
    if (sortColumn === "votes") {
      return sortDirection === "asc" ? a.vote - b.vote : b.vote - a.vote;
    }
    return 0;
  });

  return (
    <div>
      <h1>Report Table</h1>
      <h1>{managerCategory}</h1>
      <Table striped bordered hover size="sm" variant="light" borderless>
        <thead>
          <tr>
            <th>Report ID</th>
            <th>location</th>
            <th>Discreption</th>
            <th onClick={() => handleSort("votes")}>
              votes Number{" "}
              {sortColumn === "votes" && sortDirection === "asc" ? "" : ""}
            </th>
            <th>Status</th>
            <th>change Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.report_id}>
              <td>{user.report_id}</td>
              <td>{user.location}</td>
              <td>{user.description}</td>
              <td>{user.votes}</td>
              <td>{user.status}</td>
              <td>
                <ChangeStatus />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
}

export default ReportTable;

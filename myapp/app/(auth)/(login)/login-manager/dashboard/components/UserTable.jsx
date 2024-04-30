"use client";
import { Black_Han_Sans } from "next/font/google";
import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const UserTable = ({ managerCategory, managerAuthToken }) => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState(""); // fixed typo
  console.log(managerCategory);
  console.log(managerAuthToken);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/GetUsers", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${managerAuthToken}`, // add the token here
          },
          body: JSON.stringify({ managerCategory }), // fixed typo and added body
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
  }, [managerCategory]); // added dependency to re-run effect when ManagerCategory changes

  return (
    <div>
      <h1>User Table</h1>
      <h1>{managerCategory}</h1>
      <Table striped bordered hover size="sm" variant="light" borderless>
        <thead>
          <tr>
            <th>User ID</th>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Number of Report</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.user.user_id}>
              <td>{user.user.user_id}</td>
              <td>{user.user.name}</td>
              <td>{user.user.phoneNumber}</td>
              <td>{user.report}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </div>
  );
};

export default UserTable;

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
        const res = await fetch("http://localhost:5000/api/auth/GetUsersV2", {
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

  console.log(users.map((user) => user.user));

  return (
    <div>
      <div className="user-table-container">
        <h1 className="title">User Table</h1>

        <h2 className="category">
          <span
            style={{
              fontSize: 16,
              fontWeight: "bold",
              color: "#333",
              marginRight: 10,
              backgroundColor: "#ddd",
              padding: 5,
              borderRadius: 5,
            }}
          >
            category:
          </span>
          {managerCategory}
        </h2>

        <Table
          striped
          bordered
          hover
          size="sm"
          variant="light"
          borderless
          className="user-table"
        >
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
              <tr key={user.user_id}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.nbr_of_reports}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {errorMessage && (
          <div className="error-message" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
      </div>
      <style jsx>{`
        .user-table-container {
          padding: 20px;
          background-color: #f7f7f7;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .title {
          font-weight: bold;
          font-size: 24px;
          margin-bottom: 10px;
        }

        .category {
          font-size: 18px;
          margin-bottom: 20px;
        }

        .user-table {
          margin-bottom: 20px;
        }

        .error-message {
          font-size: 16px;
          color: red;
          margin-top: 10px;
        }
      `}</style>
    </div>
  );
};

export default UserTable;

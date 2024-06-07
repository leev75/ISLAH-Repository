"use client";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import ChangeStatus from "./ChangeStatus";
import Status from "./status";
import ContextualExample from "./toast";
import UserTable from "./UserTable";
import { Image } from "react-bootstrap";
import PieChart from "./piechart";
function ReportTable({ managerCategory, managerAuthToken }) {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [sortDirection, setSortDirection] = useState("none");

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

  const handleSortChange = (event) => {
    setSortDirection(event.target.value);
  };
  console.log(users);

  const sortedUsers = users.slice().sort((a, b) => {
    if (sortDirection === "asc") {
      return a.nbr_Of_Votes - b.nbr_Of_Votes;
    } else if (sortDirection === "desc") {
      return b.nbr_Of_Votes - a.nbr_Of_Votes;
    }
    return 0;
  });
  console.log(managerCategory);

  return (
    <div className="tap-pan">
      <Status
        managerAuthToken={managerAuthToken}
        managerCategory={managerCategory}
      />
      <div className="content-container gradient-background">
        <div className="table-container">
          <div>
            <p className="category-heading">
              {managerCategory === "Electricity / Gaz" ? (
                <div className="header-content">
                  <Image
                    src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/Logo_Sonelgaz_m1jgev.png"
                    className="image-gg"
                    width={120}
                    height={80}
                  />
                  <p className="main-heading">
                    Report Table for {managerCategory}{" "}
                  </p>
                </div>
              ) : managerCategory === "Telecominication" ? (
                <div className="header-content">
                  <Image
                    src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/TC_njflg0.png"
                    className="image-gg"
                    width={120}
                    height={80}
                    alt="Telecommunication Icon" // Always add alt text for accessibility
                  />
                  <p className="main-heading">
                    Report Table for {managerCategory}
                  </p>
                </div>
              ) : managerCategory === "ONA" ? (
                <div className="header-content">
                  <Image
                    src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/ONA_yn0zso.jpg"
                    className="image-gg"
                    width={120}
                    height={80}
                  />

                  <p className="main-heading">
                    Report Table for {managerCategory}{" "}
                  </p>
                </div>
              ) : managerCategory === "Water" ? (
                <div className="header-content">
                  <Image
                    src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717359115/water_ctgcks.jpg"
                    width={120}
                    height={80}
                  />
                  <p className="main-heading">
                    Report Table for{managerCategory}{" "}
                  </p>
                </div>
              ) : (
                <Image />
              )}
            </p>
          </div>
          <Table
            striped
            bordered
            hover
            size="sm"
            variant="light"
            borderless
            responsive
          >
            <thead>
              <tr>
                <th>User ID</th>
                <th>Report ID</th>
                <th>Location</th>
                <th>Description</th>
                <th>
                  <select className="sort-selector" onChange={handleSortChange}>
                    <option value="none">Sort by Votes</option>
                    <option value="asc">Ascending</option>
                    <option value="desc">Descending</option>
                  </select>
                </th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedUsers.map((user) => (
                <tr key={user.report_id}>
                  <td>{user.user.user_id}</td>
                  <td>{user.report_id}</td>
                  <td>{user.location}</td>
                  <td>{user.description}</td>
                  <td>{user.nbr_Of_Votes}</td>
                  <td>
                    <ChangeStatus
                      report_id={user.report_id}
                      managerAuthToken={managerAuthToken}
                      status={user.status}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
        <div className="sponsor-container">
          {/* Sponsor content here */}

          <PieChart managerCategory={managerCategory}
            managerAuthToken={managerAuthToken}/>

          <UserTable
            className="table-container2"
            managerCategory={managerCategory}
            managerAuthToken={managerAuthToken}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportTable;

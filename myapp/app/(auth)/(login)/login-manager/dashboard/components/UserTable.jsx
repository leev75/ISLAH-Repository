import { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import styles from "./style.css"; // Assuming you've created a CSS module
import "@fontsource/black-han-sans"; // Make sure you have this package installed

const UserTable = ({ managerCategory, managerAuthToken }) => {
  const [users, setUsers] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/auth/GetUsersV2", {
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
  }, [managerCategory, managerAuthToken]);

  return (
    <div>
      <Table
        className="table-container2"
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
            <th>Name</th>
            <th>Tel</th>
            <th>Number of Reports</th>
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
        <div className={styles.errorMessage}>{errorMessage}</div>
      )}
    </div>
  );
};

export default UserTable;

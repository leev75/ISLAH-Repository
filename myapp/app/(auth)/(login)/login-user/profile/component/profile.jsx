"use client";
import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useAuth } from "@/app/hook/useAuth";
import Toast from "react-bootstrap/Toast";

function Profile() {
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const { authToken } = useAuth();

  console.log(user);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        });

        if (res.status === 200) {
          const data = res.data;
          setUser(data);
        } else {
          const errorMessage = res.data;
          setErrorMessage(errorMessage);
        }
      } catch (error) {
        console.error(error);
        setErrorMessage(
          error.message || "An error occurred. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [authToken]);

  const handleSave = useCallback(async () => {
    setIsEditing(false);

    try {
      const response = await axios.put(
        "http://localhost:5000/api/auth/profile/change_Info",
        {
          newName: name,
          newPhoneNumber: phoneNumber,
          newPassword: password,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.status === 200) {
        setSuccessMessage("Info updated successfully");
        alert("تغيرت المعلومات          ");
      }
    } catch (error) {
      setErrorMessage("Error updating info: " + error.message);
      alert(errorMessage);
    }
  }, [authToken, name, phoneNumber, password]);

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSave();
  };

  return (
    <>
      <form
        style={{
          width: "80%",
          maxWidth: "600px",
          margin: "0 auto",
          backgroundColor: "#f2f2f2",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
        onSubmit={handleSubmit}
      >
        <h2
          style={{
            color: "#198754",
            marginBottom: "20px",
            textAlign: "center",
          }}
        >
          Profile
        </h2>
        <div className="form-group">
          <div style={{ display: "block", marginBottom: "10px" }}>
            <label htmlFor="name">{user.name}</label>
            <input
              type="text"
              className="form-control"
              placeholder={`Enter your name`}
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={!isEditing}
              style={{
                padding: "10px",
                width: "99%",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
          </div>
          <div style={{ display: "block", marginBottom: "10px" }}>
            <label htmlFor="phoneNumber">{user.phoneNumber}</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your phone number"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              disabled={!isEditing}
              style={{
                padding: "10px",
                width: "99%",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
          </div>
          <div style={{ display: "block", marginBottom: "20px" }}>
            <label htmlFor="password">password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={!isEditing}
              style={{
                padding: "10px",
                width: "99%",
                borderRadius: "4px",
                border: "1px solid #ced4da",
              }}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-success btn-link">
          Save
        </button>
        {successMessage && (
          <div
            style={{ marginTop: "20px", color: "green", textAlign: "center" }}
          >
            {successMessage}
          </div>
        )}
        {errorMessage && (
          <div style={{ marginTop: "20px", color: "red", textAlign: "center" }}>
            {errorMessage}
          </div>
        )}
      </form>
    </>
  );
}

export default Profile;

"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/hook/useAuth";
const url = "imgs/people.svg";

function Register() {
  const { login } = useAuth();
  const [userData, setUserData] = useState({
    name: "",
    phoneNumber: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (res.ok) {
        const data = await res.json();
        alert(data.message);
        login(data.token);
        setIsSubmitted(true); // Set submission status to true upon success
        setSubmitError(""); // Clear any previous errors
      } else if (res.status === 401) {
        // Handle specific error for phone number already in use
        const errorMessage = await res.text();
        setSubmitError(errorMessage);
      } else {
        // Handle other error scenarios
        throw new Error("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      setSubmitError(error.message || "An error occurred. Please try again."); // Set the error message
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%", // Set the width to 100%
        background:
          "linear-gradient(109.6deg, rgb(251, 250, 225) 11.2%, rgb(206, 240, 185) 47.5%, rgb(100, 163, 111) 100.2%)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          width: "100%", // Ensure the div uses up to 800px but does not exceed the viewport width
          maxWidth: "500px", // Modern forms are often narrower for better focus
          margin: "auto",
          padding: "30px",
          backgroundColor: "rgba(255, 255, 255, 0.85)", // Slightly transparent white background
          borderRadius: "15px",
          boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <Image
            src={url}
            alt="Logo"
            width={120}
            height={120}
            style={{
              borderRadius: "50%", // Circular image for a more modern look
            }}
          />
          <h1 style={{ marginTop: "20px", color: "#green", fontWeight: "600" }}>
            Create Your Account
          </h1>
          {submitError && (
            <p style={{ color: "red", marginTop: "10px" }}>{submitError}</p>
          )}
        </div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              fontSize: "16px",
              border: "2px solid #065f46", // Dark green border
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.3s ease-in-out",
              background:
                "linear-gradient(109.6deg, rgb(251, 250, 225) 11.2%, rgb(206, 240, 185) 47.5%, rgb(100, 163, 111) 100.2%)", // Gradient from dark green to lighter green
              color: "white", // Text color for better contrast
            }}
            placeholder="Full Name"
            value={userData.name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="phoneNumber"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              fontSize: "16px",
              border: "2px solid #065f46", // Consistent with other inputs
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.3s ease-in-out",
              background:
                "linear-gradient(109.6deg, rgb(251, 250, 225) 11.2%, rgb(206, 240, 185) 47.5%, rgb(100, 163, 111) 100.2%)", // Matching gradient
              color: "white", // White text for readability
            }}
            value={userData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
            required
          />
          <input
            type="password"
            name="password"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              fontSize: "16px",
              border: "2px solid #065f46", // Dark green border
              borderRadius: "8px",
              outline: "none",
              transition: "all 0.3s ease-in-out",
              background:
                "linear-gradient(109.6deg, rgb(251, 250, 225) 11.2%, rgb(206, 240, 185) 47.5%, rgb(100, 163, 111) 100.2%)", // Dark to light green gradient
              color: "white", // White text for contrast
            }}
            placeholder="Password"
            value={userData.password}
            onChange={handleChange}
            required
          />
          <div style={{ marginBottom: "20px", textAlign: "left" }}>
            <label>
              <input type="checkbox" style={{ marginRight: "10px" }} />
              Agree to terms and conditions
            </label>
          </div>
          <button
            type="submit"
            style={{
              display: "block",
              width: "100%",
              padding: "12px",
              fontSize: "16px",
              color: "green",
              backgroundColor: "linear-gradient(145deg, #065f46, #a3de83)", // Dark green button gradient
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              transition: "background 0.3s ease-in-out",
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;

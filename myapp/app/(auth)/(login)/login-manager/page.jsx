"use client";
import { useState } from "react";
import { useManagerAuth } from "@/app/hook/useAuthManager";

function LoginManager() {
  // State hooks should be declared at the top
  const [ManagerData, setManagerData] = useState({
    key: "",
    password: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  // Extract the login function from useAuth hook
  const { managerLogin } = useManagerAuth();

  // Event handler for form inputs
  const handleChange = (e) => {
    setManagerData({ ...ManagerData, [e.target.name]: e.target.value });
  };

  // Event handler for form submission
  const handleMangerLogin = async (e) => {
    e.preventDefault();
    const body = JSON.stringify(ManagerData);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login-manager", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        const data = await res.json();
        const { managerToken, categorie } = data;
        managerLogin(managerToken, categorie);
        alert(" تم تسجيل الدخول"); // Using alert for simplicity; consider more integrated UI feedback
        setIsSubmitted(true);
        setSubmitError("");
      } else {
        const errorMessage = await res.text();
        setSubmitError(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitted(false);
      setSubmitError(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <form onSubmit={handleMangerLogin}>
      <div
        className="d-flex justify-content-center align-items-center min-vh-100"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          className="border rounded-5 p-3 bg-white shadow box-area"
          style={{
            border: "1px solid #ccc",
            borderRadius: "10px",
            padding: "30px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "500px",
          }}
        >
          <div
            className="text-end mb-4 d-flex flex-row-reverse "
            style={{ textAlign: "right", marginBottom: "20px" }}
          >
            <h2 className="header-text">مرحبًا | قم بتسجيل الدخول </h2>
          </div>
          <div className="mb-3">
            <input
              type="text"
              name="key"
              value={ManagerData.key}
              onChange={handleChange}
              className="form-control form-control-lg bg-light fs-6 text-end"
              placeholder="مفتاح"
              required
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                textAlign: "right",
              }}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              value={ManagerData.password}
              onChange={handleChange}
              className="form-control form-control-lg bg-light fs-6 text-end"
              placeholder="كلمة المرور"
              required
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#f5f5f5",
                padding: "10px",
                fontSize: "16px",
                width: "100%",
                textAlign: "right",
              }}
            />
          </div>
          {submitError && (
            <div className="alert alert-danger" style={{ marginTop: "10px" }}>
              {submitError}
            </div>
          )}
          <div className="mb-3">
            <button
              className="btn btn-lg btn-success w-100 fs-6"
              type="submit"
              style={{
                border: "none",
                borderRadius: "5px",
                backgroundColor: "#28a745",
                color: "#fff",
                padding: "10px",
                fontSize: "16px",
                cursor: "pointer",
                transition: "all 0.3s ease-in-out",
              }}
            >
              تسجيل الدخول
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginManager;

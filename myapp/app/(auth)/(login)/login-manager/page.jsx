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
        console.log(categorie);
        alert("تم تسجيل الدخول"); // Using alert for simplicity; consider more integrated UI feedback
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
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        <div
          className="row border rounded-5 p-3 bg-white shadow box-area"
          style={{ width: "500px" }}
        >
          <div className="col">
            <div className="row align-items-center">
              <div className="header-text mb-4 d-flex flex-row-reverse ">
                <h2>مرحبًا | قم بتسجيل الدخول </h2>
              </div>
              <div className="col">
                <div className="input-group mb-3">
                  <input
                    type="text" // Changed from type="key" to type="text"
                    name="key"
                    value={ManagerData.key}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light fs-6 text-end"
                    placeholder="key"
                    required
                  />
                </div>
                <div className="input-group mb-3">
                  <input
                    type="password"
                    name="password"
                    value={ManagerData.password}
                    onChange={handleChange}
                    className="form-control form-control-lg bg-light fs-6 text-end"
                    placeholder="password"
                    required
                  />
                </div>
                {submitError && (
                  <div className="alert alert-danger">{submitError}</div>
                )}
              </div>
              <div className="input-group mb-3">
                <button
                  className="btn btn-lg btn-success w-100 fs-6"
                  type="submit"
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}

export default LoginManager;

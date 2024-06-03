"use client";
import Image from "react-bootstrap";
import "@/public/css/all.css/style.css";
import "@/Public/css/other.css/bootstrap.min.css";
import Link from "next/link";
import { useState } from "react";
import { resolve } from "styled-jsx/css";
import { useAuth } from "@/app/hook/useAuth";

export default function Login() {
  const { login } = useAuth();

  const [userData, setUserData] = useState({
    phoneNumber: "",
    password: "",
    rememberMe: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleCheckboxChange = () => {
    setUserData({ ...userData, rememberMe: !userData.rememberMe });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = JSON.stringify({
      ...userData,
    });
    try {
      const res = await fetch("http://localhost:5000/api/auth/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      if (res.ok) {
        const data = await res.json();
        setIsSubmitted(true); // Set submission status to true upon success
        setSubmitError(""); // Clear any previous errors
        login(data.token);
      } else if (res.status === 401) {
        const errorMessage = await res.text();
        setSubmitError(errorMessage);
      } else if (res.status === 400) {
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
    <div
      className=" d-flex justify-content-center align-items-center min-vh-100"
      style={{
        fontFamily: "IBM Plex Sans Arabic, sans-serif",
        backgroundImage:
          "url('https://res.cloudinary.com/drz2il9dy/image/upload/v1717370669/wave_2_i22345.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="row border rounded-5 p-3 bg-white shadow box-area"
        style={{ width: "80%", maxWidth: "1200px" }}
      >
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#fff", padding: "40px" }}
        >
          <div className="featured-image mb-3">
            <img
              src="https://res.cloudinary.com/drz2il9dy/image/upload/v1717405399/logoo.png_transparent_Plan_de_travail_1_g1m47r.png"
              className="img-fluid"
              style={{ width: "250px" }}
              alt="Logo"
            />
          </div>
          <p
            className="text-success fs-2"
            style={{
              fontFamily: "IBM Plex Sans Arabic",
              fontWeight: 600,
              fontSize: "24px",
            }}
          >
            إصلاح
          </p>
          <small
            className="text-dark text-wrap text-center"
            style={{
              width: "17rem",
              fontFamily: "Courier New",
              fontSize: "0.9rem",
            }}
          >
            إنضم إلينا
          </small>
        </div>
        <form
          onSubmit={handleSubmit}
          className="col-md-6 right-box"
          style={{ padding: "40px" }}
        >
          <div className="row align-items-center">
            <div className="header-text mb-4 d-flex flex-row-reverse">
              <h2 style={{ fontSize: "24px" }}>مرحبًا مرة أخرى</h2>
            </div>
            <div className="input-group mb-3">
              <input
                type="text"
                name="phoneNumber"
                value={userData.phoneNumber}
                onChange={handleChange}
                className="form-control form-control-lg bg-light fs-6 text-end"
                placeholder="رقم الهاتف"
                required
              />
            </div>
            <div className="input-group mb-3">
              <input
                type="password"
                name="password"
                value={userData.password}
                onChange={handleChange}
                className="form-control form-control-lg bg-light fs-6 text-end"
                placeholder="كلمة المرور"
                required
              />
            </div>
            <div className="input-group mb-3 d-flex justify-content-between">
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="rememberMe"
                  checked={userData.rememberMe}
                  onChange={handleCheckboxChange}
                />
                <label
                  htmlFor="rememberMe"
                  className="form-check-label text-secondary"
                >
                  <small>تذكرني</small>
                </label>
              </div>
              <div className="forgot">
                <small>
                  <Link href="/login/reset_password" className="link-success">
                    هل نسيت كلمة المرور؟
                  </Link>
                </small>
              </div>
            </div>
            <div className="input-group mb-3">
              <button
                className="btn btn-lg btn-success w-100 fs-6"
                type="submit"
              >
                تسجيل الدخول
              </button>
              {isSubmitted ? (
                <div className="alert alert-success" role="alert">
                  تم تسجيل الدخول <Link href="/">الرئيسية</Link>.
                </div>
              ) : submitError ? (
                <div className="alert alert-danger" role="alert">
                  {submitError}
                </div>
              ) : null}
            </div>
            <div className="row">
              <small>
                ليس لديك حساب؟{" "}
                <Link href="/sign" className="link-success">
                  register
                </Link>
              </small>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";
import Image from "react-bootstrap";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/hook/useAuth";
import "@/public/css/all.css/style.css"; // Adjusted import for CSS

export default function LoginPage() {
  const { login } = useAuth();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [phoneNumber, SetphoneNumber] = useState("");
  const [password, Setpassword] = useState("");
  const formData = new FormData();

  formData.append("phoneNumber", phoneNumber);
  formData.append("password", password);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      phoneNumber,
      password,
    };

    try {
      const res = await fetch("http://localhost:5000/api/auth/login-user", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (res.ok) {
        const data = await res.json();
        alert("تم تسجيل الدخول"); // Consider more integrated UI feedback
        login(data.token);
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
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{ background: "#fff" }}
        >
          <div className="featured-image mb-3">
            <img
              src="assets/imgs/logoo.png_transparent_Plan de travail 1.png"
              className="img-fluid"
              style={{ width: "250px" }}
            />
          </div>
          <p
            className="text-success fs-2"
            style={{
              fontFamily:
                "'font-family: IBM Plex Sans Arabic;', Courier, monospace",
              fontWeight: 600,
            }}
          >
            إصلاح
          </p>
          <small
            className="text-dark text-wrap text-center"
            style={{
              width: "17rem",
              fontFamily: "'Courier New', Courier, monospace",
            }}
          >
            إنضم إلينا
          </small>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="col-md-6 right-box">
            <div className="row align-items-center">
              <div className="header-text mb-4 d-flex flex-row-reverse">
                <h2>مرحبًا مرة أخرى</h2>
              </div>

              <div className="input-group mb-3">
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => {
                    SetphoneNumber(e.target.value);
                  }}
                  className="form-control form-control-lg bg-light fs-6 text-end"
                  placeholder="رقم الهاتف"
                  required
                />
              </div>

              <div className="input-group mb-1">
                <input
                  type="text"
                  value={password}
                  onChange={(e) => {
                    Setpassword(e.target.value);
                  }}
                  className="form-control form-control-lg bg-light fs-6 text-end"
                  placeholder="كلمة المرور"
                  required
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="forgot">
                  <small>
                    <Link className="link-success" href="/login/Reset_password">
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
                    تم تسجيل الدخول
                    <Link href="/">الرئيسية</Link>.
                  </div>
                ) : submitError ? (
                  <div className="alert alert-danger" role="alert">
                    {submitError}
                  </div>
                ) : null}
              </div>

              <div className="row">
                <small>ليس لديك حساب؟ </small>
                <Link className="link-success" href="/sign">
                  register
                </Link>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

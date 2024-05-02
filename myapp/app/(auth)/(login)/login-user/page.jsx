"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/hook/useAuth";
import { ImageResponse } from "next/server";
const url = "/imgs/trov.png";
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
    <div
      className="container d-flex justify-content-center align-items-center min-vh-100"
      style={{ backgroundColor: "#f5f5f5" }}
    >
      <div
        className="row border rounded-5 p-3 bg-white shadow box-area"
        style={{ boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}
      >
        <div
          className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div className="featured-image mb-3">
            <Image
              src={url}
              alt="logo"
              className="img-fluid"
              style={{
                width: "250px",
                borderRadius: "10px",
              }}
              width={250}
              height={30}
            />
          </div>
          <p
            className="text-success fs-2"
            style={{
              fontFamily: "'IBM Plex Sans Arabic;', Courier, monospace",
              fontWeight: 600,
              color: "#34C759",
            }}
          >
            إصلاح
          </p>
          <small
            className="text-dark text-wrap text-center"
            style={{
              width: "17rem",
              fontFamily: "'Courier New', Courier, monospace",
              color: "#333",
            }}
          >
            إنضم إلينا
          </small>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="col-md-6 right-box" style={{ padding: "20px" }}>
            <div className="row align-items-center">
              <div className="header-text mb-4 d-flex flex-row-reverse">
                <h2 style={{ color: "#333" }}>مرحبًا مرة أخرى</h2>
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
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
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
                  style={{
                    borderColor: "#ccc",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                />
              </div>
              <div className="input-group mb-5 d-flex justify-content-between">
                <div className="forgot">
                  <small>
                    <Link
                      className="link-success"
                      href="/login/Reset_password"
                      style={{ color: "#34C759" }}
                    >
                      هل نسيت كلمة المرور؟
                    </Link>
                  </small>
                </div>
              </div>
              <div className="input-group mb-3">
                <button
                  className="btn btn-lg btn-success w-100 fs-6"
                  type="submit"
                  style={{
                    backgroundColor: "#34C759",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  تسجيل الدخول
                </button>
                {isSubmitted ? (
                  <div
                    className="alert alert-success"
                    role="alert"
                    style={{ backgroundColor: "#34C759", color: "#fff" }}
                  >
                    تم تسجيل الدخول
                    <Link href="/" style={{ color: "#fff" }}>
                      الرئيسية
                    </Link>
                    .
                  </div>
                ) : submitError ? (
                  <div
                    className="alert alert-danger"
                    role="alert"
                    style={{ backgroundColor: "#FFC080", color: "#fff" }}
                  >
                    {submitError}
                  </div>
                ) : null}
              </div>

              <div className="row">
                <small style={{ color: "#333" }}>ليس لديك حساب؟ </small>
                <Link
                  className="link-success"
                  href="/sign"
                  style={{ color: "#34C759" }}
                >
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

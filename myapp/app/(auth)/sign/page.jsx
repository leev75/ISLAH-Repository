"use client";
import Image from "react-bootstrap";
import "@/public/css/all.css/style.css";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/hook/useAuth";
import { useRouter } from "next/router";

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
        router.push("/report");
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
    <div>
      {" "}
      <div className="container d-flex justify-content-center align-items-center min-vh-100">
        {" "}
        <div className="row border rounded-5 p-3 bg-white shadow box-area">
          {" "}
          <div
            className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column left-box"
            style={{ background: "#fff" }}
          >
            {" "}
            <div className="featured-image mb-3">
              {" "}
              <img
                src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.linkedin.com%2Fcompany%2Flogin-nl&psig=AOvVaw0PJWJw0_LunLlyZYFJb2uO&ust=1712244071968000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCNjy0cr3pIUDFQAAAAAdAAAAABAE"
                alt="Logo"
                style={{ width: "250px" }}
              />{" "}
            </div>{" "}
            <p
              className="text-success fs-2"
              style={{
                fontFamily: "'IBM Plex Sans Arabic', Courier, monospace",
                fontWeight: 600,
              }}
            >
              {" "}
              إصلاح{" "}
            </p>{" "}
            <p>hesdsdsds</p>{" "}
          </div>{" "}
          <form onSubmit={handleSubmit}>
            <div className="col-md-6 right-box">
              {" "}
              <div className="row align-items-center">
                {" "}
                <div className="header-text mb-4  ">
                  {" "}
                  <h2>إنشاء حساب جديد</h2>{" "}
                </div>{" "}
                <div className="input-group mb-3">
                  {" "}
                  <input
                    type="text"
                    name="name"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="الاسم الكامل"
                    value={userData.name}
                    onChange={handleChange}
                    required
                  />{" "}
                </div>{" "}
                <div className="input-group mb-3">
                  {" "}
                  <input
                    type="text"
                    name="phoneNumber"
                    className="form-control form-control-lg bg-light fs-6 text-end"
                    value={userData.phoneNumber}
                    onChange={handleChange}
                    placeholder=" رقم الهاتف"
                  />{" "}
                </div>{" "}
                <div className="input-group mb-3">
                  {" "}
                  <input
                    type="password"
                    name="password"
                    className="form-control form-control-lg bg-light fs-6"
                    placeholder="كلمة المرور"
                    value={userData.password}
                    onChange={handleChange}
                  />{" "}
                </div>{" "}
                <div className="input-group mb-5 d-flex justify-content-between">
                  {" "}
                  <div className="form-check">
                    {" "}
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="formCheck"
                    />{" "}
                    <label
                      htmlFor="formCheck"
                      className="form-check-label text-secondary"
                    >
                      <small>أوافق على الشروط والأحكام</small>
                    </label>
                  </div>{" "}
                </div>{" "}
                <div className="input-group mb-3">
                  {" "}
                  <button
                    className="btn btn-lg btn-success w-100 fs-6"
                    type="submit"
                  >
                    {" "}
                    إنشاء الحساب{" "}
                  </button>{" "}
                  {isSubmitted ? (
                    <div className="alert alert-success" role="alert">
                      تم تسجيل المستخدم بنجاح تستطيع الآن
                      <Link href="/report">تسجيل الدخول</Link>.
                    </div>
                  ) : submitError ? (
                    <div className="alert alert-danger" role="alert">
                      {submitError}
                    </div>
                  ) : null}
                </div>
                <div className="row">
                  {" "}
                  <Link href="/login-user" className="link-success">
                    {" "}
                    املك حساب{" "}
                  </Link>{" "}
                </div>{" "}
              </div>{" "}
            </div>{" "}
          </form>
        </div>{" "}
      </div>{" "}
    </div>
  );
}

export default Register;

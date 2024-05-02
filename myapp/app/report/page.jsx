"use client";
import { useAuth } from "@/app/hook/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { Button } from "react-bootstrap";
const url = "/imgs/profile.svg";

const ReportForm = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, authToken } = useAuth();

  const categories = [
    { value: "water", label: "water" },
    { value: "Electricity / Gaz", label: "Electricity / Gaz" },
    { value: "ONA", label: "ONA" },
    { value: "Telecominication", label: "Telecominication" },
    //...
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("location", location);
    formData.append("description", description);
    formData.append("categorie", categorie);
    formData.append("image", image);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/report/submit-report",
        formData,
        config
      );
      console.log(response.data);
      alert("التقرير تم بنجاح");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100 p-5">
      <div className="row border rounded-5 p-3 bg-white shadow box-area">
        {isLoggedIn() ? (
          <>
            <div
              className="col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column right-box"
              style={{
                background: "#f7f7f7",
                boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
                padding: 20,
              }}
            >
              <p
                className="text-success fs-2"
                style={{
                  fontFamily: '"IBM Plex Sans Arabic", Courier, monospace',
                  fontWeight: 600,
                  color: "#34C759",
                }}
              >
                إبلاغ
              </p>
            </div>
            <div
              className="col-md-6 left-box py-2"
              style={{ background: "#fff" }}
            >
              <div
                className="row align-items-center"
                style={{ direction: "rtl" }}
              >
                <div className="header-text mb-4">
                  <h2 style={{ color: "#333", fontSize: 24, fontWeight: 600 }}>
                    بلغ و شارك في إيجاد الحلول
                  </h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div style={{ marginBottom: 16 }}>
                    <select
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                      required
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        margin: "8px 0",
                        display: "inline-block",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#666",
                      }}
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      placeholder="الموقع"
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        margin: "8px 0",
                        display: "inline-block",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#666",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <textarea
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="الوصف"
                      style={{
                        width: "100%",
                        padding: "12px 20px",
                        margin: "8px 0",
                        display: "inline-block",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        boxSizing: "border-box",
                        fontSize: 16,
                        fontWeight: 400,
                        color: "#666",
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: 16 }}>
                    <div style={{ position: "relative" }}>
                      <input
                        type="file"
                        id="inputGroupFile"
                        aria-describedby="inputGroupFileAddon"
                        onChange={handleImageChange}
                        style={{
                          opacity: 0,
                          position: "absolute",
                          top: 0,
                          right: 0,
                          bottom: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          cursor: "pointer",
                        }}
                      />
                      <label
                        htmlFor="inputGroupFile"
                        style={{
                          display: "block",
                          padding: "12px 20px",
                          margin: "8px 0",
                          border: "1px solid #ddd",
                          borderRadius: "4px",
                          cursor: "pointer",
                          fontSize: 16,
                          fontWeight: 400,
                          color: "#666",
                        }}
                      >
                        أضف صورة
                      </label>
                    </div>
                  </div>
                  <Button
                    variant="dark"
                    type="submit"
                    style={{
                      width: "100%",
                      padding: "12px 20px",
                      margin: "8px 0",
                      display: "inline-block",
                      border: "none",
                      borderRadius: "4px",
                      boxSizing: "border-box",
                      fontSize: 16,
                      fontWeight: 600,
                      color: "#fff",
                      backgroundColor: "#34C759",
                      cursor: "pointer",
                    }}
                  >
                    Submit
                  </Button>
                </form>
              </div>
            </div>{" "}
          </>
        ) : (
          // Login prompt if not logged in
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10 col-md-10 ">
                <div className="border rounded-5 p-3 p-lg-5 bg-white text-center shadow">
                  <h2>يجب تسجيل الدخول للإبلاغ عن المشكل</h2>
                  <div className="featured-image mb-3">
                    <image
                      src={url}
                      className="img-fluid"
                      alt="Description"
                      style={{
                        maxWidth: "200px",
                        width: "100%",
                        height: "auto",
                      }}
                      width={200}
                      height={200}
                    />
                  </div>
                  <div>
                    <small>
                      ليس لديك حساب ,{" "}
                      <Link className="link-success" href="/login-user">
                        سجل من هنا
                      </Link>
                    </small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReportForm;

"use client";
import { useAuth } from "@/app/hook/useAuth";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

const ReportForm = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { isLoggedIn, authToken } = useAuth();

  const categories = [
    { value: "water", label: "Electronics" },
    { value: "Electricity / Gaz", label: "Fashion" },
    { value: "ONA", label: "Home" },
    { value: "Telecominication", label: "Other" },
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
      alert("secces");
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
              style={{ background: "#fff" }}
            >
              <p
                className="text-success fs-2"
                style={{
                  fontFamily: '"IBM Plex Sans Arabic", Courier, monospace',
                  fontWeight: 600,
                }}
              >
                إبلاغ
              </p>
            </div>
            <div className="col-md-6 left-box py-2">
              <div
                className="row align-items-center"
                style={{ direction: "rtl" }}
              >
                <div className="header-text mb-4">
                  <h2>بلغ و شارك في إيجاد الحلول</h2>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="input-group mb-3">
                    <select
                      className="form-control form-control-lg bg-light fs-6"
                      value={categorie}
                      onChange={(e) => setCategorie(e.target.value)}
                      required
                    >
                      <option value="">Select a category</option>
                      {categories.map((category, index) => (
                        <option key={index} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="text"
                      className="form-control form-control-lg bg-light fs-6"
                      placeholder="الموقع"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <textarea
                      className="form-control form-control-lg bg-light fs-6"
                      placeholder="الوصف"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                  <div className="input-group mb-3">
                    <input
                      type="file"
                      className="form-control form-control-lg bg-light fs-6"
                      placeholder="أضف صورة"
                      onChange={handleImageChange}
                    />
                  </div>
                  <button type="submit">Submit</button>
                </form>
              </div>
            </div>
          </>
        ) : (
          // Login prompt if not logged in
          <div className="container mt-5">
            <div className="row justify-content-center">
              <div className="col-xl-8 col-lg-10 col-md-10 ">
                <div className="border rounded-5 p-3 p-lg-5 bg-white text-center shadow">
                  <h2>يجب تسجيل الدخول للإبلاغ عن المشكل</h2>
                  <div className="featured-image mb-3">
                    <img
                      src="public/imgs/pagevide.svg"
                      className="img-fluid"
                      alt="Description"
                      style={{ maxWidth: "200px" }}
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

"use client";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";
//import styles from "@/public/css/other.css/report-style.css";
import "@/Public/css/other.css/bootstrap.min.css";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useAuth } from "@/app/hook/useAuth"; // Authentication hook

//const url = "/imgs/profile.svg";  // Ensure this matches the path used in your HTML

const styles = {
  container: "d-flex justify-content-center align-items-center min-vh-100 p-5",
  boxArea: "border rounded-5 p-3 bg-white shadow box-area",
  rightBox:
    "col-md-6 rounded-4 d-flex justify-content-center align-items-center flex-column bg-white",
  leftBox: "col-md-6 py-2",
  featuredImage: "mb-3 img-fluid",
  formControl: "form-control form-control-lg bg-light fs-6",
  formGroup: "mb-3",
  headerText: "mb-4 text-center fs-2",
  submitButton: "btn btn-lg btn-success w-100 fs-6",
};

const ReportForm = () => {
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [categorie, setCategorie] = useState("");
  const [image, setImage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(""); // Error handling state
  const { isLoggedIn, authToken } = useAuth(); // Authentication state

  const categories = [
    { value: "water", label: "Water" },
    { value: "Electricity / Gaz", label: "Electricity/Gaz" },
    { value: "ONA", label: "ONA" },
    { value: "Telecominication", label: "Telecommunication" },
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
        "X-Timestamp": new Date().toISOString(), // Add current timestamp
        Authorization: `Bearer ${authToken}`, // Authentication token in headers
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/report/submit-report",
        formData,
        config
      );
      console.log(response.data);
      alert("Report submitted successfully!");
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred. Please try again."); // Manage error message
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  if (!isLoggedIn()) {
    return (
      // Conditional rendering based on login status
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10 col-md-10">
            <div className="border rounded-5 p-3 p-lg-5 bg-white text-center shadow">
              <h2>يجب تسجيل الدخول للإبلاغ عن المشكل</h2>
              <Link className="link-success" href="/login-user">
                سجل من هنا
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Container
      className="d-flex justify-content-center align-items-center min-vh-100 p-5"
      style={{ fontFamily: "IBM Plex Sans Arabic, sans-serif" }}
    >
      <Row className="border rounded-5 p-3 bg-white shadow box-area">
        <Col
          md={6}
          className="rounded-4 d-flex justify-content-center align-items-center flex-column right-box"
          style={{ background: "#fff" }}
        >
          <div className="featured-image mb-3">
            <Image
              src="imgs/reportpqge.svg"
              className="img-fluid"
              style={{ width: "250px" }}
            />
          </div>
          <p
            className="text-success fs-2"
            style={{
              fontFamily: '"IBM Plex Sans Arabic", Courier, monospace',
              fontWeight: 600,
            }}
          >
            إبلاغ
          </p>
        </Col>
        <Col md={6} className="left-box py-2">
          <Row className="align-items-center" style={{ direction: "rtl" }}>
            <div className="header-text mb-4">
              <h2>بلغ و شارك في إيجاد الحلول</h2>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Select
                  className="form-control-lg bg-light fs-6"
                  value={categorie}
                  onChange={(e) => setCategorie(e.target.value)}
                  required
                >
                  <option value="">الجهات المعنية</option>
                  {categories.map((category, index) => (
                    <option key={index} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="text"
                  className="form-control-lg bg-light fs-6"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="الموقع"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  type="file"
                  className="form-control-lg bg-light fs-6"
                  onChange={handleImageChange}
                  placeholder="أضف صورة"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  className="form-control-lg bg-light fs-6"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="الوصف"
                  rows={3}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Button type="submit" className="btn-lg btn-success w-100 fs-6">
                  تأكيد
                </Button>
              </Form.Group>
            </Form>
            <Row>
              <small>
                ليس لديك حساب؟{" "}
                <Link className="link-success" href="#">
                  سجل
                </Link>
              </small>
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default ReportForm;

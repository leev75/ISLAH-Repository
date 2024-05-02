"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/app/hook/useAuth";
import { useRouter } from "next/router";
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
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <div
        style={{
          maxWidth: "800px",
          margin: "40px auto",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "20px",
            backgroundColor: "#fff",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            style={{
              marginBottom: "20px",
            }}
          >
            <Image
              src={url}
              alt="Logo"
              style={{
                width: "250px",
                borderRadius: "10px",
              }}
              width={250}
              height={250}
            />
          </div>
          <p
            style={{
              fontSize: "24px",
              fontWeight: 600,
              color: "#28a745",
              fontFamily: "'IBM Plex Sans Arabic', Courier, monospace",
            }}
          >
            إصلاح
          </p>
          <p>hesdsdsds</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div
            style={{
              padding: "20px",
              backgroundColor: "#fff",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            }}
          >
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <h2>إنشاء حساب جديد</h2>
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                name="name"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                placeholder="الاسم الكامل"
                value={userData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <input
                type="text"
                name="phoneNumber"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  width: "100%",
                  textAlign: "right",
                }}
                value={userData.phoneNumber}
                onChange={handleChange}
                placeholder=" رقم الهاتف"
              />
            </div>
            <div
              style={{
                marginBottom: "20px",
              }}
            >
              <input
                type="password"
                name="password"
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  borderRadius: "10px",
                  border: "1px solid #ccc",
                  width: "100%",
                }}
                placeholder="كلمة المرور"
                value={userData.password}
                onChange={handleChange}
              />
            </div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    marginRight: "10px",
                  }}
                />
                <label
                  style={{
                    fontSize: "14px",
                    color: "#666",
                  }}
                >
                  <small>أوافق على شروط الاستخدام</small>
                </label>
              </div>
              <div>
                <button
                  type="submit"
                  style={{
                    padding: "10px 20px",
                    fontSize: "16px",
                    color: "#fff",
                    backgroundColor: "#28a745",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  تسجيل الدخول
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;

"use client";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/all.css/style.css";
import { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { useAuth } from "@/app/hook/useAuth";
import { useManagerAuth } from "@/app/hook/useAuthManager";

function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const { isManagerLoggedIn, managerLogout } = useManagerAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true); // Once the component mounts, we know it's client-side.
  }, []);

  // Handlers remain the same
  const handleLogoutManager = () => {
    managerLogout();
  };
  const handleLogout = () => {
    logout();
  };

  if (!isClient) {
    return null; // Or render placeholders/loading indicators
  }

  return (
    <nav
      className="navbar navbar-expand-sm fixed-top"
      style={{
        background:
          "radial-gradient(circle at 10% 20%, rgb(50, 172, 109) 0%, rgb(209, 251, 155) 100.2%)",
        padding: "0 1rem",
      }}
    >
      <div className="container-fluid d-flex flex-row-reverse">
        <Link
          href="/"
          className="nav-link"
          style={{ textDecoration: "none", color: "#fff" }}
        >
          <Image
            src="/imgs/logoo.png_transparent_Plan de travail 1.png"
            alt="Logo"
            width={60}
            height={80}
            style={{ marginRight: "1rem" }}
          />
          <span style={{ fontSize: "1.5rem", fontWeight: "bold" }}>إصلاح</span>
        </Link>
        <Button
          className="navbar-toggler"
          type="Button"
          data-bs-toggle="collapse"
          data-bs-target="#mainmenu"
          aria-controls="mainmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ background: "#fff", color: "#34C759", border: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </Button>
        <div className="collapse navbar-collapse ms-auto" id="mainmenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                href="/community"
                className="nav-link"
                style={{
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  transition: "all 0.3s ease",
                }}
              >
                <Button
                  variant="outline-success"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    padding: 0,
                  }}
                >
                  مجتمع
                </Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link
                href="/report"
                className="nav-link"
                style={{
                  color: "#fff",
                  padding: "0.5rem 1rem",
                  borderRadius: "0.25rem",
                  transition: "all 0.3s ease",
                }}
              >
                <Button
                  variant="outline-success"
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "#fff",
                    padding: 0,
                  }}
                >
                  ابلاغ
                </Button>
              </Link>
            </li>
            {isLoggedIn() ? (
              <>
                <li className="nav-item">
                  <Button
                    variant="outline-success"
                    onClick={handleLogout}
                    style={{
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.25rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    تسجيل خروج
                  </Button>
                </li>

                <li className="nav-item">
                  <Link
                    href="/login-user/profile"
                    className="nav-link"
                    style={{
                      color: "#fff",
                      padding: "0.5rem 1rem",
                      borderRadius: "0.25rem",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <Button
                      variant="outline-success"
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "#fff",
                        padding: 0,
                      }}
                    >
                      حساب
                    </Button>
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link
                  href="/login-user"
                  className="nav-link"
                  style={{
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Button
                    variant="outline-success"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      padding: 0,
                    }}
                  >
                    تسجيل الدخول للمستخدم
                  </Button>
                </Link>
              </li>
            )}

            {isManagerLoggedIn() ? (
              <li>
                <Button
                  variant="outline-success"
                  onClick={handleLogoutManager}
                  style={{
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  تسجيل خروج المدير
                </Button>
              </li>
            ) : (
              <li>
                <Link
                  href="/login-manager"
                  className="nav-link"
                  style={{
                    color: "#fff",
                    padding: "0.5rem 1rem",
                    borderRadius: "0.25rem",
                    transition: "all 0.3s ease",
                  }}
                >
                  <Button
                    variant="outline-success"
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "#fff",
                      padding: 0,
                    }}
                  >
                    تسجيل الدخول للمدير
                  </Button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Nav;

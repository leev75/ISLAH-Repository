"use client";
import Link from "next/link";
import Image from "next/image";
import "@/public/css/all.css/style.css";
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useAuth } from "@/app/hook/useAuth";
import "@/components/BootstrapClient";
import { useManagerAuth } from "@/app/hook/useAuthManager";
function Nav() {
  const { isLoggedIn, logout } = useAuth();
  const { isManagerLoggedIn, managerLogout } = useManagerAuth();
  const handleLogoutManager = () => {
    managerLogout();
    // Optionally add redirection or other logic post logout
  };
  const handleLogout = () => {
    logout();
    // Optionally add redirection or other logic post logout
  };

  return (
    <nav
      className="navbar navbar-expand-sm fixed-top"
      style={{ background: "#34C759", padding: "0 1rem" }}
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
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainmenu"
          aria-controls="mainmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ background: "#fff", color: "#34C759", border: "none" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
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
            )}

            {isManagerLoggedIn() ? (
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
            ) : (
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
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Nav;

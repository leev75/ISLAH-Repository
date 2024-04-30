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
    <nav className="navbar navbar-expand-sm  fixed-top">
      <div className="container-fluid d-flex flex-row-reverse">
        <Link className="nav-link" href="/">
          <Image
            src="/imgs/logoo.png_transparent_Plan de travail 1.png"
            alt="Logo"
            width={60}
            height={80}
          />
          <span>إصلاح</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mainmenu"
          aria-controls="mainmenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="  collapse navbar-collapse ms-auto" id="mainmenu">
          <ul className=" navbar-nav me-auto ">
            <li className="nav-item">
              <Link href="/about" className="nav-link">
                <Button variant="outline-success">حول</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login-manager" className="nav-link">
                <Button variant="outline-success">تسجيل الدخول للمدير</Button>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/report" className="nav-link">
                <Button variant="outline-success">ابلاغ</Button>
              </Link>
            </li>
            {isLoggedIn() ? (
              <>
                <li className="nav-item">
                  <Button variant="outline-success" onClick={handleLogout}>
                    تسجيل خروج
                  </Button>
                </li>

                <li className="nav-item">
                  <Link href="/login-user/profile">
                    <Button variant="outline-success">ٍحساب</Button>
                  </Link>
                </li>
              </>
            ) : (
              <Link href="/login-user">
                <Button variant="outline-success">تسجيل الدخول للمستخدم</Button>
              </Link>
            )}

            {isManagerLoggedIn() ? (
              <Button variant="outline-success" onClick={handleLogoutManager}>
                تسجيل خروج المدير
              </Button>
            ) : (
              <Link href="/login-manager" className="nav-link">
                <Button variant="outline-success">تسجيل الدخول للمدير</Button>
              </Link>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
export default Nav;

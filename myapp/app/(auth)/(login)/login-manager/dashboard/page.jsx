"use client";
import CustomLayout from "./components/CustomLayout";
import UserTable from "./components/UserTable";
import { useManagerAuth } from "@/app/hook/useAuthManager";
import React, { useState } from "react";
import ReportTable from "./components/ReportTable";
import SidebarContainer from "./components/sideBar";
import "./components/style.css";

function DashBoard() {
  const { managerCategory } = useManagerAuth();
  const [colorScheme, setColorScheme] = useState("#d8dcd6"); // default color scheme

  return (
    <div className="backgrund">
      <CustomLayout></CustomLayout>
    </div>
  );
}

export default DashBoard;

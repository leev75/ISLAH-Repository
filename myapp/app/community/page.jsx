"use client";
import { useAuth } from "@/app/hook/useAuth"; // Authentication hook
import CustomLayout from "./component/CustomLayout";
import { Link } from "react-router-dom"; // add this line
import "./component/layout.css";

function Page() {

  return (
    <div className="background">
      <CustomLayout />
    </div>
  );
}

export default Page;

"use client";
import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserTable from "./UserTable";
import { useManagerAuth } from "@/app/hook/useAuthManager";
import ReportTable from "./ReportTable";
import "./style.css";

function SidebarContainer() {
  const { managerCategory, managerAuthToken } = useManagerAuth();
  const [activeKey, setActiveKey] = useState("Report DashBaord");

  const handleSelect = (key) => {
    setActiveKey(key); // Update the active key state
  };

  return (
    <div className="sidebar-container">
      <Tabs
        activeKey={activeKey}
        onSelect={handleSelect}
        id="fill-tab-example"
        className="mb-3 tabs-container"
        fill
        transition={false} // Disable default fading transition
      >
        <Tab eventKey="Report DashBaord">
          <div
            className={`tab-content ${
              activeKey === "Report DashBaord" ? "active" : ""
            }`}
          >
            <ReportTable
              managerCategory={managerCategory}
              managerAuthToken={managerAuthToken}
              className="able"
            />
          </div>
        </Tab>
      </Tabs>
      <style jsx>{`
        .sidebar-container {
          border: 1px solid #fff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease; /* Transition for click effect */
        }

        .tabs-container {
          margin-bottom: 20px;
        }

        .tab-content {
          padding: 20px;
          border: 1px solid #dee2e6;
          border-radius: 8px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
          transition: opacity 0.5s ease-in-out;
          transform: scale(1); /* Default scale */
        }

        .tab-content:not(.active) {
          display: none;
        }

        .tab-content.active {
          animation: fadeIn 0.5s;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Adding hover effect to simulate a click response */
        .tabs-container .nav-link.active {
          transform: scale(0.97); /* Slightly reduce size when active */
          transition: transform 0.3s ease;
        }

        /* Styling for tab titles */
        .nav-link {
          font-size: 18px; /* Larger font size for better readability */
          color: #046307; /* Dark green for a thematic color scheme */
          font-weight: bold; /* Makes the title text bold */
          text-transform: uppercase; /* UPPERCASE text for a more standout look */
          padding: 12px 20px; /* Adequate padding for better clickability and spacing */
          border-radius: 5px; /* Rounded corners for a softer appearance */
          background-color: #e4f5e9; /* Soft green background to highlight active tabs */
          transition: background-color 0.3s ease, color 0.3s ease; /* Smooth transition for hover effects */
        }

        /* Hover effect for tab titles */
        .nav-link:hover {
          background-color: #cdecd1; /* Lighter green on hover for interactivity */
          color: #023d02; /* Darker text color on hover */
        }

        /* Extra styling for the active tab to make it distinct */
        .nav-link.active {
          background-color: #a2d9ce; /* A distinct green shade for active tab */
          color: #012e01; /* Dark green text color for contrast on active tab */
          box-shadow: 0 2px 8px rgba(0, 100, 0, 0.2); /* Subtle shadow for depth */
        }
      `}</style>
    </div>
  );
}

export default SidebarContainer;

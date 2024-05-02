"use client";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import UserTable from "./UserTable";
import { useManagerAuth } from "@/app/hook/useAuthManager";
import ReportTable from "./ReportTable";
import Reportchart from "./Reportchart";

function SidebarContainer() {
  const { managerCategory, managerAuthToken } = useManagerAuth();
  console.log(managerAuthToken);
  return (
    <div className="sidebar-container">
      <Tabs
        defaultActiveKey="Report DashBaord"
        id="fill-tab-example"
        className="mb-3 tabs-container"
        fill
      >
        <Tab eventKey="Report DashBaord" title="Report DashBaord">
          <div className="tab-content">
            <ReportTable
              managerCategory={managerCategory}
              managerAuthToken={managerAuthToken}
              className="report-table"
            />
          </div>
        </Tab>
        <Tab eventKey="User DashBaord" title="User DashBaord">
          <div className="tab-content">
            <UserTable
              managerCategory={managerCategory}
              managerAuthToken={managerAuthToken}
              className="user-table"
            />
            <Reportchart className="report-chart" />
          </div>
        </Tab>
      </Tabs>
      <style jsx>{`
        .sidebar-container {
          padding: 20px;
          background-color: #f7f7f7;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }

        .tabs-container {
          margin-top: 20px;
        }

        .tab-content {
          padding: 20px;
        }

        .text-des {
          text-align: center;
          font-size: 14px;
          color: #666;
        }

        .report-table {
          margin-bottom: 20px;
        }

        .user-table {
          margin-bottom: 20px;
        }

        .report-chart {
          margin-top: 20px;
        }
      `}</style>
    </div>
  );
}

export default SidebarContainer;

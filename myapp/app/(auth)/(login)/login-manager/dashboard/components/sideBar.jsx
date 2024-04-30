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
    <Tabs
      defaultActiveKey="Report DashBaord"
      id="fill-tab-example"
      className="mb-3"
      fill
    >
      <Tab eventKey="Report DashBaord" title="Report DashBaord">
        <ReportTable
          managerCategory={managerCategory}
          managerAuthToken={managerAuthToken}
        />
      </Tab>
      <Tab eventKey="User DashBaord" title="User DashBaord">
        <UserTable
          managerCategory={managerCategory}
          managerAuthToken={managerAuthToken}
        />
        <Reportchart />
      </Tab>
    </Tabs>
  );
}

export default SidebarContainer;

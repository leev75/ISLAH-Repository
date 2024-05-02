import Dropdown from "react-bootstrap/Dropdown";

function changeStatus({ report_id, managerAuthToken }) {
  const updateStatus = async (status) => {
    console.log(status);
    try {
      const response = await fetch(`http://localhost:5000/api/auth/validate`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${managerAuthToken}`, // add the token here
        },
        body: JSON.stringify({ status, report_id }),
      });

      if (response.ok) {
        console.log("Status updated successfully");
      } else {
        console.error("Failed to update status");
      }
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Reported
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item onClick={() => updateStatus("In Progress")}>
          In Progress
        </Dropdown.Item>
        <Dropdown.Item onClick={() => updateStatus("Completed")}>
          Completed
        </Dropdown.Item>
        <Dropdown.Item onClick={() => updateStatus("Rejected")}>
          Rejected
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default changeStatus;

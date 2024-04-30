import Dropdown from "react-bootstrap/Dropdown";

function changeStatus() {
  return (
    <Dropdown>
      <Dropdown.Toggle variant="success" id="dropdown-basic">
        Reported
      </Dropdown.Toggle>

      <Dropdown.Menu variant="dark">
        <Dropdown.Item href="#/action-1">In Prograss</Dropdown.Item>
        <Dropdown.Item href="#/action-2">completed</Dropdown.Item>
        <Dropdown.Item href="#/action-3">Refused</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default changeStatus;

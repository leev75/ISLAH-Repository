import styled from "styled-components";
import { Table } from "react-bootstrap";

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  text-align: center;
  color: #2c3e50;
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 2.5em;
`;

const Subtitle = styled.h2`
  text-align: center;
  color: #16a085;
  margin-bottom: 20px;
  font-size: 1.5em;
`;

const StyledTable = styled(Table)`
  border-collapse: separate;
  border-spacing: 0 10px;

  thead {
    background-color: #34495e;
    color: white;

    tr {
      th {
        padding: 15px;
        &:hover {
          cursor: pointer;
          color: #1abc9c;
        }
      }
    }
  }

  tbody {
    tr {
      background-color: #ecf0f1;
      border-bottom: 2px solid #bdc3c7;
      transition: background-color 0.3s;
      &:hover {
        background-color: #bdc3c7;
      }
      td {
        padding: 15px;
      }
    }
  }
`;

export { Container, Title, Subtitle, StyledTable };

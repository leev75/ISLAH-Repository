"use client";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import { useState, useEffect } from "react";

function PlaceContainer({ reports }) {
  return (
    <>
      {reports.map((report) => (
        <div className="flex-item" key={report.report_id}>
          <Card style={{ width: "30rem" }}>
            <Card.Img variant="top" src={report.image} />
            <Card.Body>
              <Card.Title>Card Title</Card.Title>
              <Card.Text>{report.description}</Card.Text>
              <Card.Text>{report.description}</Card.Text>
              <Card.Text>{report.categorie}</Card.Text>
              <Button variant="primary">{report.nbr_Of_Votes}</Button>
              <Card.Text>{report.date}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
    </>
  );
}

export default PlaceContainer;

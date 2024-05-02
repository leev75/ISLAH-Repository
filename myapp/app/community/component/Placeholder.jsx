"use client";
import React from "react";
import styles from "@/public/css/other.css/community.css";
import VoteButton from "./VoteButton";

function PlaceContainer({ reports }) {
  return (
    <div className="examples-container">
      {reports.map((report) => (
        <div className="example" key={report.report_id}>
          <img
            src={report.image}
            alt={report.categorie}
            className="example-image"
          />
          <div className="info">
            <span>Categorie:</span> <span>{report.categorie}</span>
          </div>
          <div className="info">
            <span>Description:</span> <span>{report.description}</span>
          </div>
          <div className="info">
            <span></span> <span>{report.date}</span>
          </div>
          <div className="vote-button-container">
            <button className="vote-button">
              {" "}
              Vote
              <VoteButton reportId={report.report_id} />
            </button>
            <span className="vote-count">{report.nbr_Of_vote}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceContainer;

import React from "react";
import VoteButton from "./VoteButton";
import "./layout.css"; // Ensure the path is correct

function PlaceContainer({ reports }) {
  function formatDate(dateString) {
    const date = new Date(dateString);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
    };
    return date.toLocaleDateString("AR-DZ", options);
  }

  return (
    <div className="examples-container">
      {reports.map((report) => (
        <div className="example" key={report.report_id}>
          <div
            className="example-image-wrapper"
            style={{ position: "relative" }}
          >
            <img
              src={report.image}
              alt={report.categorie}
              className="example-image"
            />
            <div>
              {report.status === "Reported" ? (
                <div className="badge-overlay-Gray">{report.status}</div>
              ) : report.status === "Completed" ? (
                <div className="badge-overlay-Green">{report.status}</div>
              ) : (
                <div className="badge-overlay-Orange">{report.status}</div>
              )}
            </div>
          </div>
          <div className="info">
            <span className="cool-span">Categorie:</span>{" "}
            <span>{report.categorie}</span>
          </div>
          <div className="info">
            <span className="cool-span">Description:</span>{" "}
            <span>{report.description}</span>
          </div>
          <div className="info">
            <span className="cool-span">Date :</span>{" "}
            <span>{formatDate(report.date)}</span>
          </div>
          <div className="vote-button-container">
            <VoteButton
              votes={report.nbr_Of_Votes}
              reportId={report.report_id}
            />
            <span className="vote-count">{report.nbr_Of_Votes}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlaceContainer;

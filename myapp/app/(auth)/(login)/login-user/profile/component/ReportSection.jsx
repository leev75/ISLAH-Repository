"use client";
import { useAuth } from "@/app/hook/useAuth";
import { useState } from "react";

function ReportSection({ report }) {
  const [editMode, setEditMode] = useState(null);
  const [editedReport, setEditedReport] = useState({});
  const { authToken } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");
  const [sortByDate, setSortByDate] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [sortedReports, setSortedReports] = useState(report);

  const handleDelete = async (report_id) => {
    try {
      console.log(report_id);
      const res = await fetch(
        `http://localhost:5000/api/report/delete-report/${report_id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (res.ok) {
        alert("تم حذف التقرير        ");
        // You might want to fetch the updated data here
      } else {
        const errorMessage = await res.text();
        setErrorMessage(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const EditHandleClick = async (report_id) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/report/edite-report/${report_id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify(editedReport),
        }
      );

      if (res.ok) {
        const data = await res.json();
        setEditMode(null);
        alert(data);
      } else {
        const errorMessage = await res.text();
        setErrorMessage(errorMessage);
        alert(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  const handleSortByDate = () => {
    setSortByDate(true);
    setSelectedCategory("");
    const sortedReports = [...report].sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    setSortedReports(sortedReports);
  };

  const handleSortByCategory = (category) => {
    setSortByDate(false);
    setSelectedCategory(category);
    const filteredReports = report.filter(
      (report) => report.categorie === category
    );
    setSortedReports(filteredReports);
  };

  const handleEdit = (report) => {
    setEditedReport(report);
    setEditMode(report.report_id);
  };

  const handleSaveEdit = (report_id) => {
    EditHandleClick(report_id);
  };

  const handleCancelEdit = () => {
    setEditMode(null);
  };

  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "20px auto",
        backgroundColor: "#f2f2f2",
        padding: "20px",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h2
        style={{ color: "#198754", marginBottom: "20px", textAlign: "center" }}
      >
        My Reports
      </h2>
      <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button
          onClick={handleSortByDate}
          className="btn btn-link"
          style={{
            color: "#198754",
            fontWeight: "bold",
            fontSize: "18px",
            marginRight: "10px",
            backgroundColor: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #000",
          }}
        >
          Sort by Date
        </button>
        <button
          onClick={() => handleSortByCategory("Electricity / Gaz")}
          className="btn btn-link"
          style={{
            color: "#198754",
            fontWeight: "bold",
            fontSize: "18px",
            marginRight: "10px",
            backgroundColor: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #000",
          }}
        >
          Electricity / Gaz
        </button>
        <button
          onClick={() => handleSortByCategory("ONA")}
          className="btn btn-link"
          style={{
            color: "#198754",
            fontWeight: "bold",
            fontSize: "18px",
            marginRight: "10px",
            backgroundColor: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #000",
          }}
        >
          ONA
        </button>
        <button
          onClick={() => handleSortByCategory("Water")}
          className="btn btn-link"
          style={{
            color: "#198754",
            fontWeight: "bold",
            fontSize: "18px",
            marginRight: "10px",
            backgroundColor: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #000",
          }}
        >
          Water
        </button>
        <button
          onClick={() => handleSortByCategory("Telecominication")}
          className="btn btn-link"
          style={{
            color: "#198754",
            fontWeight: "bold",
            fontSize: "18px",
            marginRight: "10px",
            backgroundColor: "#fff",
            padding: "8px 16px",
            borderRadius: "8px",
            border: "1px solid #000",
          }}
        >
          Telecominication
        </button>
      </div>
      {sortedReports.map((report) => (
        <div
          key={report.report_id}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "8px",
            backgroundColor: "#fff",
          }}
        >
          {editMode === report.report_id ? (
            <>
              <input
                type="text"
                value={editedReport.description || ""}
                onChange={(e) =>
                  setEditedReport({
                    ...editedReport,
                    description: e.target.value,
                  })
                }
                placeholder="Description"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                }}
              />
              <input
                type="text"
                value={editedReport.location || ""}
                onChange={(e) =>
                  setEditedReport({ ...editedReport, location: e.target.value })
                }
                placeholder="Location"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                }}
              />
              <input
                type="text"
                value={editedReport.image || ""}
                onChange={(e) =>
                  setEditedReport({ ...editedReport, image: e.target.value })
                }
                placeholder="Picture URL"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                }}
              />
              <input
                type="text"
                value={editedReport.categorie || ""}
                onChange={(e) =>
                  setEditedReport({
                    ...editedReport,
                    categorie: e.target.value,
                  })
                }
                placeholder="Category"
                style={{
                  marginBottom: "10px",
                  padding: "10px",
                  width: "100%",
                  borderRadius: "4px",
                  border: "1px solid #ced4da",
                }}
              />
              <button
                onClick={() => handleSaveEdit(report.report_id)}
                className="btn btn-success btn-link"
                style={{
                  marginRight: "5px",
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "1px solid #000",
                  fontWeight: "bold",
                }}
              >
                Save
              </button>
              <button
                onClick={handleCancelEdit}
                className="btn btn-primary btn-link"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "1px solid #000",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Cancel
              </button>
            </>
          ) : (
            <>
              <p style={{ color: "#198754", fontWeight: "bold" }}>
                Description: {report.description}
              </p>
              <p style={{ color: "#198754", fontWeight: "bold" }}>
                Location: {report.location}
              </p>
              <p style={{ color: "#198754", fontWeight: "bold" }}>
                Picture: {report.image}
              </p>
              <p style={{ color: "#198754", fontWeight: "bold" }}>
                Category: {report.categorie}
              </p>
            </>
          )}
          <p style={{ color: "#198754", fontWeight: "bold" }}>
            Date: {report.date}
          </p>
          {!editMode && (
            <>
              <button
                onClick={() => handleEdit(report)}
                className="btn btn-primary btn-link"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "1px solid #000",
                  fontWeight: "bold",
                  marginRight: "10px",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(report.report_id)}
                className="btn btn-danger btn-link"
                style={{
                  backgroundColor: "#fff",
                  color: "#000",
                  padding: "10px 20px",
                  borderRadius: "4px",
                  border: "1px solid #000",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
export default ReportSection;

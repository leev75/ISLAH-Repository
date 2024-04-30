"use client";
import { useState } from "react";
const ReportComponent = () => {
  // State pour stocker les détails du rapport
  const [report, setReport] = useState({
    location: "",
    description: "",
    category: "",
    image: "",
  });

  // Fonction pour mettre à jour les détails du rapport
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReport({ ...report, [name]: value });
  };

  // Fonction pour soumettre les détails du rapport
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/api/auth/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(report),
      });
      const data = await response.text();
      console.log(data); // Afficher la réponse du serveur
      // Réinitialiser les détails du rapport après la soumission réussie
      setReport({
        location: "",
        description: "",
        category: "",
        image: "",
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <h2>Report Details</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="location">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={report.location}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={report.description}
            onChange={handleInputChange}
          ></textarea>
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={report.category}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image:</label>
          <input
            type="text"
            id="image"
            name="image"
            value={report.image}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ReportComponent;

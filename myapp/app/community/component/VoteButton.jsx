"use client";
import { useAuth } from "@/app/hook/useAuth";
import { useState, useEffect } from "react";
import "./layout.css";
import { Button } from "react-bootstrap";

function VoteButton({ reportId, votes }) {
  const v1 = votes + 1;
  const { authToken } = useAuth();
  const [vote, setVote] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [hasVoted, setHasVoted] = useState(false);

  const handleClick = async () => {
    setHasVoted(!hasVoted);
    if (!authToken) {
      setErrorMessage("Authentication token is invalid");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/vote/submit-vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ reportId }),
      });

      if (res.ok) {
        const data = await res.json();
        const { vote } = data;
        alert("vote has been updated", errorMessage);
        setVote(vote);
      } else {
        const errorMessage = await res.text();
        setErrorMessage(errorMessage);
      }
    } catch (error) {
      console.error(error);
      setErrorMessage(error.message || "An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Button className="button" onClick={handleClick}>
        {hasVoted ? "Unvote" : "Vote"}
      </Button>
    </div>
  );
}

export default VoteButton;

import React from "react";

function Clear() {
  const clearLogs = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/clearLogs", {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Logs cleared successfully!");
      } else {
        alert("Failed to clear logs!");
      }
    } catch (error) {
      console.error("Error clearing logs:", error);
    }
  };

  return (
    <div className="clear-button-container">
      <button className="clear-button" onClick={clearLogs}>
        Clear Logs
      </button>
    </div>
  );
}

export default Clear;

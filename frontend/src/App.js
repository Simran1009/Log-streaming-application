import React, { useState, useEffect } from "react";
import LogList from "./components/LogList";
import SearchBar from "./components/SearchBar";
import FilterOptions from "./components/FilterOptions";
import "./index.css"; // Importing styles

function App() {
  const [logs, setLogs] = useState([]);
  const [filteredLogs, setFilteredLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [logLevel, setLogLevel] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  // Fetch historical logs from the backend
  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const response = await fetch("http://localhost:4000/api/logs");
        if (response.ok) {
          const data = await response.json();
          setLogs(data.logs);
          setLoading(false);
        } else {
          console.error("Failed to fetch logs");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching logs:", error);
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

  // WebSocket connection for receiving logs in real-time
  useEffect(() => {
    const socket = new WebSocket("ws://localhost:4000");

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      // Handle log clearing action from WebSocket
      if (data.action === "CLEAR_LOGS") {
        setLogs([]); // Clear logs when instructed by server
      } else {
        setLogs((prevLogs) => [...prevLogs, data]); // Append new log
      }
    };

    socket.onopen = () => {
      console.log("WebSocket connected.");
    };

    socket.onclose = () => {
      console.log("WebSocket disconnected.");
    };

    return () => socket.close(); // Clean up WebSocket on component unmount
  }, []);

  // Filter logs whenever filters change
  useEffect(() => {
    const filtered = logs
      .filter((log) =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter((log) => (logLevel ? log.level === logLevel : true))
      .filter((log) => {
        const logTime = new Date(log.timestamp).getTime();
        const startTime = startDate ? new Date(startDate).getTime() : null;
        const endTime = endDate ? new Date(endDate).getTime() : null;

        return (
          (!startTime || logTime >= startTime) &&
          (!endTime || logTime <= endTime)
        );
      });
    setFilteredLogs(filtered);
  }, [logs, searchTerm, logLevel, startDate, endDate]);

  // Clear logs on both frontend and server
  const handleClearLogs = async () => {
    try {
      const response = await fetch("http://localhost:4000/api/logs", {
        method: "DELETE",
      });
      if (response.ok) {
        setLogs([]); // Clear logs locally
        console.log("Logs cleared successfully.");
      } else {
        console.error("Failed to clear logs.");
      }
    } catch (error) {
      console.error("Error clearing logs:", error);
    }
  };

  return (
    <div className="app-container">
      <h1 className="app-title">Log Streaming Application</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <FilterOptions
        logLevel={logLevel}
        setLogLevel={setLogLevel}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
      />
      <button className="clear-button" onClick={handleClearLogs}>
        Clear Logs
      </button>
      {loading ? (
        <div className="loading">Loading logs...</div>
      ) : (
        <LogList logs={filteredLogs} />
      )}
    </div>
  );
}

export default App;

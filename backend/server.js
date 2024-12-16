const express = require("express");
const { createServer } = require("http");
const WebSocket = require("ws");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

// Create an Express app
const app = express();
const PORT = 4000;

// Enable CORS
app.use(cors());

// Create an HTTP server and attach WebSocket
const server = createServer(app);
const wss = new WebSocket.Server({ server });

// Store connected clients
const clients = [];

// WebSocket connection handler
wss.on("connection", (ws) => {
  console.log("Client connected");
  clients.push(ws);

  // Remove client when disconnected
  ws.on("close", () => {
    console.log("Client disconnected");
    const index = clients.indexOf(ws);
    if (index > -1) clients.splice(index, 1);
  });
});

// Simulated log generation
let logCount = 0;
function generateLog() {
  logCount++;
  const logMessage = `Log Message #${logCount} - Example Log Generated at ${new Date().toISOString()}`;

  // Save log to a file
  fs.appendFileSync(path.join(__dirname, "logs.txt"), logMessage + "\n");

  // Send log to connected WebSocket clients
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ timestamp: new Date().toISOString(), level: "INFO", message: logMessage }));
    }
  });
}

// Generate a log every 5 seconds (simulate real-time log generation)
setInterval(generateLog, 5000);

// HTTP endpoint to fetch historical logs
app.get("/api/logs", (req, res) => {
  const logFilePath = path.join(__dirname, "logs.txt");
  if (fs.existsSync(logFilePath)) {
    const logs = fs.readFileSync(logFilePath, "utf-8")
      .split("\n")
      .map(line => {
        const [timestamp, level, ...messageParts] = line.split(" ");
        return {
          timestamp,
          level,
          message: messageParts.join(" "),
        };
      })
      .filter(log => log.message);
    res.json({ logs });
  } else {
    res.json({ logs: [] });
  }
});

// HTTP endpoint to clear logs
app.delete("/api/logs", (req, res) => {
  const logFilePath = path.join(__dirname, "logs.txt");

  // Clear the log file
  fs.writeFileSync(logFilePath, ""); // Overwrite file with empty content

  // Notify clients about the cleared logs
  clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ action: "CLEAR_LOGS" }));
    }
  });

  res.status(200).json({ message: "Logs cleared successfully." });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

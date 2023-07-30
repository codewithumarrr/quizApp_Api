const express = require("express");
const mysql = require("mysql2");
const routes = require("./routers/routes");
const cors = require("cors");

const app = express();

// Create a database connection
const connection = mysql.createConnection({
  host: "localhost", // or your XAMPP server IP address
  user: "root",
  password: "",
  database: "quiz_db",
});

connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database:", err);
    return;
  }
  console.log("Connected to MySQL database!");
});

// Set up API routes
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const port = 3000; // Or any other port number you prefer
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Close the database connection when the server is shutting down
process.on("SIGINT", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
    }
    console.log("Connection closed.");
    process.exit();
  });
});

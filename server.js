const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// connection
const connection = mysql.createConnection({
  host: "localhost",
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

// routes & middleware setuP
app.use(cors());
app.use(express.json());
app.use("/api", require("./routers/routes"));

//invalid routes handler..
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middlewaree
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// Close db connection
process.on("SIGINT", () => {
  connection.end((err) => {
    if (err) {
      console.error("Error closing the connection:", err);
    }
    console.log("Connection closed.");
    process.exit();
  });
});

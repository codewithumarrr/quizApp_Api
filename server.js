const express = require("express");
const cors = require("cors");
const { connectDB, closeDBConnection } = require("./db/db");
const routes = require("./routers/routes");

const app = express();

connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/api", routes);

// Invalid routes handler
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Something went wrong" });
});

// Start the server
const port = 3000;
const server = app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

process.on("SIGINT", () => {
  closeDBConnection();
});

process.on("exit", () => {
  closeDBConnection();
});

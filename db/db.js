const mongoose = require("mongoose");

const DB_URL = "mongodb://127.0.0.1:27017/quiz_db";

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
};

const closeDBConnection = async () => {
  try {
    await mongoose.connection.close();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  } catch (err) {
    console.error("Error closing the connection:", err);
    process.exit(1);
  }
};

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

mongoose.connection.on("disconnected", () => {
  console.log("Disconnected from MongoDB");
});

process.on("SIGINT", closeDBConnection);
process.on("SIGTERM", closeDBConnection);

module.exports = { connectDB, closeDBConnection };

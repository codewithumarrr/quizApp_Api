const mysql = require("mysql2");

const connection = mysql.createConnection({
  // host: "host.docker.internal",
  host: "localhost",
  user: "root",
  password: "",
  database: "quiz_db",
});

module.exports = {
  connection,
};

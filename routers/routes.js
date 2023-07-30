const express = require("express");
const router = express.Router();
const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost", 
  user: "root",
  password: "",
  database: "quiz_db",
});
// registr single question
router.post("/questions", (req, res) => {
  const { question } = req.body;

  const sql = "INSERT INTO questions (question) VALUES (?)";

  connection.query(sql, [question], (err, results) => {
    if (err) {
      console.error("Error adding question:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json({ message: "Question added successfully" });
    }
  });
});
// combined query... jst to get id before registering answer n options..
router.post("/answers", (req, res) => {
  const { question, correct_answer, option_a, option_b, option_c, option_d } = req.body;

  
  const insertQuestionSql = "INSERT INTO questions (question) VALUES (?)";
  connection.query(insertQuestionSql, [question], (err, questionResult) => {
    if (err) {
      console.error("Error adding question:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      // Step 2: Use the obtained question_id to insert the new answer
      const questionId = questionResult.insertId;
      const insertAnswerSql =
        "INSERT INTO answers (question_id, correct_answer, option_a, option_b, option_c, option_d) VALUES (?, ?, ?, ?, ?, ?)";
      connection.query(
        insertAnswerSql,
        [questionId, correct_answer, option_a, option_b, option_c, option_d],
        (err, answerResult) => {
          if (err) {
            console.error("Error adding answer:", err);
            res.status(500).json({ error: "Something went wrong" });
          } else {
            res.json({ message: "Answer added successfully" });
          }
        }
      );
    }
  });
});

// updating user_answer...
router.post("/answers/:questionId", (req, res) => {
  const questionId = req.params.questionId;
  const userAnswer = req.body.userAnswer; 

  if (!userAnswer) {
    res.status(400).json({ error: "User answer cannot be empty" });
    return;
  }

  const sql = "UPDATE answers SET user_answer = ? WHERE question_id = ?";
  connection.query(sql, [userAnswer, questionId], (err, result) => {
    if (err) {
      console.error("Error updating user answer:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json({ message: "User answer saved successfully" });
    }
  });
});
// get all questions
router.get("/questions", (req, res) => {
  const sql = "SELECT * FROM questions";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(results);
    }
  });
});

// get specific answer 
router.get("/answers/:questionId", (req, res) => {
  const questionId = req.params.questionId;
  const sql = "SELECT * FROM answers WHERE question_id = ?";
  connection.query(sql, [questionId], (err, results) => {
    if (err) {
      console.error("Error fetching answers:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(...results);
    }
  });
});
// get all answers
router.get("/answers", (req, res) => {
  const sql = "SELECT * FROM answers";
  connection.query(sql, [questionId], (err, results) => {
    if (err) {
      console.error("Error fetching answers:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(results);
    }
  });
});

module.exports = router;

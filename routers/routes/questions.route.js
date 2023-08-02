const { connection } = require("../../db/dbConnect");

const getQuestionsRoute = (req, res) => {
  const sql = "SELECT * FROM `questions`";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(results);
    }
  });
};
const getRandomQuestionsRoute = (req, res) => {
  const number = req.params.number;
  const sql =
    "SELECT * FROM `questions` GROUP BY `id` ORDER BY RAND() LIMIT 0, ?";
  connection.query(sql, [+number], (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(results);
    }
  });
};

const getQuestionByIdRoute = (req, res) => {
  const questionId = req.params.questionId; // Use req.params.questionId to get the questionId
  const sql = "SELECT * FROM questions where id = ?";
  connection.query(sql, [questionId], (err, results) => {
    if (err) {
      console.error("Error fetching question:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      if (results.length === 0) {
        // If no question is found with the given questionId
        res.status(404).json({ error: "Question not found" });
      } else {
        res.json(results[0]); // Use results[0] to send the single question object
      }
    }
  });
};

const postQuestionRoute = (req, res) => {
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
};

const postQuestionAnswerCombinedRoute = (req, res) => {
  const { question, correct_answer, option_a, option_b, option_c, option_d } =
    req.body;

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
};

module.exports = {
  getQuestionsRoute,
  getQuestionByIdRoute,
  getRandomQuestionsRoute,
  postQuestionRoute,
  postQuestionAnswerCombinedRoute,
};

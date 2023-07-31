const { connection } = require("../../db/dbConnect");

const getQuestionsRoute = (req, res) => {
  const sql = "SELECT * FROM questions";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching questions:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(results);
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
  postQuestionRoute,
  postQuestionAnswerCombinedRoute,
};

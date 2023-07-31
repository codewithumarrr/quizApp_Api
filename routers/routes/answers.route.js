const { connection } = require("../../db/dbConnect");

const getAnswerByIdRoute = (req, res) => {
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
};

const getAnswersRoute = (req, res) => {
  const sql = "SELECT * FROM answers";
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching answers:", err);
      res.status(500).json({ error: "Something went wrong" });
    } else {
      res.json(results);
    }
  });
};

const updateUserAnswerRoute = (req, res) => {
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
};

module.exports = {
  getAnswerByIdRoute,
  getAnswersRoute,
  updateUserAnswerRoute,
};

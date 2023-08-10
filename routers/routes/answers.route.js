const express = require("express");
const router = express.Router();
const Answer = require("../../models/answersModel");

const getAnswerByIdRoute = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const answers = await Answer.find({ question_id: questionId });
    res.status(200).json(answers);
  } catch (err) {
    console.error("Error fetching answers:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getAnswersRoute = async (req, res) => {
  try {
    const answers = await Answer.find();
    res.status(200).json(answers);
  } catch (err) {
    console.error("Error fetching answers:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const updateUserAnswerRoute = async (req, res) => {
  const questionId = req.params.questionId;
  const userAnswer = req.body.userAnswer;

  if (!userAnswer) {
    res.status(400).json({ error: "User answer cannot be empty" });
    return;
  }

  try {
    const answer = await Answer.findOneAndUpdate(
      { question_id: questionId },
      { user_answer: userAnswer },
      { new: true }
    );

    if (!answer) {
      res.status(404).json({ error: "Answer not found" });
    } else {
      res.json({ message: "User answer saved successfully" });
    }
  } catch (err) {
    console.error("Error updating user answer:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getAnswerByIdRoute,
  getAnswersRoute,
  updateUserAnswerRoute,
};

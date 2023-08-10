const express = require("express");
const router = express.Router();
const Question = require("../../models/questionsModel");
const Answer = require("../../models/answersModel");

const getQuestionsRoute = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching questions:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getRandomQuestionsRoute = async (req, res) => {
  const number = parseInt(req.params.number);
  try {
    const questions = await Question.aggregate([{ $sample: { size: number } }]);
    res.status(200).json(questions);
  } catch (err) {
    console.error("Error fetching random questions:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const getQuestionByIdRoute = async (req, res) => {
  const questionId = req.params.questionId;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      res.status(404).json({ error: "Question not found" });
    } else {
      res.status(200).json(question);
    }
  } catch (err) {
    console.error("Error fetching question:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const postQuestionRoute = async (req, res) => {
  const { question } = req.body;
  try {
    await Question.create({ question });
    res.status(201).json({ message: "Question added successfully" });
  } catch (err) {
    console.error("Error adding question:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const postQuestionAnswerCombinedRoute = async (req, res) => {
  const { question, correct_answer, option_a, option_b, option_c, option_d } =
    req.body;

  try {
    const newQuestion = await Question.create({ question });

    const newAnswer = await Answer.create({
      question_id: newQuestion._id,
      correct_answer,
      option_a,
      option_b,
      option_c,
      option_d,
    });

    res.status(201).json({ message: "Question and answer added successfully" });
  } catch (err) {
    console.error("Error adding question and answer:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  getQuestionsRoute,
  getQuestionByIdRoute,
  getRandomQuestionsRoute,
  postQuestionRoute,
  postQuestionAnswerCombinedRoute,
};

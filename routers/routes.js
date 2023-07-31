const express = require("express");
const router = express.Router();
const {
  getQuestionsRoute,
  postQuestionRoute,
  postQuestionAnswerCombinedRoute,
} = require("./routes/questions.route");

const {
  getAnswerByIdRoute,
  getAnswersRoute,
  updateUserAnswerRoute,
} = require("./routes/answers.route");

// registr single question
router.post("/questions", postQuestionRoute);

// combined query... jst to get id before registering answer nd options..
router.post("/answers", postQuestionAnswerCombinedRoute);

// updating user_answer...
router.post("/answers/:questionId", updateUserAnswerRoute);

// get all questions
router.get("/questions", getQuestionsRoute);

// get specific answer
router.get("/answers/:questionId", getAnswerByIdRoute);

// get all answers
router.get("/answers", getAnswersRoute);

module.exports = router;

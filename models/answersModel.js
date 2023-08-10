const mongoose = require("mongoose");

const answerSchema = new mongoose.Schema({
  question_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Question",
    required: true,
  },
  correct_answer: {
    type: String,
    required: true,
  },
  option_a: {
    type: String,
    required: true,
  },
  option_b: {
    type: String,
    required: true,
  },
  option_c: {
    type: String,
    required: true,
  },
  option_d: {
    type: String,
    required: true,
  },
});

const Answer = mongoose.model("Answer", answerSchema);

module.exports = Answer;

const mongoose = require("mongoose");

const courseQuizSolution = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    quizId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses-quiz",
      required: true,
    },
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    answer: {
      type: String,
    },
    correctSolution: {
      type: String,
    },
    isCorrect: {
      type: Boolean,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("courses-quiz-solution", courseQuizSolution);

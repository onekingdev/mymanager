const mongoose = require("mongoose");

const courseAssignmentSolution = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    assignmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses-assignment",
      required: true,
    },
    learnerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    solutionFile: {
      type: String,
    },
    description: {
      type: String,
    },
    comments: {
      type: String,
    },
    score: {
      type: String,
    },
    remarks: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("courses-assignment-solution", courseAssignmentSolution);

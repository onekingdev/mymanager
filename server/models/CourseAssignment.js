const mongoose = require("mongoose");

const courseAssignmentSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courses",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course-lesson",
      required: true,
    },
    question: {
      type: String,
    },
    description: {
      type: String,
    },
    comments: {
      type: String,
    },
    totalScore: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true }
);

module.exports = mongoose.model("courses-assignment", courseAssignmentSchema);

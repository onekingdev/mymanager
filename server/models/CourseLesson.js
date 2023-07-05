const mongoose = require("mongoose");
const schema = mongoose.Schema;

const courseLesson = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    lessonName: {
      type: String,
      trim: true,
    },
    videoId: [
      {
        type: schema.Types.ObjectId,
        ref: "courseVideo",
      },
    ],
    quiz: [
      {
        type: schema.Types.ObjectId,
        ref: "courses-quiz",
      },
    ],
  },
  { collection: "course-lesson", timestamps: true }
);

module.exports = mongoose.model("course-lesson", courseLesson);

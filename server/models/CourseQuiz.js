const mongoose = require("mongoose");

const courseQuizSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    lessonId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course-lesson",
      required: true,
    },
    quiz: [
      {
        _id: false,
        question: {
          type: String,
        },
        options: {
          type: Array,
          validate: [optionValidation, "{PATH} should at least have 2 choices"],
          required: false,
        },
        solution: {
          type: String,
          required: true,
          validate: {
            // eslint-disable-next-line object-shorthand, func-names
            validator: function (value) {
              if (this.options.length >= 0) {
                return this.options.indexOf(value) >= 0;
              }
              return true;
            },
            message: `Solution should be one of the options`,
          },
        },
        tipsOrExplanation: {
          type: String,
        },
      },
    ],
  },
  { versionKey: false, timestamps: true }
);

function optionValidation(val) {
  if (val.length > 0) {
    return val.length >= 2;
  }
  return true;
}

module.exports = mongoose.model("courses-quiz", courseQuizSchema);

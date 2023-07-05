const mongoose = require("mongoose");
var schema = mongoose.Schema;
var workHistorySchema = new schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employee-contacts",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
    },
    description: {
      type: String,
    },
    screenshots: [
      {
        trackTime: Date,
        screenshot: String,
        screenshot_sm: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("workHistory", workHistorySchema);

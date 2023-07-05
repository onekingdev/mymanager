const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DisplaySchema = new Schema(
  {
    displayUrl: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("displayUrl", DisplaySchema);

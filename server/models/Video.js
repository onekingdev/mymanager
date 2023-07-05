const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)
module.exports = mongoose.model("Video", videoSchema);

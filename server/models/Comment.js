const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema(
  {
    userid: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "compose",
    },
    comment: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("comment", CommentSchema);

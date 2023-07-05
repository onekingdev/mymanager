const mongoose = require("mongoose");

const MemberPosition = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    position: {
      type: String,
      trim: true,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("member-position", MemberPosition);

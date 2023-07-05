const mongoose = require("mongoose");
const schema = mongoose.Schema;

const goalWorkspaceSchema = new schema(
  {
    title: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("goal-workspace", goalWorkspaceSchema);
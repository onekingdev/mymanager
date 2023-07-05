const mongoose = require("mongoose");

const employeeCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#555555",
    },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-categories", employeeCategorySchema);

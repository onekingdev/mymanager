const mongoose = require("mongoose");

const employeePositionSchema = new mongoose.Schema(
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
    color: {
      type: String,
      default: "#888",
      required: false,
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "employee-categories", required: false },
    isDelete: { type: Boolean, default: false },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-positions", employeePositionSchema);

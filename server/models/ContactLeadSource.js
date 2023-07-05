const mongoose = require("mongoose");

const COLORS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light-primary",
  "light-secondary",
  "light-success",
  "light-danger",
  "light-warning",
  "light-info",
];

function colorValidator(v) {
  if (v.indexOf("#") === 0) {
    if (v.length === 7) {
      // #f0f0f0
      return true;
    }
    if (v.length === 4) {
      // #fff
      return true;
    }
  }
  return COLORS.indexOf(v) > -1;
}

const contactLeadSourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
    },
    color: {
      type: String,
      validate: [colorValidator, "not a valid color"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("lead-source", contactLeadSourceSchema);
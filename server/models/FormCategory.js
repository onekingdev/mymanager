const mongoose = require("mongoose");
const formCategorySchema = new mongoose.Schema(
  {
    name: { type: String, require: true },
    type: { type: String, require: true },
    labelColor: {
      type: String,
      default: "#174AE7",
    }
  },

  { timestamps: true }
);

module.exports = mongoose.model("formCategory", formCategorySchema);

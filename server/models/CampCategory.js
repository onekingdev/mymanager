const mongoose = require("mongoose");
const campSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("/campCategory", campSchema);

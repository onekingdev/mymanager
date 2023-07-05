const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const CmpCategorySchema = new Schema(
  {
    name: {
      type: String,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("campCategory", CmpCategorySchema);

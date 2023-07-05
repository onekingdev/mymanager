const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const LableSchema = new Schema(
  {
    time: {
      type: String,
    },
    date: {
      type: String,
    },
    add_label: {
      type: String,
    },
    workspace: {
      type: mongoose.Schema.Types.ObjectId, ref: "workspace"
    },
    timezone: {
      type: String,
    },
    approvel: {
      type: String,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("uprooflabel", LableSchema);

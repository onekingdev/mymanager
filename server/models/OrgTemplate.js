const mongoose = require("mongoose");

const orgTemplateSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    imageUrl:{
        type:String
    },
    description:{
        type:String
    },
    permissions: [{ type: Object, required: true }],
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("org-template", orgTemplateSchema);

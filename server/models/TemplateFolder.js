const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const templateFolder = new Schema({
  folderName: {
    type: String,
    unique: true,
    required: true,
  },
  subFolder: [
    {
      type: Schema.Types.ObjectId,
      ref: "templateSubFolder",
    },
  ],
  template: [
    {
      type: Schema.Types.ObjectId,
      ref: "templateUpload",
    },
  ],
  userId: {
    type: Schema.Types.ObjectId,
    ref: "auth",
  },
});

module.exports = mongoose.model("templateFolder", templateFolder);

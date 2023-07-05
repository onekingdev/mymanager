const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const templateSubFolder = new Schema({
  subFolderName: {
    type: String,
    required: true,
    unique: true,
  },
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

module.exports = mongoose.model("templateSubFolder", templateSubFolder);

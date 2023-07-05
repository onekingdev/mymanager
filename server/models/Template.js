const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const templateUpload = new Schema({
  text: {
    type: String,
  },
  templateName: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "auth",
  },
});

module.exports = mongoose.model("templateUpload", templateUpload);

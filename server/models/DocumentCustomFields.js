const mongoose = require("mongoose");


const documentCustomFieldsSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      index: true,
    },
    settingsName: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    fields: {
      type: Object,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    creatorType: {
      type: String,
      default:'user'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("document-customfields", documentCustomFieldsSchema);

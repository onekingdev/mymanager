const mongoose = require("mongoose");

const ContactField = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auths",
    required: true,
  },
  organizationId: {
    type: mongoose.Types.ObjectId,
    default: null,
  },
  contactTypeId: { type: mongoose.Schema.Types.ObjectId, ref: "contact-types" },
  columns: [
    {
      type: { type: String },
      title: { type: String },
      order: { type: Number },
      isShown: { type: Boolean, default: true },
    },
  ],
});

module.exports = mongoose.model("contact-field", ContactField);

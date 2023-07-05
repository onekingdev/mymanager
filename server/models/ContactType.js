const mongoose = require("mongoose");

const ContactTypeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
      default:null
    },
    orgLocation: {
      type: mongoose.Types.ObjectId,
      ref: "organization-locations",
      default:null
    },
    creatorType: {
      type: String,
      default: "user",
    },
    name: {
      type: String,
      required: true,
    },
    icon: {
      type: String,
      default: "",
      // required: true,
    },
    order: {
      type: Number,
    },
    type: {
      type: String,
      required: true, //client,employee,lead,relationship,vendor,member
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("contact-type", ContactTypeSchema);

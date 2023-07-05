const mongoose = require("mongoose");

const Roles = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    creatorType: {
      type: String,
      default: "user",
    },
    roleName: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        read: {
          type: Boolean,
          required: true,
        },
        write: {
          type: Boolean,
          required: true,
        },
        update: {
          type: Boolean,
          required: true,
        },
        delete: {
          type: Boolean,
          required: true,
        },
        elementTitle: {
          type: String,
          required: true,
        },
        elementParent: {
          type: String,
          default: null,
        },
        defaultId: {
          type: String,
          default: null,
        },
        navLink: {
          type: String,
          required: true,
        },
      },
      { versionKey: false, timestamps: true },
    ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("roles", Roles);

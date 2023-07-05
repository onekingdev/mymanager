const mongoose = require("mongoose");

const Permission = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    permissionName: {
      type: String,
      trim: true,
    },
  },
  {
    collection: "application-permission",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("application-permission", Permission);

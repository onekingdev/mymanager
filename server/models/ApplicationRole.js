const mongoose = require("mongoose");

const Roles = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    roleName: {
      type: String,
      trim: true,
    },
    permissions: [
      {
        type: new mongoose.Schema(
          {
            id: {
              type: mongoose.Schema.Types.ObjectId,
              ref: "permission",
            },
          },
          { _id: false, versionKey: false, timestamps: false }
        ),
      },
    ],
  },
  {
    collection: "application-role",
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("application-role", Roles);

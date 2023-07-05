const mongoose = require("mongoose");

const { Schema } = mongoose;

const Organization = new Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(.\w{2,3})+$/, "Please provide valid email"],
    },
    contact: {
      type: String,
    },
    address: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
      unique: true,
    },
    path: {
      type: String,
      required: true,
      unique: true,
    },
    themeColor: {
      type: String,
    },
    logoLink: {
      type: String,
    },
    isVerified: {
      type: Boolean,
      isVerified: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
    updatedBy: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
  },
  {
    timestamps: true,
  }
);

Organization.pre("find", function cb() {
  this.where({ isDeleted: false });
});
Organization.pre("findOne", function cb() {
  this.where({ isDeleted: false });
});

Organization.pre("findOneAndDelete", function cb() {
  this.where({ isDeleted: false });
});

Organization.pre("findOneAndUpdate", function cb() {
  this.where({ isDeleted: false });
});

Organization.pre("findByIdAndUpdate", function cb() {
  this.where({ isDeleted: false });
});

module.exports = mongoose.model("organization", Organization);

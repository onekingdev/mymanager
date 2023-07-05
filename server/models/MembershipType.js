const mongoose = require("mongoose");

const MembershipType = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    color:{
      type: String,
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    isDeleted:{
      type:Boolean,
      default:false
    },
    creatorType:{
      type:String,
      default:'user'
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("membershiptype", MembershipType);

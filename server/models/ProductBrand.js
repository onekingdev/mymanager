const mongoose = require("mongoose");

const productBrandSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
    name: {
      type: String,
      default: 0,
    },
    img: {
      type: String,
      default: "",
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "shops",
    },
    isDeleted:{
        type:Boolean,
        default:false
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
module.exports = mongoose.model("product-brands", productBrandSchema);

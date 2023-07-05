const mongoose = require("mongoose");

const productCategorySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
    name: {
      type: String,
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "shops",
    },
    isDeleted: {
      type: Boolean,
      default: false,
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
module.exports = mongoose.model("product-categories", productCategorySchema);

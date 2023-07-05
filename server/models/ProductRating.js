const mongoose = require("mongoose");

const productRatingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    rate: {
      type: Number,
      default: 0,
    },
    userType:{
        type:String //user, guest
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("product-ratings", productRatingSchema);

const mongoose = require("mongoose");

const productFavoriteSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required:true
    },
    products: [{
      type: mongoose.Types.ObjectId,
        ref: "products",
    }],
    memberships:[{
      type: mongoose.Types.ObjectId,
      ref: "memberships",
    }],
    userType:{
        type:String //user, guest
    }
  },
  { timestamps: true }
);
module.exports = mongoose.model("product-favorite", productFavoriteSchema);

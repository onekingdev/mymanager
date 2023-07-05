const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    items: [
      {
        itemId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
        count: { type: Number, default: 1 },
        itemType: { type: String }, //product
        //ref:"products"
      },
    ],
    userId: {
      type: String,
      required: true,
    },
    userType: {
      type: String, //guest,user
      required: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("cart", cartSchema);

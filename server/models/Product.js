const mongoose = require("mongoose");

const { Schema } = mongoose;
const productSchema = new Schema(
  {
    brandId: {
      type: mongoose.Types.ObjectId,
      ref: "product-brands",
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "product-categories",
    },
    name: {
      type: String,
      // unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    imgUrl: {
      type: String,
      required: true,
    },
    path: { type: String, required: true },
    price: {
      type: Number,
      required: true,
    },
    permission: {
      type: String,
      required: true,
    },
    isSignatured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inStock: {
      type: Number,
      default: 1,
    },
    emi: {
      type: Boolean,
      default: false,
    },
    features: [
      {
        icon: { type: String },
        title: { type: String },
        description: { type: String },
      },
    ],
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

module.exports = mongoose.model("product", productSchema);

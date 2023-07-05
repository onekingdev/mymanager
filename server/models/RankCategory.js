const mongoose = require("mongoose");

const { Schema } = mongoose;
const rankCategory = new Schema(
  {
    rankName: {
      type: String,
      unique: true,
      required: true,
    },
    rankOrder: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "category",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    Color: {
      type: String,
    },
    rankImage: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("rankCategory", rankCategory);

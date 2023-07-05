const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cloudUrl: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["general", "contract","task","income","expense"],
      required: true,
    },
    userId: {
      type: String,
      
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("document", documentSchema);

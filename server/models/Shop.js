const mongoose = require("mongoose");

const shopSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    bannerUrl: {
      type: String,
    },
    logoUrl: {
      type: String,
    },
    shopPath: {
      type: String,
    },
    faq: [{ category: { type: String }, question: { type: String }, answer: { type: String } }],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    info:[{
      title:{
        type:String
      },
      description:{
        type:String
      },
      icon:{
        type:String
      }
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("shops", shopSchema);

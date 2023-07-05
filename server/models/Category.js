const mongoose = require("mongoose");
const schema = mongoose.Schema;

const category = new schema(
  {
    categoryName: {
      type: String,
      require: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
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
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("category", category);

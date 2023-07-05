const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const FinanceCategorySchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    labelColor: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true
    },
    itemType:{ type:String},
    organizationId:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { collection: "finance-category" }
);

module.exports = mongoose.model("finance-category", FinanceCategorySchema);

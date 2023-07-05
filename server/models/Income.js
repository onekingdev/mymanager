const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const IncomeSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
      ref:"auths"
    },
    clientId: {
      type: ObjectId,
      required: true,
      ref: "contacts",
    },
    name: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
    date:{
      type:Date,
      default:new Date()
    },
    categoryId: {
      type: ObjectId,
      ref: "finance-category",
    },
    note: {
      type: String,
      // required: true,
    },
    invoiceId: {
      type: mongoose.Types.ObjectId,
      ref:"invoices",
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
    documentId:{
      type:mongoose.Types.ObjectId,
      ref:"documents"
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("income", IncomeSchema);

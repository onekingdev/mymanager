const mongoose = require("mongoose");

const schema = mongoose.Schema;
const membershipSchema = schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    shopId: {
      type: mongoose.Types.ObjectId,
      ref: "shops",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
    },
    path:{
      type:String
    },
    type: {
      type: mongoose.Types.ObjectId,
      ref:'membershiptypes',
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    durationType: {
      type: String,
      required: true,
    },
    isRecurring: {
      type: Boolean,
      default:true
    },
    total: {
      type: Number,
      required: true,
    },
    downPayment: {
      type: Number,
      required: true,
    },
    balance: {
      type: Number,
      required: true,
    },
    noOfPayments:{
      type:Number
    },
    frequency: {
      type: String,
    },
    amount: {
      type: Number,
    },
    description: {
      type: String,
      required: true,
    },
    permission: {
      type: String,
      required: true,
    },
    startDate:{
      type:Date
    },
    endDate:{
      type:Date
    },
    regFee:{
      type:Number
    },
    paymentType:{
      type:String
    },
    defaultContract:{
      type:mongoose.Types.ObjectId
    },
    creatorType:{
      type:String,
      default:'user'
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    isSignatured: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("membership", membershipSchema);

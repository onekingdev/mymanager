const mongoose = require("mongoose");
const { Invoice } = require("./index");
const schema = mongoose.Schema;

const Membershipschema = new schema(
  {
    amount:{
      type:Number,
    },
    balance:{
      type:Number,
    },
    downPayment:{
      type:Number
    },
    duration:{
      type:Number
    },
    durationType:{
      type:String
    },
    frequency:{
      type:String
    },
    isRecurring:{
      type:Boolean
    },
    name:{
      type:String
    },
    noOfPayments:{
      type:Number
    },
    membershipType:{
      type:mongoose.Types.ObjectId,
      ref:"memberships"
    },
    shopId:{
      type:mongoose.Types.ObjectId,
      ref:"shops"
    },
    total:{
      type:Number
    },
    userId:{
      type:mongoose.Types.ObjectId,
      ref:'auths'
    },
    startDate:{
      type:Date
    },
    endDate:{
      type:Date
    },
    regFee:{
      type:Number,
      default:0
    },
    startPaymentDate:{ // the day of the month that should start payment
      type:Number
    },
    payInOut:{
      type:String
    },
    buyerId:{
      type:mongoose.Types.ObjectId,
      ref:"contacts"
    },
    dueStatus: {
      type: String,
      default: "due",
      enum: ["paid", "due", "over_due"],
    },
    // isFreeze: {
    //   type: Boolean,
    //   default: false,
    // },
    // whenFreeze: {
    //   type: Array,
    // },
    // isForfeit: {
    //   type: Boolean,
    //   default: false,
    // },
    // whenForFeit: {
    //   type: Array,
    // },
    // isTerminate: {
    //   type: Boolean,
    //   default: false,
    // },
    // whenTerminate: {
    //   type: Array,
    // },
    // refund: {
    //   type: Array,
    // },
    // isRefund: {
    //   type: Boolean,
    //   default: false,
    // },
    // schedulePayments: {
    //   type: Array,
    //   requred: true,
    // },
    status: {
      type: String,
      required: true, //active,inactive,cancel,freeze
    },
    membershipId:{
      type:mongoose.Types.ObjectId,
      ref:"memberships"
    },
    stripe:{ //price,productId,customerId,subscriptionId
      price:String,
      productId:String,
      customerId:String,
      connectedAccount:String,
      subscriptionId:String
    },
    invoiceId:{
      type:mongoose.Types.ObjectId,
      ref:"invoices"
    },
    dueDate:{
      type:Number
    },
    members:[{
      type:mongoose.Types.ObjectId,
      ref:"contacts"
    }],
    contract:{
      type:mongoose.Types.ObjectId,
      ref:"document-recipients"
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


module.exports = mongoose.model("Buy_Membership", Membershipschema);

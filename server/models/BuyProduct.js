const mongoose = require("mongoose");
const schema = mongoose.Schema;

const BuyProductSchema = new schema(
  {
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'shops'
    },
    products:[{
      product:{ type: mongoose.Schema.Types.ObjectId, ref: "products" },
      count:{ type: Number, default: 1 },
      itemType: { type: String },
    }],
    buyer:{
      type:mongoose.Schema.Types.ObjectId, 
      ref: "contacts"
    },
    status:{
      type:String //order placed, paid, processing, on the way, delivered
    },
    // isEMI: {
    //   type: Boolean,
    //   required: true,
    //   default:false
    // },
    // refund: [{
    //   type:Object
    // }],
    // isRefund: {
    //   type: Boolean,
    //   default: false,
    // },
    total: {
      type: Number,
      required: true,
    },
    // payment: {
    //   paymentIntentId:String,
    //   amount:Number,
    //   status:String,
    //   currency:String,
    //   paymentMethod:String,
    //   date:Date,
    //   chequeNo:String
    // },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations"
    },
    // creatorType: {
    //   type: String,
    //   default:'user'
    // },
    orgLocation:{
      type:mongoose.Types.ObjectId,
      ref:"organization-locations"
    },
    invoiceId:{
      type:mongoose.Types.ObjectId,
      ref:"invoices"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Buy_Product", BuyProductSchema);

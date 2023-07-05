const mongoose = require("mongoose");

const paymentsSchema = new mongoose.Schema({
  paymentIntentId: { type: String },
  amount: { type: Number },
  status: { type: String },
  currency: { type: String },
  paymentMethod: { type: String },
  checkNo: { type: String },
  section:{type:String}, //product,membership,course, event, organization,invoice
  organizationId: {
    type: mongoose.Types.ObjectId,
    ref:"organizations",
    default:null
  },
  orgLocation:{
    type:mongoose.Types.ObjectId,
    ref:"organization-locations",
    default:null
  },
  userId: {
    type: mongoose.Types.ObjectId,
    ref:"auths",
    default:null
  },
},
{ timestamps: true }
);

module.exports = mongoose.model("payment", paymentsSchema);

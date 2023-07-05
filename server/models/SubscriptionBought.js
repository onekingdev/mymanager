const mongoose = require("mongoose");

const planBoughtSchema = new mongoose.Schema(
  {
    userId: { // person that paid
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      require: false,
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organization",
      required: false,
    },
    //paymentIntentId,amount,status,currency,paymentMethod
    paymentInfo: [{ 
      paymentIntentId:String,
      amount:Number,
      status:String,
      currency:String,
      paymentMethod:String,
      date:Date,
      chequeNo:String
    }],
    planId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "subscription-plan",
      require: true,
    },
    startDate:{
        type:Date
    },
    expireDate:{
        type:Date
    },
    stripeSubscription:{
      customerId:String,
      subscriptionId:String,
    },
    status:{
        type:String,
        enum:['active','waiting','suspended','upgraded']
    }
  },
  {
    collection: "subscriptions-bought",
    versionKey: false,
    timestamps: true,
  }
);
module.exports = mongoose.model("subscriptions-bought", planBoughtSchema);

const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema(
  {
    itemId: {
      type: mongoose.Types.ObjectId,
      
    },
    name:{
      type:String
    },
    description: {
      type: String,
    },
    rate: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      default: 1,
    },
  },
  { _id: false }
);

const bankSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    iban: {
      type: String,
    },
    swift: {
      type: String,
    },
    routing: {
      type: String,
    },
    accountNo: {
      type: String,
    },
  },
  { _id: false }
);

const invoiceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "contacts",
      required: true,
    },
    itemType: {
      type:mongoose.Types.ObjectId,
      ref:'finance-category',
      required: true,
    },
    no: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
    },
    alternatePhone: {
      type: String,
    },
    companyAddress: {
      zipCode: String,
      state: String,
      city: String,
      country: String,
      street: String,
    },
    internalPaymentNote: {
      type: String,
    },
    companyName: {
      type: String,
    },
    date: {
      type: Date,
      required: true,
    },
    dueDate: {
      type: Date,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value > this.date;
        },
        message: `Due date should be greater than invoice date`,
      },
    },
    items: {
      type: Array,
      value: [itemsSchema],
    },
    totalAmount: {
      type: Number,
    },
    discount: {
      type: Number,

      min: 0,
      default: 0,
    },
    tax: {
      type: Number,
      default: 0,
      min: 0,
    },
    paidAmount: {
      type: Number,
      default: 0,
    },
    logoUrl: {
      type: String,
    },
    status: {
      type: String,
      enum: ["PAID", "SENT", "DRAFT", "DUE", "PARTIAL PAYMENT"],
      default: "DRAFT",
    },
    currency: {
      type: String,
      enum: ["USD"],
      default: "USD",
    },
    bank: {
      type: Object,
      value: bankSchema,
    },
    salesperson: {
      type: String,
    },
    note: {
      type: String,
    },
    isDelete: { type: Boolean, default: false },
    tags: {
      type: Array,
    },
    payments: [
      {
        paymentIntentId: String,
        amount: Number,
        status: String,
        currency: String,
        paymentMethod: String,
        date: Date,
        chequeNo: String,
      },
    ],
    payNow: {
      type: Number,
      default: 0,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    acceptedPaymentMethods:{
      type:Array
    },
    creatorType:{
      type:String,
      default:'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("invoice", invoiceSchema);

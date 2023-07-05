const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const BillingHistorySchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    callType: {
      type: String,
      required: true,
      default: "",
    },
    toNumber: {
      type: String,
      required: true,
    },
    fromNumber: {
      type: String,
    },
    callPeriod: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      required: true,
    },
    spentCredits: {
      type: Number,
      required: true,
    },
    remainingSMSCredits: {
      type: Number,
      required: true,
    },
    remainingVoiceMins: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("billing-history", BillingHistorySchema);

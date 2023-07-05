const mongoose = require("mongoose");

const { Schema } = mongoose;
const eventSchema = new Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ["Public", "Private"],
      default: "Public",
      required: true,
      index: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    note: {
      type: String,
      default: "",
    },
    eventCategory: {
      type: String,
      enum: ["general", "birthday", "promotion"],
    },
    progression: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "progression",
    },
    progressionCategory: {
      type: Array,
    },
    eventBanner: {
      type: String,
    },
    tickeNotes: {
      type: String,
    },
    hostName: {
      type: String,
    },
    hostEmail: {
      type: String,
    },
    hostMobileNumber: {
      type: String,
    },
    hostAlternateNumber: {
      type: String,
    },
    venueName: {
      type: String,
    },
    eventDetail: {
      type: String,
    },
    eventAddress: {
      type: String,
    },
    ticketName: {
      type: String,
    },
    ticketAvailableQuantity: {
      type: Number,
      min: 0,
    },
    ticketPrice: {
      type: Number,
    },
    productId: {
      type: mongoose.Types.ObjectId,
      ref: "products",
    },
    checkoutType: {
      type: String,
      enum: ["product", "ticket", "none"],
      default: "ticket",
    },
    checkoutButtonType: {
      type: String,
      enum: ["buynow", "gettickets", "rsvp"],
      default: "gettickets",
    },
    guests: [
      {
        contact: {
          type: mongoose.Types.ObjectId,
          ref: "contacts",
        },
        rankId: {
          type: mongoose.Types.ObjectId,
          ref: "contactranks",
        },
        status: {
          type: String,
          default: "noreply",
        },
        paid: {
          type: String,
          enum: ["paid", "notpaid", "refund"],
          default: "notpaid",
        },
        invoiceId: {
          type: mongoose.Types.ObjectId,
          ref: "invoices",
        },
      },
    ],

    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations",
      default: null,
    },

    creatorType: {
      type: String,
      default: "user",
    },
    extendedProps: {
      calendar: {
        type: String,
        default: "Events",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Event", eventSchema);

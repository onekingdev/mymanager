const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookingSchema = new schema(
  {
    email: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    duration: {
      type: Number,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    bookingType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bookingType",
    },
    name: {
      type: String,
    },
    timezone: {
      type: String,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    extendedProps: {
      calendar: {
        type: String,
        default: "Bookings",
      },
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("booking", bookingSchema);

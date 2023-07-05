const mongoose = require("mongoose");

const schema = mongoose.Schema;
const bookedStudentSchema = schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
    },
    organizationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "organizations",
    },
    orgLocation: {
      type: mongoose.Types.ObjectId,
      ref: "organization-locations",
    },
    image: {
      type: String,
    },
    rankImg: {
      type: String,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    rankName: {
      type: String,
    },
    progression: {
      type: Number,
    },
    className: {
      type: String,
      required: true,
    },
    bookingType: {
      type: String,
    },
    bookingDate: {
      type: String,
    },
    status: {
      type: Boolean,
      default: true,
    },
    rescheduleAttempt: {
      type: String,
      default: 0,
    },
    contactId: {
      type: String,
    },
    seriesId: {
      type: String,
    },
    days: {
      type: Array,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("booked-students", bookedStudentSchema);

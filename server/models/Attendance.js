const mongoose = require("mongoose");

const schema = mongoose.Schema;
const attendenceSchema = schema(
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
    status: {
      type: Boolean,
      default: true,
    },
    classId: {
      type: mongoose.Types.ObjectId,
      ref: "classes",
    },
    attendedDateTime: {
      type: Date,
    },
    rescheduleAttempt: {
      type: String,
      default: 0,
    },
    contactId: {
      type: mongoose.Types.ObjectId,
      ref: "contacts",
    },
    seriesId: {
      type: mongoose.Types.ObjectId,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("attendence", attendenceSchema);

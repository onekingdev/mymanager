const mongoose = require("mongoose");
const schema = mongoose.Schema;

const appointmentSchema = new schema(
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
    title: {
      type: String,
      required: true,
    },
    start: {
      type: Date,
      required: true,
    },
    end: {
      type: Date,
      required: true,
    },
    allDay: {
      type: Boolean,
      required: true,
    },
    interval: {
      type: String,
      default: "30",
    },
    repeat: {
      type: String,
      required: true,
    },
    invitedUser: {
      type: mongoose.Types.ObjectId,
      ref: "employee-contact",
    },
    remindTo: {
      type: String,
    },
    notification: {
      type: String,
      default: "30",
    },
    extendedProps: {
      calendar: {
        type: String,
        default: "Appointments",
      },
    },
    url: {
      type: String,
      default: "",
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("appointment", appointmentSchema);

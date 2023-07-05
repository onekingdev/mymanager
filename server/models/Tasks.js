const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    taskName: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    points: {
      type: Number,
      default: 0,
    },
    repeatType: {
      type: String,
      default: "",
      // insert values type of repeat [daily, weekly, monthly, yearly]
    },
    repeat: {
      type: Array,
      default: [],
      // insert days name of week [friday,sunday,wendesday,sunday] etc
    },
    emailNotification: {
      type: Boolean,
      default: false,
    },
    email: {
      type: String,
      default: "",
    },
    assignee: {
      value: {
        type: mongoose.Types.ObjectId,
        ref: "contact",
      },
      label: { type: String, default: "" },
      img: String,
    },
    allowAsNa: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      default: null,
    },
    creatorType: {
      type: String,
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", taskSchema);

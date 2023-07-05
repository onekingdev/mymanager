const mongoose = require("mongoose");
const { Schema } = mongoose;
const classSchema = new Schema(
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
    classTitle: {
      type: String,
      required: true,
    },
    programName: [
      {
        value: {
          type: String,
          default: "",
        },
        label: {
          type: String,
          default: "",
        },
        color: {
          type: String,
          default: "",
        },
      },
    ],
    startDate: {
      type: String,
      required: true,
      index: true,
    },
    endDate: {
      type: String,
      required: true,
    },
    classStartTime: {
      type: String,
      required: true,
    },
    classEndTime: {
      type: String,
      required: true,
    },
    classDays: {
      type: Array,
    },
    schedule: [
      {
        classStartTime: {
          type: String,
          required: true,
        },
        classEndTime: {
          type: String,
          required: true,
        },
        classDays: {
          type: Array,
        },
        range: {
          type: Number,
        },
        index: {
          type: Number,
        },
      },
    ],
    allDay: {
      type: Boolean,
      default: false,
    },
    wholeSeriesEndDate: {
      type: Date,
      required: true,
    },
    wholeSeriesStartDate: {
      type: Date,
      required: true,
    },
    seriesId: {
      type: String,
      index: true,
    },
    bookingRequired: {
      type: Boolean,
      default: false,
    },
    extendedProps: {
      calendar: {
        type: String,
        default: "Classes",
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Class", classSchema);

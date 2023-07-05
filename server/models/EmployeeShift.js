const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const EmployeeShiftSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    start: {
      type: String,
      required: true,
    },
    end: {
      type: String,
    },
    weekDay: {
      type: Number,
      default: 0,
    },
    isOpen: {
      type: Boolean,
      default: true,
    },
    note: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-shift", EmployeeShiftSchema);

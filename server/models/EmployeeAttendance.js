const mongoose = require("mongoose");

const EmployeeAttendanceSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    contactId: {
      type: mongoose.Types.ObjectId,
      ref: "contacts",
    },
    shiftId: {
      type: mongoose.Types.ObjectId,
      ref: "employee-shifts",
    },
    actualStart: {
      type: Date,
    },
    actualEnd: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-attendances", EmployeeAttendanceSchema);

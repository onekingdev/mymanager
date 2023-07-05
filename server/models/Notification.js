const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const NotificationSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      //   required: true,
      ref: "auth",
    },
    category: {
      type: String,
      enum: ["Task", "Ticket", "Document", "Project", "LivechatContact", "Goal","TextContact","EmployeeTask","FormBuilder"],
      required: true,
    },
    categoryId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
    },
    message: {
      type: String,
    },
    isRead: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("notification", NotificationSchema);

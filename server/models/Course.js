const mongoose = require("mongoose");

const Courses = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    shopId: {
      type: mongoose.Schema.Types.ObjectId,
    },
    courseCategory: {
      type: String,
      trim: true,
    },
    courseName: {
      type: String,
      trim: true,
      required: true,
    },
    permission: {
      type: String,
      required: true,
    },
    courseAccess: [
      {
        progression: String,
        category: String,
        categoryId:String,
        rankFrom:String,
        rankTo:String,
      }
    ],
    coursePrice: {
      type: Number,
    },
    startDate: {
      type: Date,
    },
    endDate: {
      type: Date,
    },
    description: {
      type: String,
      trim: true,
    },
    courseType: {
      type: String,
      default: "NA",
    },
    courseImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("courses", Courses);

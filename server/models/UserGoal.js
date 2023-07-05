const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const GoalSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      //   required: true,
      ref: "auth",
    },
    parentGoalId: {
      type: Schema.Types.ObjectId,
      ref: "userGoal",
      default: null,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    startDate: {
      type: String,
    },
    progressType: {
      type: String,
    },
    vision: {
      type: String,
    },
    purpose: {
      type: String,
    },
    obstacle: {
      type: String,
    },
    resource: {
      type: String,
    },
    measureFrom: {
      type: String,
    },
    measureTo: {
      type: String,
    },
    measureLabel: {
      type: String,
    },
    currentProgress: {
      type: String,
    },
    pictureUrl: {
      type: String,
    },
    file: {
      type: String,
    },
    type: {
      type: String,
      enum: ["habit", "target"],
      default: "",
    },
    status: {
      type: String,
    },
    frequency: {
      type: String,
    },
    daysFrequency: {
      type: String,
    },
    repetition: {
      type: String,
    },
    workSpace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
    },
    actionPlans: [
      {
        type: Schema.Types.ObjectId,
        ref: "actinPlans",
      },
    ],
    endDate: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userGoal", GoalSchema);

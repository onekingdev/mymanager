const mongoose = require("mongoose");
const { Schema } = mongoose;

const activitySchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "workspace",
      required: true,
    },
    boardId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "board",
      required: true,
    },
    kanbanId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "kanban",
    },
    column: {
      type: String,
    },
    activity: {
      type: String,
      enum: [
        "Task Created",
        "Task Updated",
        "Task Status",
        "Task Removed",
        "Status Created",
        "Status Updated",
        "Status Removed",
      ],
    },
    prev: {
      type: String,
    },
    current: {
      type: String,
    },
    prevColor: {
      type: String,
    },
    currentColor: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("kanban-activity", activitySchema);

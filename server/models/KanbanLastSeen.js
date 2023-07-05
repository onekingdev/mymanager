const mongoose = require("mongoose");

const KanbanLastSeenSchema = new mongoose.Schema(
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
    time: {
      type: Date,
      required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("kanban-last-seen", KanbanLastSeenSchema);

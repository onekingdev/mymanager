const mongoose = require("mongoose");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const freezeTaskSchema = new Schema({
  taskId: {
    type: ObjectId,
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
  status: {
    type: Number, // if 0 => employee request, if 1 => employer accept
    required: true,
  },
  isDelete: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("freeze-task", freezeTaskSchema);

const mongoose = require("mongoose");
const { propertiesSchema } = require("./EmployeeTaskRecipient");
const { Schema, Types } = mongoose;
const { ObjectId } = Types;

const TaskSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
    },
    type: {
      type: String,
      enum: ["form", "task"],
    },
    documentUrl: {
      type: String,
    },
    documentId:{
      type:Object
    },
    empRoleId: {
      type: String,
      ref: "role",
      required: true,
    },
    properties: {
      type:Array
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

module.exports = mongoose.model("employee-task", TaskSchema);

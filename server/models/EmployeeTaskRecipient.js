/* eslint-disable no-useless-escape */
const mongoose = require("mongoose");

const schema = mongoose.Schema;

const propertiesSchema = schema(
  {
    id: {
      type: Number,
    },
    color: {
      type: String,
    },
    _type: {
      type: String,
    },
    type: {
      type: String,
    },
    dataLabel: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
    recipient: {
      type: Object,
    },
    page: {
      type: Number,
    },
    x: {
      type: Number,
    },
    y: {
      type: Number,
    },
    active: {
      type: Boolean,
    },
    isDone: {
      type: Boolean,
      default: false,
    },
    signValue: {
      type: Object,
      value: { name: { type: String }, path: { type: String } },
    },
  },
  { _id: false }
);

const historySchema = new mongoose.Schema(
    {
        by:{
            type:String,
            require:true
        },
        note:{
            type:String,
            require:true
        },
        status:{
            type:String, // pending,approved, denied, remind 
            require:true
        }
    },
    {
        timestamps: true ,
        _id:false
    }
);

/* Status
waiting,viewed, completed,attachment
*/
const employeeTasksRecipientSchema = new mongoose.Schema(
  {
    taskId:{
        type:Object,
        required:true
    },
    employeeId: {
      type: Object,
      required:true,
    },
    properties: {
      type: Array,
      
    },
    status:{
        type:String,
        required:true
    },
    history:{
        type:[historySchema],
    }
  },
  { timestamps: true,
    versionKey: false }
);

module.exports = mongoose.model("employee-tasks-recipient", employeeTasksRecipientSchema);

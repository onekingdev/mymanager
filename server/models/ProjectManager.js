const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let dynamicProperties = new Schema({
  columnName: {
    type: String,
  },
  columnType: {
    type: String,
  },
  value: {
    type: Schema.Types.Mixed,
  },
});

const rowData = new Schema({
  task: {
    type: String,
  },

  manager: {
    userID: { type: String },
    value: { type: String },
  },

  status: {
    value: { type: String },
  },

  due: {
    type: Date,
  },

  assignee: {
    type: [
      {
        userID: { type: String },
        value: { type: String },
      },
    ],
    default: undefined,
  },
  dynamicProperties: { type: [dynamicProperties], default: undefined },
});

const TableSchema = new Schema({
  workspaceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectWorkspace",
    required: true,
  },
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auths",
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  rowData: [rowData],
  mapOrder: {
    type: [
      {
        id: { type: String },
        column: { type: String },
        columnType: { type: String },
        order: { type: Number },
      },
    ],
  },
  organizationId:{
    type:mongoose.Types.ObjectId,
    default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
});

const WorkspaceSchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auths",
    required: true,
  },
  accessIDs: [mongoose.Schema.Types.ObjectId],
  name: {
    type: String,
    required: true,
  },
  mapOrder: {
    type: [String],
    default: [],
  },
  tables: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ProjectTable",
    },
  ],
  organizationId:{
    type:mongoose.Types.ObjectId,
    default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
});

const ActivitySchema = new Schema({
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  workspaceID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Workspace",
    required: true,
  },
  tableID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "ProjectTable",
    required: true,
  },
  userName: {
    type: String,
  },
  task: {
    type: String,
  },
  tableTitle: {
    type: String,
  },
  column: {
    type: String,
  },

  activity: {
    type: String,
    enum: [
      "Group Created",
      "Table title updated",
      "Delete Table",
      "Row data updated",
      "Added new row",
      "Added new column",
      "Column Name updated",
      "Column order updated",
      "Row deleted",
      "Column deleted",
      "Date",
      "Manager",
      "Person",
      "Due",
      "Status",
    ],
  },
  added: {
    type: String,
  },
  deleted: {
    type: String,
  },
  previous: {
    type: Schema.Types.Mixed,
  },
  current: {
    type: Schema.Types.Mixed,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const lastSeenSchema = new mongoose.Schema({
  userID: { type: String, required: true },
  userName: { type: String, required: true },
  timestamp: { type: Date, required: true },
});

const Table = mongoose.model("ProjectTable", TableSchema);
const Workspace = mongoose.model("ProjectWorkspace", WorkspaceSchema);
const TrackActivity = mongoose.model("ProjectActivity", ActivitySchema);
const LastSeen = mongoose.model("ProjectLastSeen", lastSeenSchema);

module.exports = { Table, Workspace, TrackActivity, LastSeen };

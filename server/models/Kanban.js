const mongoose = require("mongoose");
const { Schema } = mongoose;

const attachmentSchema = Schema(
  {
    name: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

const commentSchema = Schema(
  {
    name: String,
    img: String,
    comment: String,
  },
  {
    timestamps: true,
  }
);

const assignedToSchema = Schema(
  {
    contactId: {
      type: Schema.Types.ObjectId,
      ref: "contact",
    },
    title: String,
    img: String,
  },
  {
    timestamps: true,
  }
);

const kanbanSchema = new Schema(
  {
    id: {
      type: Number,
    },
    title: {
      type: String,
      required: true,
    },
    labels: {
      type: [String],
    },
    boardId: {
      type: Schema.Types.ObjectId,
      ref: "boards",
    },
    description: String,
    dueDate: {
      type: Date,
    },
    attachments: [attachmentSchema],
    comments: [commentSchema],
    assignedTo: [assignedToSchema],
    coverImage: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
    isTemplate:{
      type:Boolean,
      default:false
    },
    clonedFrom:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
    userId:{
      type:mongoose.Types.ObjectId,
      ref:"auths"
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("kanban", kanbanSchema);

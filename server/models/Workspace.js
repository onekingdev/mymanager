const mongoose = require("mongoose");
const { Schema } = mongoose;

const WorkspaceSchema = Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auths",
    },
    title: String,
    background: {
      type: String,
      default: "",
    },
    boards: [
      {
        type: Schema.Types.ObjectId,
        ref: "boards",
      },
    ],
    collaborators: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "contacts",
        },
        typeId: {
          type: Schema.Types.ObjectId,
          ref: "contact-types",
        },
      },
    ],
    isDelete: {
      type: Boolean,
      default: false,
    },
    organizationId:{
    type:mongoose.Types.ObjectId,
    default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
  },
  
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Workspace", WorkspaceSchema);

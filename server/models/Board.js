const mongoose = require("mongoose");
const { Schema } = mongoose;

const COLORS = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "light-primary",
  "light-secondary",
  "light-success",
  "light-danger",
  "light-warning",
  "light-info",
];

function colorValidator(v) {
  if (v.indexOf("#") === 0) {
    if (v.length === 7) {
      // #f0f0f0
      return true;
    }
    if (v.length === 4) {
      // #fff
      return true;
    }
  }
  return COLORS.indexOf(v) > -1;
}

const boardSchema = Schema(
  {
    id: String,
    title: String,
    isDelete: {
      type: Boolean,
      default: false,
    },
    color: {
      type: String,
      validate: [colorValidator, "not a valid color"],
    },
    userId: {
      type: mongoose.Types.ObjectId,
      ref: "auths",
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

module.exports = mongoose.model("Board", boardSchema);

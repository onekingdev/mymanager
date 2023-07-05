const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const composeSchema = new Schema(
  {
    media_img: {
      type: Array,
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId, ref: "pworkspace"
    },
    // uploaded_img: {
    //     type: mongoose.Schema.Types.ObjectId, ref: "media"
    //   },
    url: {
      type: String,
    },
    desc: {
      type: String,
    },
    date: {
      type: String,
    },
    time: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      index: true,
    },
    post_status: {
      type: String,
      default: false
    },
    sync_status: {
      type: String,
      default: false
    },
    // label: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "label"
    // },
    platform: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("/compose", composeSchema);

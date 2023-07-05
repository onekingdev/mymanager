const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ranksHistory = new schema(
  {
    clientId: {
      type: schema.Types.ObjectId,
      ref: "contact",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    clientName: {
      type: String,
    },
    progressionId: {
      type: schema.Types.ObjectId,
      ref: "progression",
    },
    progressionName: {
      type: String,
      default: "",
    },
    categoryId: {
      type: schema.Types.ObjectId,
      ref: "category",
    },
    categoryName: {
      type: String,
      default: "",
    },
    currentRankName: {
      type: String,
      default: "",
    },
    currentRankOrder: {
      type: Number,
      default: 0,
    },
    currentRankImage: {
      type: String,
      default: "",
    },
    nextRankName: {
      type: String,
      default: "",
    },
    nextRankOrder: {
      type: Number,
      default: 0,
    },
    nextRankImage: {
      type: String,
      default: "",
    },
    date: {
      type: String,
      default: "",
    },
    time: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("ranksHistory", ranksHistory);

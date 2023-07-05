const mongoose = require("mongoose");
const schema = mongoose.Schema;

const clientRanks = new schema(
  {
    contactId: {
      type: schema.Types.ObjectId,
      ref: "contact",
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
    },
    contactName: {
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
      ref: "Category",
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
    lastPromoteRankName: {
      type: String,
      default: "",
    },
    lastPromoteRankOrder: {
      type: Number,
      default: 0,
    },
    lastPromoteRankImage: {
      type: String,
      default: "",
    },
    isprogression: {
      type: Boolean,
      default: true,
    },
    ispromoted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("clientRanks", clientRanks);

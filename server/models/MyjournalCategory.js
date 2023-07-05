const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const myJournalCatSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auths",
      required: true,
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    labelColor: {
      type: String,
      default: "#174AE7",
    },
    organizationId: {
      type: mongoose.Types.ObjectId,
      ref:"organizations",
      default: null,
    },
    creatorType: {
      type: String,
      default: "user",
    },
    isDeleted:{
      type:Boolean,
      default:false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("journalCategory", myJournalCatSchema);

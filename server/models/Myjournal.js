const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MyJournalSchema = new Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    journalCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "journalCategory",
    },
    title: {
      type: String,
    },
    desc: {
      type: String,
    },
    img: {
      type: String,
    },
    type:{
      type:String
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

module.exports = mongoose.model("myjournal", MyJournalSchema);

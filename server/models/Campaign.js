const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CampaignSchema = new Schema(
  {
    campaign_name: {
      type: String,
    },
    goal: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "creategoal",
    },
    password: {
      type: String,
    },
    status: {
      type: String,
      default: "Inactive",
    },
    position: {
      type: Number,
      default: 0,
    },
    userId: {
      type: String,
      index: true,
    },
  },
  { timestamps: true }
);


module.exports = mongoose.model("/campaign", CampaignSchema);

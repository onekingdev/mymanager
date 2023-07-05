const mongoose = require("mongoose");

const LivechatSettingSchema = mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "auth",
    required: true,
  },
  logo: {
    type: String,
    default: "",
    required: false,
  },
  maximized: {
    type: Boolean,
    default: true,
    required: false,
  },
  minimized: {
    type: Boolean,
    default: true,
    required: false,
  },
  theme: {
    type: Boolean,
    default: true,
    required: false,
  },
  themeColor: {
    type: String,
    required: false,
  },
  align: {
    type: String,
    required: false,
  },
  sideSpacing: {
    type: String,
    required: false,
  },
  bottomSpacing: {
    type: String,
    required: false,
  },
  switchValueEmail: {
    type: Boolean,
    required: false,
  },
  switchValueWeb: {
    type: Boolean,
    required: false,
  },
  switchValuePrivacy: {
    type: Boolean,
    required: false,
  },
});

module.exports = mongoose.model("LivechatSetting", LivechatSettingSchema);

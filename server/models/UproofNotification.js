const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UnotificationSchema = new Schema(
  {
    hide_noti_mobile: {
      type: Boolean,
      default: false,
    },
    show_on_top: {
      type: Boolean,
      default: false,
    },
    position_noti: {
      type: Boolean,
      default: false,
    },

    noti_theme: {
      type: Boolean,
      default: false,
    },
    delay_first_noti: {
      type: String,
    },
    display_each_noti: {
      type: String,
    },
    space_each_noti: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("uproofNotification", UnotificationSchema);

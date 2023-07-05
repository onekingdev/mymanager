const mongoose = require("mongoose");
const schema = mongoose.Schema;

const smartListItemSchema = new schema(
  {
    title: {
      type: String,
    },
    userId: {
      type: String,
      index: true,
    },
    listId: {
      type: String,
    },
    contactType: {
      type: Array,
      default: [],
    },
    status: {
      type: Array,
      default: [],
    },
    leadSource: {
      type: Array,
      default: [],
    },
    tag: {
      type: Array,
      default: [],
    },
    progression: {
      type: Array,
      default: [],
    },
    other: {
      type: String,
    },
    category: {
      type: Array,
      default: [],
    },
    otherShop: {
      type: Array,
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("smartListItem", smartListItemSchema);

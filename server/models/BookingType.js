const mongoose = require("mongoose");
const schema = mongoose.Schema;

const bookingTypeSchema = new schema(
  {
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    duration: {
      type: Number,
    },
    status: {
      type: Boolean,
      default: true,
    },
    link: {
      type: String,
      unique: true,
      required: true,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      ref:'organizations',
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
    userId:{
      type:mongoose.Types.ObjectId,
      ref:'auths'
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("bookingType", bookingTypeSchema);

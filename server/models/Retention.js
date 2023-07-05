const mongoose = require("mongoose");

const { Schema } = mongoose;
const retentionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "auth",
      required: true,
    },
    colorCode: {
      type: String,
      require: true,
    },
    type: {
      type: String,
      enum: ["Attendance", "LastContacted"],
      required: true,
    },
    lowerLimit: {
      type: Number,
      required: true,
      min: 0,
    },
    upperLimit: {
      type: Number,
      required: true,
      validate: {
        // eslint-disable-next-line object-shorthand, func-names
        validator: function (value) {
          return value >= this.lowerLimit;
        },
        message: `Upper limit should be greater than lower limit`,
      },
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    }
  },
  { collection: "retention", timestamps: true }
);

module.exports = mongoose.model("retention", retentionSchema);

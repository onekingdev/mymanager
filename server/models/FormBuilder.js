// declare mongoose
const mongoose = require("mongoose");

const FormBuilderSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      ref:'auths',
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    memberType: {
      type: String,
      required: true,
    },
    automateEntry: {
      type: Boolean,
      required: true,
    },
    smartList: {
      type: String,
    },
    subCategory: {
      type: String,
    },
    formType: {
      type: String,
      required: true,
    },
    formData: {
      type: Object,
    },
    clonedFrom: {
      type: String,
    },
    status: {
      type: String,
    },
    seoDetails:{
      type:Object
    },
    isTemplate:{
      type:Boolean,
      default:false
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
    products:{
      type:Array
    }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

module.exports = mongoose.model("Form-builder", FormBuilderSchema);

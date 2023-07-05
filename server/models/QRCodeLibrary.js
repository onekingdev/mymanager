const mongoose = require("mongoose");

const { Schema } = mongoose;
const QRCodeLibrary = new Schema(
  {
    userId:{
      type:mongoose.Types.ObjectId,
      ref:"auths"
    },
    uuid: {
      type: String,
      // required: true,
    },
    codeType: {
      type: String,
      required: true,
    },
    qrcodeName: {
      type: String,
      default: "My QRCode",
    },
    qrcodeInfo: {
      type: String,
      required: true,
    },
    qrcodeImgURL: {
      type: String,
      required: true,
    },
    pdfviewImgURL: {
      type: String,
    },
    contentURL: {
      type: String,
      // required: true,
    },
    contentType: {
      type: String,
      // required: true,
    },
    contentTitle: {
      type: String,
      // required: true,
    },
    contentDescription: {
      type: String,
      // required: true,
    },
    primaryColor: {
      type: String,
      // required: true,
    },
    buttonColor: {
      type: String,
      // required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
    organizationId:{
      type:mongoose.Types.ObjectId,
      ref:"organizations",
      default:null
    },
    creatorType:{
      type:String,
      default:'user'
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("qrcode-library", QRCodeLibrary);

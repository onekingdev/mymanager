const mongoose = require("mongoose");

const { Schema } = mongoose;
const BarcodeLibrary = new Schema(
  {
    barcodeName: {
      type: String,
      default: "My Barcode",
    },
    barcodeInfo: {
      type: String,
      required: true,
    },
    barcodeImgURL: {
      type: String,
      required: true,
    },
    isDelete: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("barcode-library", BarcodeLibrary);

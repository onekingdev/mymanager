const { Kanban } = require("../models/index/index");
const { QRCodeLibrary } = require("../models/index/index");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");
const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.newQRCode = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const { organization } = req.headers;
    let payload = req.body;
    payload = {
      ...payload,
      userId: user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    await QRCodeLibrary.create(payload);
    return res.status(201).json({
      success: true,
      message:"New QR Code created successfull"
    });
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getAllQRCode = asyncHandler(async (req, res) => {
  try {
    const user = req.user;
    const {organization} = req.headers;
    const qrcodeData = await QRCodeLibrary.find({
      isDelete: false,
      userId:user._id,
      organizationId:organization?mongoose.Types.ObjectId(organization):null
    })
    return res.status(200).send(qrcodeData);
  } catch (err) {
    console.log(err);
    return res.status(400).json({
      errors: { common: { msg: err.message } },
    });
  }
})

exports.getQRCode = asyncHandler(async (req, res) => {
  try {
    const { qrcodeuuid } = req.params;
   const qrcodeData = await QRCodeLibrary.findOne({
      uuid: qrcodeuuid,
      isDelete: false,
    })
    return res.status(200).send(qrcodeData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

exports.deleteQRCode = asyncHandler(async (req, res) => {
  try {
    const { qrcodes } = req.body.source;
    const ids = qrcodes.map(x => mongoose.Types.ObjectId(x._id))
    await QRCodeLibrary.updateMany(
      {
        _id: {$in:ids},
      },
      {
        isDelete: true,
      }
    );
    return res.status(200).json({
      msg: {
        comment: "succcessfully deleted",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})


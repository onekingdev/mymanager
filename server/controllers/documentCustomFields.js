require("dotenv").config();
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { DocumentCustomFields } = require("../models/index/index");

// Add customField
exports.addCustomField = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const payload = {
      ...req.body,
      userId: req.user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    await DocumentCustomFields.create(payload);
    res.send({
      success: true,
      message: "Custom field added successfully!",
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});
// delete customField
exports.deleteCustomField = asyncHandler(async (req, res) => {
  const { id } = req.query;

  try {
    await DocumentCustomFields.findByIdAndDelete(mongoose.Types.ObjectId(id));
    res.send({
      success: true,
      message: "Custom field deleted successfully!",
    });
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

// getCustomFields for userId
exports.getFieldsByUser = asyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    const { organization } = req.headers;
    let q = {
      $or: [
        { userId: mongoose.Types.ObjectId(userId) },
      ],
    }
    if(organization){
      q = {
        $or: [
          { userId: mongoose.Types.ObjectId(userId) },
          { organizationId: mongoose.Types.ObjectId(organization), creatorType: "admin" },
        ],
      }
    }
    const data = await DocumentCustomFields.find(q);
    if (data) {
      res.send({
        success: true,
        data,
      });
    } else {
      res.send({
        success: true,
        message: "Data not found!",
      });
    }
  } catch (error) {
    res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

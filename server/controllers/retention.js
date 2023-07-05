const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { Retention } = require("../models/index/index");

exports.createRange = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const { lowerLimit, upperLimit, colorCode, type } = req.body;
    const data = await Retention.create({
      userId: req.user._id,
      lowerLimit,
      upperLimit,
      colorCode: colorCode ? colorCode : "#000",
      type,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    });
    return res.status(201).json({ success: true, message: "Data Added Successfully" });
  } catch (error) {
    return res.status(500).json({ errors: { common: { msg: error } } });
  }
});

exports.getRanges = asyncHandler(async (req, res) => {
  const { organization } = req.headers;
  const userId = req.user._id;
  try {
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
          },
          {
            creatorType: "super-admin",
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            userId: mongoose.Types.ObjectId(userId),
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(userId),
            organizationId: null,
          },
          {
            creatorType: "super-admin",
          },
        ],
      };
    }

    const retentions = await Retention.find(q);

    const obj = { LastContacted: [], Attendance: [] };
    if (retentions.length > 0) {
      retentions.map((retention) => {
        if (retention.type == "LastContacted") {
          obj.LastContacted.push(retention);
        } else if (retention.type == "Attendance") {
          obj.Attendance.push(retention);
        }
      });
      return res.status(200).json({ success: true, data: obj });
    }
    return res.status(200).json({ success: false, message: "No ranges found" });
  } catch (error) {
    return res.status(500).json({ errors: { common: { msg: error } } });
  }
});

exports.editRange = asyncHandler(async (req, res) => {
  const { retentionId } = req.params;
  try {
    const data = await Retention.findOneAndUpdate(
      {
        userId: req.user._id,
        _id: retentionId,
      },
      req.body,
      { new: true }
    );
    if (data) {
      return res.status(200).json({ success: true, message: "Edited Successfully" });
    }
    return res.status(200).json({ success: false, message: "No ranges found" });
  } catch (error) {
    return res.status(500).json({ errors: { common: { msg: error } } });
  }
});

exports.deleteRange = asyncHandler(async (req, res) => {
  const { retentionId } = req.params;
  try {
    const data = await Retention.findOneAndDelete({
      userId: req.user._id,
      _id: retentionId,
    });

    if (data) {
      return res.status(200).json({ success: true, message: "Range deleted" });
    }
    return res.status(404).json({ success: false, message: "No ranges found" });
  } catch (error) {
    return res.status(500).json({ errors: { common: { msg: error } } });
  }
});

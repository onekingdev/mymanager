const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const { ApplicationPermission } = require("../models/index/index");

exports.createPermission = asyncHandler(async (req, res) => {
  try {
    const payload = {
      userId: req.user._id,
      permissionName: req.body.permissionName,
    };
    const response = await ApplicationPermission.create(payload);
    return res.status(201).json(response);
  } catch (error) {
    return res.send(error);
  }
});

exports.getAllPermissions = asyncHandler(async (req, res) => {
  try {
    const response = await ApplicationPermission.find({ userId: ObjectId(req.user._id) });
    return res.status(200).json(response);
  } catch (error) {
    return res.send(error);
  }
});

exports.getPermissionById = asyncHandler(async (req, res) => {
  try {
    const response = await ApplicationPermission.findOne({
      userId: ObjectId(req.user._id),
      _id: ObjectId(req.params.id),
    });
    if (response === null) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.send(error);
  }
});

exports.updateById = asyncHandler(async (req, res) => {
  try {
    const response = await ApplicationPermission.findOneAndUpdate(
      {
        userId: ObjectId(req.user._id),
        _id: ObjectId(req.params.id),
      },
      req.body,
      { new: true }
    );
    if (response === null) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    return res.status(200).json(response);
  } catch (error) {
    return res.send(error);
  }
});

exports.deleteById = asyncHandler(async (req, res) => {
  try {
    const response = await ApplicationPermission.findOneAndDelete({
      userId: ObjectId(req.user._id),
      _id: ObjectId(req.params.id),
    });
    if (response === null) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send(error);
  }
});

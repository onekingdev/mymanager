const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { Permission } = require("../models/index/index");

exports.createPermission = asyncHandler(async (req, res) => {
  try {
    const payload = req.body;
    const data = await Permission.create(payload);
    return res
      .status(201)
      .json({ success: true, permission: data, message: "Permission successfully created" });
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getPermissionByOrganization = asyncHandler(async (req, res) => {
  try {
    const { organization_id, location_id } = req.headers;
    if (!organization_id && !location_id) {
      return res
        .status(400)
        .json({ success: false, message: "At least organization id is required" });
    }
    let permissions;
    if (location_id) {
      permissions = await Permission.find(
        {
          locationIds: { $in: [mongoose.Types.ObjectId(location_id)] },
        },
        { createdAt: 0, updatedAt: 0, locationIds: 0 }
      ).populate("elementId");
    } else {
      permissions = await Permission.find(
        {
          organizationId: mongoose.Types.ObjectId(organization_id),
        },
        { createdAt: 0, updatedAt: 0 }
      ).populate("elementId");
    }
    return res.status(200).json(permissions);
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updatePermission = asyncHandler(async (req, res) => {
  try {
    const { organization_id, location_id } = req.headers;
    const { id } = req.params;
    if (!organization_id && !location_id) {
      return res
        .status(400)
        .json({ success: false, message: "At least organization id is required" });
    }
    let updatedPermission;
    if (location_id) {
      updatedPermission = await Permission.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
          locationIds: { $in: [mongoose.Types.ObjectId(location_id)] },
        },
        req.body,
        { new: true }
      );
    } else {
      updatedPermission = await Permission.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(id),
          organizationId: mongoose.Types.ObjectId(organization_id),
        },
        req.body,
        { new: true }
      );
    }
    if (updatedPermission !== null) {
      return res.status(200).json({
        success: true,
        permission: updatedPermission,
        message: "Permission updated successfully",
      });
    }
    return res.status(404).json({ success: false, message: "Not Found" });
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updatePermissionByOrg = asyncHandler(async (req, res) => {
  try {
    const { organization_id, location_id } = req.headers;

    if (!organization_id && !location_id) {
      return res
        .status(400)
        .json({ success: false, message: "At least organization id is required" });
    }
    let updatedPermission = [];
    for (let i = 0; i < req.body.length; i++) {
      const { _id, ...newPayload } = req.body[i];
      //console.log(newPayload);
      const data = await Permission.findOneAndUpdate(
        {
          _id: mongoose.Types.ObjectId(_id),
        },
        newPayload,
        { new: true }
      );
      updatedPermission.push(data);
    }
    if (updatedPermission.length > 0) {
      return res.status(200).json({
        success: true,
        permission: updatedPermission,
        message: "Permission updated successfully",
      });
    }
    return res.status(404).json({ success: false, message: "Not Found" });
  } catch (error) {
    res.status({ success: false, message: error.message.replace(/"/g, "") });
  }
});

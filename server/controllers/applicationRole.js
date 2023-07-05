const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { ApplicationRole } = require("../models/index/index");

exports.createRole = asyncHandler(async (req, res) => {
  try {
    const rolePayload = {
      userId: req.user._id,
      roleName: req.body.roleName,
    };
    const response = await ApplicationRole.create(rolePayload);
    return res.status(201).json(response);
  } catch (error) {
    return res.send(error);
  }
});

exports.getAllRoles = asyncHandler(async (req, res) => {
  try {
    const data = await ApplicationRole.aggregate([
      {
        $unwind: {
          path: "$permissions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "application-permission",
          localField: "permissions.id",
          foreignField: "_id",
          as: "permissions",
          pipeline: [
            {
              $project: {
                _id: 1,
                permissionName: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$permissions",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getRoleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ApplicationRole.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(id) },
      },
      {
        $unwind: {
          path: "$permissions",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $lookup: {
          from: "application-permission",
          localField: "permissions.id",
          foreignField: "_id",
          as: "permissions",
          pipeline: [
            {
              $project: {
                _id: 1,
                permissionName: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$permissions",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (data) {
      return res.status(200).json(data);
    }
    return res.status(404).json({ message: "No Role Found!" });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deleteById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await ApplicationRole.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ success: false, message: "No Role Found" });
    }
    await ApplicationRole.deleteOne({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const update = await ApplicationRole.updateOne({ _id: mongoose.Types.ObjectId(id) }, req.body, {
      new: true,
    });
    if (update.modifiedCount === 1) {
      return res.status(200).json({ success: true });
    }
    return res.status(404).json({ success: false, message: "role not updated!" });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

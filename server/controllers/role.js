const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const { Roles, Contact } = require("../models/index/index");
const { defaultElements } = require("../constants");
exports.createRole = asyncHandler(async (req, res) => {
  try {
    const { organization } = req.headers;
    const user = req.user;
    const rolePayload = {
      userId: req.user._id,
      roleName: req.body.roleName,
      permissions: req.body.permissions,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    const response = await Roles.create(rolePayload);
    return res.send({
      success: true,
      message: "Role Added successfully",
      response,
    });
  } catch (error) {
    return res.send(error);
  }
});

exports.getAllRole = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { organization } = req.headers;
  try {
    const data = await Roles.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
          organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
        },
      },
      {
        $project: {
          __v: 0,
        },
      },
    ]);
    return res.status(200).json(data);
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getEmployeeRole = asyncHandler(async (req, res) => {
  let { email } = req.query,
    contact = await Contact.findOne({ email }),
    permissions = [];
  const totalRoles = await Roles.find({ userId: contact.userId });

  let roles = totalRoles.map((item) => {
    if (contact.role.includes(item._id.toString())) {
      return item;
    }
  });
  defaultElements.forEach((element, index) => {
    let tmp = {
      read: false,
      write: false,
      update: false,
      delete: false,
      elementTitle: element.elementTitle,
      elementParent: element.elementParent,
      defaultId: element.defaultId,
      navLink: element.navLink,
    };
    for (let role of roles) {
      let navItem = role.permissions.find((item) => item?.defaultId == element.defaultId);
      if (navItem.read) {
        tmp.read = true;
      }
      if (navItem.write) {
        tmp.write = true;
      }
      if (navItem.delete) {
        tmp.delete = true;
      }
      if (navItem.update) {
        tmp.update = true;
      }
    }
    permissions.push(tmp);
  });
  try {
    if (permissions?.length) {
      return res.status(200).json({ data: permissions, success: true });
    } else {
      return res.status(200).json({ success: false });
    }
  } catch (error) {
    return res.json({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getRoleById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Roles.findOne(mongoose.Types.ObjectId(id));
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
    const data = await Roles.findOne({ _id: id });
    if (!data) {
      return res.status(404).json({ success: false, message: "No Role Found" });
    }
    await Roles.deleteOne({ _id: id });
    return res.status(200).json({ success: true });
  } catch (error) {
    return res.send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updateById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const update = await Roles.updateOne({ _id: mongoose.Types.ObjectId(id) }, req.body, {
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

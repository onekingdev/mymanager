/* eslint-disable prefer-const */
const mongoose = require("mongoose");
const { MembershipType } = require("../models/index/index");
const asyncHandler = require("express-async-handler");

const getMembershipTypes = asyncHandler(async (req, res) => {
  try {
    const { shopId } = req.params;
    const {organization} = req.headers
    let q = {}
    if (organization) {
      q = {
        $or: [
          {
            shopId: mongoose.Types.ObjectId(shopId),
            isDeleted: false,
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    } else {
      q = {
        $or: [
          { shopId: mongoose.Types.ObjectId(shopId), isDeleted: false },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }
    const memberType = await MembershipType.find(q);
    return res.status(200).send(memberType);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

const addMembershipType = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    const { _id } = req.user;
    const user = req.user;
    const {organization} = req.headers
    payload = {
      ...payload,
      userId: mongoose.Types.ObjectId(_id),
      shopId: mongoose.Types.ObjectId(payload.shopId),
      creatorType:organization? user.organizations.find(x=>x.organizationId.toString()===organization).userType: user.userType,
      organizationId:organization? mongoose.Types.ObjectId(organization):null
    };
    await MembershipType.create(payload);
    return res.status(200).json({ success: true, message: "membership type added successfully" });
  } catch (error) {
    return res.status(500).json({
      errors: { common: { msg: error.message } },
    });
  }
})
const updateMembershipType = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    await MembershipType.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload);

    return res.status(200).json({
      success: "Membership type edited successfully",
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

module.exports = {
  getMembershipTypes,
  addMembershipType,
  updateMembershipType,
};

const { Membership, Shop } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  let payload = req.body;
  const { organization } = req.headers;
  const { _id } = req.user;
  try {
    payload = {
      ...payload,
      userId: mongoose.Types.ObjectId(_id),
      shopId: mongoose.Types.ObjectId(payload.shopId),
      type: mongoose.Types.ObjectId(payload.type),
      creatorType:organization? req.user.organizations.find(x=>x.organizationId.toString()===organization).userType: req.user.userType,
      organizationId:organization? mongoose.Types.ObjectId(organization):null
    };
    
    await Membership.create(payload);
    res.send({
      msg: "membership created successfully",
      success: true,
    });
  } catch (error) {

    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.membershipList = asyncHandler(async (req, res) => {
  try {
    let { shopId, permission } = req.query;
    const { organization } = req.headers;
    let permissions = [];
    if (permission === "all") {
      permissions = ["private", "public"];
    } else {
      permissions = [permission];
    }
    let q;
    if (permission === 'public') {
     
      q = {
        shopId: mongoose.Types.ObjectId(shopId),
        permission: { $in: permissions },
        isDeleted: false,
      };
    } else {
      if(organization){
        q = {
          $or: [
            {
              shopId: mongoose.Types.ObjectId(shopId),
              permission: { $in: permissions },
              isDeleted: false,
            },
            {
              organizationId: { $eq: mongoose.Types.ObjectId(organization) },
              permission: 'public',
              isDeleted: false,
            },
            {
              creatorType: { $eq: "super-admin" },
              permission: "public",
              isDeleted: false,
            },
          ],
        };
      }
      else{
        q = {
          $or: [
            {
              shopId: mongoose.Types.ObjectId(shopId),
              permission: { $in: permissions },
              isDeleted: false,
            },
            {
              creatorType: { $eq: "super-admin" },
              permission: "public",
              isDeleted: false,
            },
          ],
        };
      }
      
      
    }
    const memberships = await Membership.aggregate([
      {
        $match: q,
      },
      {
        $lookup: {
          from: "membershiptypes",
          localField: "type",
          foreignField: "_id",
          as: "membershipType",
        },
      },
      {
        $unwind: {
          path: "$membershipType",
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
    return res.status(200).json({ success: true, data: memberships });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.membershipInfo = asyncHandler(async (req, res) => {
  try {
    const { shopPath, membershipPath } = req.query;
    const memberships = await Membership.aggregate([
      { $match: { path: `${shopPath}/${membershipPath}`, isDeleted: false } },
      {
        $lookup: {
          from: "membershiptypes",
          localField: "type",
          foreignField: "_id",
          as: "membershipType",
        },
      },
      {
        $unwind: {
          path: "$membershipType",
          preserveNullAndEmptyArrays: false,
        },
      },
      {
        $lookup: {
          from: "document-recipients",
          localField: "defaultContract",
          foreignField: "_id",
          as: "template",
        },
      },
      {
        $unwind: {
          path: "$template",
          preserveNullAndEmptyArrays: false,
        },
      },
    ]);
    return res.status(200).json({ success: true, data: memberships[0] });
  } catch (error) {
    res.send({ error: error.message.replace(/\"/g, ""), success: false });
  }
});

exports.updateMembership = async (req, res) => {
  const payload = req.body;
  const { id } = req.params;
  try {
    await Membership.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, payload);
    return res.status(200).json({ success: true, message: "Product updated successfully" });
  } catch (err) {
    res.send({ msg: err.message.replace(/\"/g, ""), success: false });
  }
};

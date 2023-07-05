const { Progression } = require("../models/index/index");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.createProgression = asyncHandler(async (req, res) => {
  let payload = req.body;
  const { organization } = req.headers;
  const user = req.user;
  try {
    payload = {
      ...payload,
      userId: user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    
    const newProgression = new Progression(payload);
    const data = await newProgression.save();
    if (data.lenght < 1) {
      return res.send({
        msg: "unable to create progression",
        success: false,
      });
    }
    return res.send({
      msg: "progression created successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
})

exports.progressionDetails = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { organization } = req.headers;
  try {
    let q = {  };
    if(organization){
      q = {$or: [{
        organizationId: mongoose.Types.ObjectId(organization),
        creatorType: "admin",
        isDeleted: false,
      },
      {
        creatorType: "super-admin",
        isDeleted: false,
      },
      {
        organizationId: mongoose.Types.ObjectId(organization),
        isDeleted: false,
        userId: mongoose.Types.ObjectId(userId),
      }]}
    }
    else{
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(userId),
            organizationId: null,
            isDeleted: false,
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
          },
        ],
      };
    }
    const data = await Progression.find(q).populate({
      path: "categoryId",
      model: "category",
      match: { isDeleted: false },
    });
    if (data.length > 0) {
      return res.send({
        data: data,
        success: true,
      });
    }
    return res.send({
      msg: "There is not data for this user",
      success: false,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
})

exports.updateProgression = async (req, res) => {
  const userId = req.user._id;
  const _id = req.params.progressionId;
  const payload = req.body;
  try {
    let updateProgression = await Progression.updateOne(
      { _id: mongoose.Types.ObjectId(_id), userId: mongoose.Types.ObjectId(userId) },
      { $set: payload }
    );
    if (updateProgression.modifiedCount < 1) {
      return res.send({
        msg: "unable to update progression",
        success: false,
      });
    }
    return res.send({
      msg: "progression updated successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

exports.removeProgression = async (req, res) => {
  const _id = req.params.progressionId;
  const userId = req.user._id;
  try {
    let deleteProgression = await Progression.updateOne(
      { _id: mongoose.Types.ObjectId(_id), userId: mongoose.Types.ObjectId(userId) },
      { isDeleted: true }
    );
    if (deleteProgression.modifiedCount < 1) {
      return res.send({
        msg: "unable to delete progression",
        success: false,
      });
    }
    return res.send({
      msg: "progression deleted successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

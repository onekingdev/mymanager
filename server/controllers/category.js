const { Category, Progression } = require("../models/index/index");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.createCategory = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const progressionId = req.params.progressionId;
  let payload = req.body;
  const user = req.user;
  const { organization } = req.headers;
  try {
    payload = {
      ...payload,
      userId: user._id,
      organizationId: organization ? mongoose.Types.ObjectId(organization) : null,
      creatorType: organization
        ? user.organizations.find((x) => x.organizationId.toString() === organization).userType
        : user.userType,
    };
    const newCategory = new Category(payload);
    
    const data = await newCategory.save();
    if (data) {
      let updateProgression = await Progression.updateOne(
        {
          _id: mongoose.Types.ObjectId(progressionId),
          userId: mongoose.Types.ObjectId(userId),
        },
        {
          $push: { categoryId: data._id },
        }
      );
      if (updateProgression.modifiedCount < 1) {
        return res.send({
          msg: "category is created but not updated in progression",
          success: false,
        });
      }
      return res.send({
        msg: "category created successfully",
        success: true,
      });
    } else {
      return res.send({
        msg: "category not created",
        success: false,
      });
    }
  } catch (err) {
    res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.categoryDetails = asyncHandler(async (req, res) => {
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

    let data = await Category.find(q);
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
});

exports.categoryUpdate = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  const payload = req.body;
  try {
    let updateCategory = await Category.updateOne(
      { _id: mongoose.Types.ObjectId(categoryId) },
      { $set: payload }
    );
    if (updateCategory.modifiedCount < 1) {
      return res.send({
        msg: "unable to update category",
        success: false,
      });
    }
    return res.send({
      msg: "category udpated successfully",
      success: true,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
});

exports.categoryDelete = asyncHandler(async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
    let deleteCategory = await Category.updateOne(
      { _id: mongoose.Types.ObjectId(categoryId) },
      { isDeleted: true }
    );
    if (deleteCategory.modifiedCount > 0) {
      return res.send({
        msg: "category deleted succesfully",
        success: true,
      });
    }
    return res.send({
      msg: "category not deleted",
      success: false,
    });
  } catch (err) {
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
});

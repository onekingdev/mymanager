const { Category, RankCategory } = require("../models/index/index");
const googleCloudStorage = require("../Utilities/googleCloudStorage");
const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.create = asyncHandler(async (req, res) => {
  let payload = req.body;
  const categoryId = req.params.categoryId;

  payload.categoryId = mongoose.Types.ObjectId(categoryId);
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
    const isExist = await Category.find({ _id: categoryId, isDeleted: false });
    if (isExist.length) {
      if (req.file) {
        const url = await googleCloudStorage.upload(req.file);
        payload.rankImage = url;
      }
      const rank = new RankCategory(payload);
      rank.save((err, data) => {
        if (err) {
          return res.send({ msg: err, success: false });
        }
        return res.send({ msg: "Categoy rank created successfully", success: true });
      });
    } else {
      return res.send({ msg: `category is not exist`, success: false });
    }
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.rankCategoryInfo = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const categoryId = req.params.categoryId;
  const {organization} = req.headers
  try {
    let q = {};
    if (organization) {
      q = {
        $or: [
          {
            organizationId: mongoose.Types.ObjectId(organization),
            creatorType: "admin",
            isDeleted: false,
            categoryId: mongoose.Types.ObjectId(categoryId),
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
            categoryId: mongoose.Types.ObjectId(categoryId),
          },
          {
            organizationId: mongoose.Types.ObjectId(organization),
            isDeleted: false,
            userId: mongoose.Types.ObjectId(userId),
            categoryId: mongoose.Types.ObjectId(categoryId),
          },
        ],
      };
    } else {
      q = {
        $or: [
          {
            userId: mongoose.Types.ObjectId(userId),
            organizationId: null,
            isDeleted: false,
            categoryId: mongoose.Types.ObjectId(categoryId),
          },
          {
            creatorType: "super-admin",
            isDeleted: false,
            categoryId: mongoose.Types.ObjectId(categoryId),
          },
        ],
      };
    }
    const result = await RankCategory.find(q);

    return res.send({
      data: result,
      success: true,
    });
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.update = asyncHandler(async (req, res) => {
  const rankBody = req.body;
  const rankId = req.params.category_rank_id;
  try {
    if (req.file) {
      const url = await googleCloudStorage.upload(req.file);
      rankBody.rankImage = url;
    }
    RankCategory.updateOne({ _id: rankId }, { $set: rankBody }).exec((err, programdata) => {
      if (programdata.modifiedCount > 0) {
        return res.send({ msg: "rank updated successfully", success: true });
      } else {
        return res.send({ msg: "rank not update", success: false });
      }
    });
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

exports.remove = asyncHandler(async (req, res) => {
  const rankId = req.params.category_rank_id;
  try {
    const result = await RankCategory.updateOne(
      { _id: mongoose.Types.ObjectId(rankId) },
      { isDeleted: true }
    );
    if (result.modifiedCount < 1) {
      return res.send({
        msg: "unable to delete rankCategory",
        success: false,
      });
    } else {
      return res.send({ msg: "rankCategory deleted succesfully", success: true });
    }
  } catch (err) {
    return res.send({ msg: err.message.replace(/"/g, ""), success: false });
  }
});

const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const { Tag } = require("../models/index");

const initialTags = {
  cold: "secondary",
  warm: "warning",
  hot: "danger",
};

exports.createTag = asyncHandler(async (req, res) => {
  try {
    const { value, color } = req.body;
    const userId = req.user._id;

    const initTag = new Tag({
      value,
      color,
      userId: mongoose.Types.ObjectId(userId),
    });

    initTag.save((err, success) => {
      if (err) {
        return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
      } else {
        return res.status(200).json({
          success,
        });
      }
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getTags = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const tagList = await Tag.find({
      isDelete: false,
      userId: mongoose.Types.ObjectId(userId),
    });
    if (tagList.length > 0) {
      return res.status(200).send(tagList);
    } else {
      let tagData = [];
      for (key in initialTags) {
        const initTag = new Tag({
          value: key,
          color: initialTags[key],
          userId: mongoose.Types.ObjectId(userId),
        });
        initTag.save((err, success) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        });
        tagData.push(initTag);
      }
      return res.status(200).send(tagData);
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err } },
    });
  }
});

exports.deleteTag = asyncHandler(async (req,res)=>{
    try {
        const {id} = req.params
        await Tag.findByIdAndUpdate(mongoose.Types.ObjectId(id),{isDelete:true});
        return res.status(200).json({
            msg: {
              comment: "succcessfully deleted",
            },
          });
    } catch (err) {
        return res.status(500).json({
            errors: { common: { msg: err.message } },
          });
    }
})

exports.updateTag = asyncHandler(async (req,res)=>{
  try {
      const {id} = req.params
      const payload = {...req.body,isDelete:false}
      await Tag.findByIdAndUpdate(mongoose.Types.ObjectId(id),payload);
      return res.status(200).json({
          msg: {
            comment: "succcessfully updated",
          },
        });
  } catch (err) {
      return res.status(500).json({
          errors: { common: { msg: err.message } },
        });
  }
})
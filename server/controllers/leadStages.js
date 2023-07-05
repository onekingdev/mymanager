const asyncHandler = require("express-async-handler");
const { default: mongoose } = require("mongoose");
const { Stage } = require("../models/index/index");

const initialStages = {
  COLD: "secondary",
  WARM: "warning",
  HOT: "danger",
  DONE: "primary",
  WIN: "success",
  LOST: "danger",
};

exports.createStage = asyncHandler(async (req, res) => {
  try {
    const { value, color } = req.body;
    const userId = req.user._id;

    const count = await Stage.countDocuments({ userId, isDelete: false });

    console.log("count", count);
    const initStage = new Stage({
      value,
      color,
      userId: mongoose.Types.ObjectId(userId),
      order: count - 1,
    });

    initStage.save((err, success) => {
      if (err) {
        console.log(err);
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
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.getStages = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const tagList = await Stage.find({
      isDelete: false,
      userId: mongoose.Types.ObjectId(userId),
    }).sort({ order: 1 });

    if (tagList.length > 0) {
      return res.status(200).send(tagList);
    } else {
      let tagData = [];
      let cnt = 0;
      for (key in initialStages) {
        const initStage = new Stage({
          value: key,
          color: initialStages[key],
          userId: mongoose.Types.ObjectId(userId),
          order: key == "LOST" ? 10002 : key == "WIN" ? 10001 : cnt + 1,
        });
        initStage.save((err, success) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        });
        if (key !== "LOST" && key !== "WIN") {
          cnt = cnt + 1;
        }
        tagData.push(initStage);
      }
      return res.status(200).send(tagData.sort((a, b) => a.order < b.order));
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err } },
    });
  }
});

exports.deleteStage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await Stage.findByIdAndUpdate(mongoose.Types.ObjectId(id), { isDelete: true });
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
});

exports.updateStage = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = { ...req.body, isDelete: false };
    await Stage.findByIdAndUpdate(mongoose.Types.ObjectId(id), payload);
    return res.status(200).json({
      msg: {
        comment: "Succcessfully updated",
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

exports.swapOrder = asyncHandler(async (req, res) => {
  try {
    const { firstId, secondId } = req.params;

    const oldIndex = parseInt(firstId) + 1;
    const newIndex = parseInt(secondId) + 1;

    const firstStage = await Stage.findOne({
      userId: mongoose.Types.ObjectId(req.user._id),
      order: oldIndex,
    });
    const secondStage = await Stage.findOne({
      userId: mongoose.Types.ObjectId(req.user._id),
      order: newIndex,
    });

    if (oldIndex < newIndex) {
      for (let i = oldIndex + 1; i <= newIndex; i++) {
        let otherStage = await Stage.findOne({
          userId: mongoose.Types.ObjectId(req.user._id),
          order: i,
        });
        otherStage.order = i - 1;
        await otherStage.save();
      }
      firstStage.order = newIndex;
      await firstStage.save();
    } else {
      for (let j = oldIndex - 1; j >= newIndex; j--) {
        let otherStage = await Stage.findOne({
          userId: mongoose.Types.ObjectId(req.user._id),
          order: j,
        });
        otherStage.order = j + 1;
        await otherStage.save();
      }
      firstStage.order = newIndex;
      await firstStage.save();
    }

    return res.status(200).json({
      msg: {
        comment: "Succcessfully updated",
      },
    });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

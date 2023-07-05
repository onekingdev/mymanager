const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { FreezeTask } = require("../models/index/index");

exports.createNewFreezeTask =asyncHandler(async (req, res) => {
  try {
    const { taskId, startDate, endDate } = req.body;
    const alreadyTaskFreezeList = await FreezeTask.find({ taskId });
    if (alreadyTaskFreezeList.length > 0) {
      oldTaskFreeze = alreadyTaskFreezeList[0];
      oldTaskFreeze.startDate = startDate;
      oldTaskFreeze.endDate = endDate;
      oldTaskFreeze.status = 0;
      oldTaskFreeze.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err } },
            });
          }
        }
        return res.status(201).json({
          success: "FreezeTask updated successfully",
        });
      });
    } else {
      const newFT = new FreezeTask({
        taskId,
        startDate,
        endDate,
        status: 0,
      });
      newFT.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err } },
            });
          }
        }
        return res.status(201).json({
          success: "FreezeTask created successfully",
        });
      });
    }
  } catch (error) {
    res.status(500).json({ errors: { common: { msg: "Internal server error!" } } });
  }
});

exports.getFreezeTask = asyncHandler(async (req, res) => {
  try {
    const freezeTaskList = await FreezeTask.find({
      isDelete: false,
    });

    if (freezeTaskList.length > 0) {
      return res.status(200).send(freezeTaskList);
    } else {
      let freezeTaskData = [];

      for (key in initialFreezeTasks) {
        const initialFreezeTask = new FreezeTask({
          title: key,
          color: initialFreezeTasks[key],
        });

        initialFreezeTask.save((err, success) => {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err.message } },
            });
          }
        });
        freezeTaskData.push(initialFreezeTask);
      }
      console.log(freezeTaskData);
      return res.status(200).send(freezeTaskData);
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err } },
    });
  }
});

exports.updateFreezeTask = asyncHandler(async (req, res) => {
  try {
    const { taskId, startDate, endDate } = req.body;
    const alreadyTaskFreezeList = await FreezeTask.find({ taskId });
    if (alreadyTaskFreezeList.length > 0) {
      oldTaskFreeze = alreadyTaskFreezeList[0];
      oldTaskFreeze.startDate = startDate;
      oldTaskFreeze.endDate = endDate;
      oldTaskFreeze.status = 1;
      oldTaskFreeze.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err } },
            });
          }
        }
        return res.status(201).json({
          success: "FreezeTask accepted successfully",
        });
      });
    } else {
      const newFT = new FreezeTask({
        taskId,
        startDate,
        endDate,
        status: 1,
      });
      newFT.save((err, success) => {
        if (err) {
          if (err) {
            return res.status(500).json({
              errors: { common: { msg: err } },
            });
          }
        }
        return res.status(201).json({
          success: "FreezeTask created successfully",
        });
      });
    }
  } catch (error) {
    res.status(500).json({ errors: { common: { msg: "Internal server error!" } } });
  }
});

exports.deleteFreezeTask = asyncHandler(async (req, res) => {
  try {
    const { _id } = req.params;

    await FreezeTask.updateMany(
      {
        _id: _id,
      },
      {
        isDelete: true,
      }
    );
    return res.status(200).json({
      msg: {
        comment: "succcessfully deleted",
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
});

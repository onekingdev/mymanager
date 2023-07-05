const { UserGoal,ActionPlans,GoalWorkspace } = require("../models/index/index");
const mongoose = require("mongoose");
const GoogleCloudStorage = require("../Utilities/googleCloudStorage");

exports.creategoal = async (req, res) => {
  const { type } = req.params;
  const userId = req.user._id;
  const bodyData = req.body;
  const { parentId } = req.query;
  try {
    const workSpaceExist = await GoalWorkspace.findById(req.body.workSpace);
    if (!workSpaceExist) {
      return res.send({
        msg: "work space not exist",
        success: false,
      });
    }
    var url = "";
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
    }
    if (parentId) {
      const isExist = await UserGoal.find({ _id: parentId });
      if (isExist.length == 1) {
        bodyData.parentGoalId = isExist[0]._id;
      } else {
        return res.send({
          msg: "There is no goal for this parentGoalId",
          success: false,
        });
      }
    }
    bodyData.type = type;
    bodyData.pictureUrl = url;
    bodyData.userId = userId;
    let saveGoal = new UserGoal(bodyData);
    const data = await saveGoal.save();
    if (data.lenght < 1) {
      return res.send({
        msg: "unable to create Goal",
        success: false,
      });
    }
    return res.send({
      msg: "Goal created successfully",
      success: true,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.updateGoal = async (req, res) => {
  const bodyData = req.body;
  const { goalId } = req.params;
  const { parentId } = req.query;
  var url;
  try {
    if (req.file) {
      url = await GoogleCloudStorage.upload(req.file);
      bodyData.pictureUrl = url;
    }
    if (parentId) {
      const isExist = await UserGoal.find({ _id: parentId });
      if (isExist.length == 1) {
        bodyData.parentGoalId = isExist[0]._id;
      } else {
        return res.send({
          msg: "There is no goal for this parentGoalId",
          success: false,
        });
      }
    }
    const updateGoal = await UserGoal.updateOne({ _id: goalId }, { $set: bodyData });
    if (updateGoal.modifiedCount > 0) {
      return res.send({ msg: "goal updated successfully", success: true });
    }
    return res.send({ msg: "unable to udpate goal", success: false });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.allGoals = async (req, res) => {
  try {
    const userGoals = await UserGoal.find({
      userId: mongoose.Types.ObjectId(req.user._id),
      parentGoalId: null,
      workSpace: req.params.workSpaceId,
    }).populate("actionPlans");
    if (userGoals.length > 0) {
      return res.send({ success: true, data: userGoals });
    }
    return res.send({
      msg: "There is no data for this user",
      success: false,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.goalsByParentId = async (req, res) => {
  const { parentGoalId } = req.params;
  try {
    const goals = await UserGoal.find({ parentGoalId: parentGoalId }).populate("actionPlans");
    if (goals.length > 0) {
      return res.send({ success: true, data: goals });
    }
    return res.send({
      msg: "There is no subgoals for this parentGoalId",
      success: false,
    });
  } catch (err) {
    res.json({ message: err });
  }
};
exports.getGoal = async (req, res) => {
  const {goalId} = req.params;
  try {
    const goal = await UserGoal.findOne({_id:mongoose.Types.ObjectId(goalId)}).populate("actionPlans");
    if (goal) {
      return res.send({ success: true, data: goal });
    }
    return res.send({
      msg: "No goal found",
      success: false,
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.remove = async (req, res) => {
  let { goalId } = req.params;
  try {
    let data = await UserGoal.find({ _id: goalId });
    if (data.length > 0) {
      await UserGoal.findOneAndRemove({
        _id: mongoose.Types.ObjectId(goalId),
        userId: mongoose.Types.ObjectId(req.user._id),
      });
      let update = await ActionPlans.updateMany({parentGoalId:goalId},{isDelete:true});
      if(update.modifiedCount>0)
      {
        return res.send({
          msg: "goal deleted successfully and "+ update.modifiedCount +"action plan updated",
          success: true,
        });


      }
      else
      {
        return res.send({
          msg: "goal deleted successfully and not updated in action plan",
          success: true,
        });
      }
    
    } else {
      return res.send({ msg: "goal not found", success: false });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

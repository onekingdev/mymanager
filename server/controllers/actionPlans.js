const { ActionPlans, UserGoal } = require("../models/index");

exports.createActionPlans = async (req, res) => {
  const { goalId } = req.params;
  const bodyData = req.body;
  bodyData.userId = req.user._id;
  try {
    const isExist = await UserGoal.find({ _id: goalId });
    if (isExist.length > 0) {
      const newActionPlan = new ActionPlans(bodyData);
      await newActionPlan.save(async (err, data) => {
        if (err) {
          return res.send({
            success: false,
            msg: err.message,
          });
        }
        if (data) {
          const acitonPlansUpdate = await UserGoal.updateOne(
            { _id: goalId },
            { $push: { actionPlans: data._id } }
          );
          if (acitonPlansUpdate.modifiedCount > 0) {
            return res.send({
              msg: "action plan created successfully",
              success: true,
            });
          }
          return res.send({
            msg: "unable to create action plan",
            success: false,
          });
        }
      });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

exports.acitonPlansUpdate = async (req, res) => {
  const { actionId } = req.params;
  try {
    const update = await ActionPlans.updateOne({ _id: actionId }, { $set: req.body });
    if (update.modifiedCount > 0) {
      return res.send({
        msg: "action plan updated successfully",
        success: true,
      });
    }
    return res.send({
      msg: "unable to update action plan",
    });
  } catch (err) {
    res.json({ message: err });
  }
};

exports.acitonPlansRemove = async (req, res) => {
  const { actionId } = req.params;
  try {
    let data = await ActionPlans.find({ _id: actionId });
    if (data.length > 0) {
      await ActionPlans.remove({ _id: actionId });
      return res.send({ msg: "action plan deleted", success: true });
    } else {
      return res.send({ msg: "action plan not found", success: false });
    }
  } catch (err) {
    res.json({ message: err });
  }
};

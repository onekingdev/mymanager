const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const { User } = require("../models/index/index");
const tokenGenerate = require("../Utilities/generateToken");

const signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, parseInt(10, 10));

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    const user = tokenGenerate(newUser);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ errors: { common: { msg: "Internal server error!" } } });
  }
};

const getUserList = async (req, res) => {
  try {
    User.find()
      .populate("userId")
      .exec((err, data) => {
        if (err) {
          res.send({
            msg: err,
            success: false,
          });
        } else {
          res.send({ data, success: true });
        }
      });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const addOrUpdateLocation = async (req, res) => {
  try {
    const { userId } = req.body;
    let { location } = req.body;
    if (!Array.isArray(location) && typeof location === "string") {
      location = [location];
    }
    const locationMapped = location.map((l) => ({ name: l }));
    const data = await User.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(userId) },
      { location: locationMapped }
    );
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `User not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getUserDetails = async (req, res) => {
  try {
    const userInfo = await User.find({});
    if (userInfo.length) {
      return res.status(200).json({ success: true, data: userInfo });
    }
    return res.status(404).json({ success: false, message: `User info is empty!` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const updateUserDetails = async (req, res) => {
  try {
    const { userId } = req.params;
    const Obj = req.body;

    console.log("updateUserDetails", Obj);

    ["userId", "location"].map((el) => delete Obj[el]);
    const data = await User.findOneAndUpdate({ userId: mongoose.Types.ObjectId(userId) }, Obj);
    if (data) {
      return res.status(200).json({ success: true, message: `Success` });
    }
    return res.status(404).json({ success: false, message: `User not found` });
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const userDetailsByUserId = async (req, res) => {
  try {
    const { _id } = req.user;
    const userDetails = await User.find({ userId: _id });
    return res.status(200).send(userDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    userDetails = await User.aggregate([
      {
        $match: {
          userId: mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "organizations",
          localField: "organizationId",
          foreignField: "_id",
          as: "organization",
        },
      },
    ]);
    return res.status(200).send(userDetails[0]);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getOrgAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const userDetails = await User.aggregate([
      {
        $match: {
          "organizations.organizationId": mongoose.Types.ObjectId(id),
        },
      },
      {
        $match: {
          "organizations.userType": "admin",
        },
      },
      {
        $lookup: {
          from: "auths",
          localField: "userId",
          foreignField: "_id",
          as: "auths",
        },
      },
      {
        $unwind: {
          path: "$auths",
          preserveNullAndEmptyArrays: true,
        },
      },
      {
        $project: {
          "auths.hashed_password": 0,
          __v: 0,
          "auths.__v": 0,
        },
      },
    ]);
    return res.status(200).send(userDetails);
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const assignRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(userId) },
      { role: mongoose.Types.ObjectId(roleId) },
      { new: true }
    );
    if (user) {
      return res.status(200).send({ success: true });
    } else {
      return res.status(400).send({ success: false });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const assignAdminRoleToUser = async (req, res) => {
  try {
    const { userId, roleId } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(userId) },
      { role: mongoose.Types.ObjectId(roleId) },
      { new: true }
    );
    if (user) {
      return res.status(200).send({ success: true });
    } else {
      return res.status(400).send({ success: false });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const assignPlanToUser = async (req, res) => {
  try {
    const { userId, planId } = req.body;
    const user = await User.findOneAndUpdate(
      { userId: mongoose.Types.ObjectId(userId) },
      { planId: mongoose.Types.ObjectId(planId) },
      { new: true }
    );
    if (user) {
      return res.status(200).send({ success: true });
    } else {
      return res.status(400).send({ success: false });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const getUserPersonalPlan = async (req, res) => {
  try {
    const { _id } = req.user;
    // REF: GET QUERY FOR NESTED LOOKUP WITH MATCHING COND
    const user = await User.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(_id) },
      },
      {
        $lookup: {
          from: "subscription-plan",
          let: { planId: "$planId" },
          pipeline: [
            { $match: { $expr: { $eq: ["$_id", "$$planId"] } } },
            {
              $lookup: {
                from: "permission",
                let: { subId: "$_id" },
                pipeline: [{ $match: { $expr: { $eq: ["$planId", "$$subId"] } } }],
                as: "permission",
              },
            },
          ],
          as: "plan",
        },
      },
      {
        $unwind: {
          path: "$plan",
          preserveNullAndEmptyArrays: true,
        },
      },
    ]);
    if (user) {
      return res.status(200).send(user[0]);
    } else {
      return res.status(400).send({ success: false });
    }
  } catch (error) {
    return res.status(500).send({ error: error.message.replace(/"/g, ""), success: false });
  }
};

const deactiveUser = async (req, res) => {
  console.log("req.user", req.user);
  const { _id } = req.user;
  try {
    const user = await User.findOneAndUpdate(
      { userId: _id },
      { $set: { isActive: false } },
      { new: true, runValidators: true }
    );
    if (user) {
      return res.status(200).json({ data: user, success: true });
    }
    return res.status(403).json({ message: "unable deactive user", success: false });
  } catch (err) {
    console.log(err);
    return res.send({ error: err.message.replace(/\"/g, ""), success: false });
  }
};

module.exports = {
  signup,
  addOrUpdateLocation,
  getUserDetails,
  updateUserDetails,
  userDetailsByUserId,
  getByUserId,
  getUserList,
  assignRoleToUser,
  assignAdminRoleToUser,
  assignPlanToUser,
  getUserPersonalPlan,
  getOrgAdmin,
  deactiveUser,
};

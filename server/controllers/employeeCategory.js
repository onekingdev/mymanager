const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
 const {EmployeeCategory } = require("../models/index/index");

//create new task
const createCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.body;
    const { user } = req;
    await EmployeeCategory.create({
      userId: user._id,
      category,
      //color,
    });
    return res.status(201).json({ msg: "Created successfully", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
const updateCategory = asyncHandler(async (req, res) => {
  try {
    const { category } = req.body;
    const { id } = req.params;
    const existedCategory = await EmployeeCategory.findById(id);
    if (!existedCategory) throw Error("Category not Found");
    existedCategory.category = category;
    await existedCategory.save();
    return res.status(200).json({ msg: "Successfully Updated", success: true });
  } catch (error) {
    return res.status(500).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    await EmployeeCategory.findByIdAndDelete(id);
    return res.status(200).json({ msg: "Successfully Deleted", success: true });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

// ** Get All Shift
const getAllCategories = asyncHandler(async (req, res) => {
  try {
    let allShift = await EmployeeCategory.aggregate([
      {
        $match: { userId: mongoose.Types.ObjectId(req.user.id ? req.user.id : req.user._id) },
      },
    ]);
    res.status(200).json(allShift);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
module.exports = {
  createCategory,
  getAllCategories,
  updateCategory,
  deleteCategory,
};

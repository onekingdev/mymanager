const { FormCategory } = require("../models/index/index");
const { default: mongoose } = require("mongoose");
const asyncHandler = require("express-async-handler");

exports.createCategory = asyncHandler(async (req, res) => {
    const { name, type, labelColor } = req.body;
    try {
        const categoryObj = new FormCategory({ name, type, labelColor });
        const data = await categoryObj.save();
        res.send({ success: true, message: "Category data created successfully", data: data });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
    }
});

exports.getOneCategory = asyncHandler(async (req, res) => {
    try {
        const getdata = await FormCategory.find(mongoose.Types.ObjectId(req.params.id));
        return res.send({
            success: true,
            message: "success",
            data: getdata
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
    }
});

exports.getAllCategories = asyncHandler(async (req, res) => {
    try {
        const getAllCategories = await FormCategory.find();
        return res.send({
            success: true,
            message: "success",
            data: getAllCategories
        });
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
    }
});

exports.updateCategory = asyncHandler(async (req, res) => {
    const { id, name, labelColor } = req.body;
    try {
      const data = await FormCategory.findByIdAndUpdate(mongoose.Types.ObjectId(id), { name, labelColor });
      return res.send({
        success: true,
        message: "Category data updated successfully",
        data: data
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
    }
});

exports.deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const data = await FormCategory.findByIdAndDelete(mongoose.Types.ObjectId(id));
      return res.send({
        success: true,
        message: "Category data deleted successfully",
        data: data
      });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message.replace(/"/g, "") });
    }
});



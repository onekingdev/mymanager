const { cmpCategory } = require("../models/index/index");

const asyncHandler = require("express-async-handler");

exports.addCategory = asyncHandler(async (req, res) => {
  const { name } = req.body;

  const payload = {
    name: name,
  };
  let categoryObj = new cmpCategory(payload);
  categoryObj.save((err, data) => {
    if (err) {
      return res.status(400).json({
        status: false,
        message: "error",
        error: err,
      });
    }
    res.send({ status: true, message: "success", data: data });
  });
})

exports.cmpgetallCategory = asyncHandler(async (req, res) => {
  //await Category.find()
  try {
    const getCmpCategory = await cmpCategory.find();
    return res.status(200).json(getCmpCategory);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.getoneCategory = asyncHandler(async (req, res) => {
  try {
    const getdata = await cmpCategory.find({ _id: req.params.id });
    return res.status(200).json(getdata);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});



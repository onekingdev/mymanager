const mongoose = require("mongoose");
const { Shop } = require("../models/index/index");
const asyncHandler = require("express-async-handler");

exports.createShop = asyncHandler(async (req, res) => {
  let bodyData = req.body;
  const userId = req.user._id;
  try {
    bodyData.userId = userId;
    const shop = await Shop.create(bodyData)
    return res.status(200).json({ success: true, message: "Shop added successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

exports.shopByUser = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const ShopData = await Shop.findOne({
      isDeleted: false,
      userId: mongoose.Types.ObjectId(userId),
    });
    return res.status(200).send(ShopData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

exports.shopByPath = asyncHandler(async (req, res) => {
  console.log(req.params)
  const shopPath = req.params.path;
  try {
    const ShopData = await Shop.findOne({
      isDeleted: false,
      shopPath: shopPath,
    });
    return res.status(200).send(ShopData);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

exports.update = asyncHandler(async (req, res) => {
  const id = req.params.Id;
  console.log(req.body)
  try {
    const Update = await Shop.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, req.body );
    //return res.send({ msg: "Shop updated successfully", success: true });
    return res.status(200).json({ success: true, message: "Shop updated successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

//updateFaq
exports.updateFaq = asyncHandler(async (req, res) => {
  const id = req.params.Id;
  try {
    const Update = await Shop.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $push: { faq: req.body } } );
    //return res.send({ msg: "Shop updated successfully", success: true });
    return res.status(200).json({ success: true, message: "Faq added successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})
exports.deleteFaq = asyncHandler(async (req, res) => {
  const id = req.params.Id;
  const {faqId} = req.body
  try {
    const Update = await Shop.findOneAndUpdate({ _id: mongoose.Types.ObjectId(id) }, { $pull: { faq: {_id:mongoose.Types.ObjectId(faqId)} } } );
    //return res.send({ msg: "Shop updated successfully", success: true });
    return res.status(200).json({ success: true, message: "Faq deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
})

exports.checkShopPath = async (req, res) => {
  try {
    const { path } = req.params;

    const data = await Shop.find({ shopPath: path });

    if (data.length > 0) {
      return res.status(200).json({ isAvailable: false });
    }
    return res.status(200).json({ isAvailable: true });
  } catch (error) {}
};

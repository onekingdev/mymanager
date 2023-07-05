const { BillingHistory } = require("../models/index/index");

const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");

exports.getBillingHistory =asyncHandler( async (req, res) => {
  try {
    const billingHistory = await BillingHistory.find({ userId: req.user._id });
    res.status(200).json(billingHistory);
  } catch (e) {
    res.send({
      code: 404,
      msg: "History not found",
    });
  }
});

const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const asyncHandler = require("express-async-handler");
const { SubscriptionPlan } = require("../models/index/index");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.createPlan = asyncHandler(async (req, res) => {
  try {
    let { userId } = req.user;
    let payload = req.body;

    const product = await stripe.products.create({
      name: req.body.name,
    });
    const pricePerMonth = await stripe.prices.create({
      unit_amount: Number(payload.pricePerMonth) * 100,
      currency: "usd",
      recurring: { interval: "month" },
      product: product.id,
    });
    const pricePerYear = await stripe.prices.create({
      unit_amount: Number(payload.pricePerYear) * 100,
      currency: "usd",
      recurring: { interval: "year" },
      product: product.id,
    });
    payload = {
      ...payload,
      creatorId: mongoose.Types.ObjectId(userId),
      stripe: {
        pricePerYear: pricePerYear.id,
        pricePerMonth: pricePerMonth.id,
        productId: product.id,
      },
    };
    const plan = await SubscriptionPlan.create(payload);

    return res.status(201).send(plan);
  } catch (error) {
    //console.log(error);
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.updatePlanById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const plan = await SubscriptionPlan.findOneAndUpdate(
      {
        _id: ObjectId(id),
        isDeleted: false,
      },
      {
        $set: payload,
      },
      {
        new: true,
      }
    );
    if (plan === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.deletePlanById = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const plan = await SubscriptionPlan.findOneAndDelete({
      _id: ObjectId(id),
      isDeleted: false,
    });
    if (plan === null) {
      return res.status(404).json({ success: false, message: "Not found or already deleted" });
    }
    return res.status(200).json({
      success: true,
      message: "Deleted plan successfully.",
    });
  } catch (error) {
    return res.status(400).send({ msg: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getPlans = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.find({
      isDeleted: false,
    });
    return res.status(200).json(plans);
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getDefaultPermissions = async (req, res) => {
  try {
    const plans = await SubscriptionPlan.findOne({
      isDefault: true,
    });
    if (plans) {
      return res.status(200).json({ data: plans.permissions });
    } else {
      return res.status(500).json({ msg: "Not Found" });
    }
  } catch (err) {
    return res.status(500).json({
      errors: { common: { msg: err.message } },
    });
  }
};

exports.getPlan = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { isDefault } = req.query;
  try {
    let plan;
    if (isDefault === "true") {
      plan = await SubscriptionPlan.aggregate([
        {
          $match: { isDefault: true, isDeleted: false },
        },
      ]);
    } else {
      plan = await SubscriptionPlan.aggregate([
        {
          $match: { _id: ObjectId(id), isDeleted: false },
        },
      ]);
    }
    if (plan.length === 0) {
      return res.status(404).send({ success: false, message: "Not found" });
    }
    return res.status(200).json(plan[0]);
  } catch (error) {
    return res.send({ success: false, message: error.message.replace(/"/g, "") });
  }
});

exports.updateElementTitle = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const plan = await SubscriptionPlan.findOneAndUpdate(
      {
        "permissions._id": ObjectId(id),
      },
      {
        $set: { "permissions.$.elementTitle": payload.title },
      },
      {
        new: true,
      }
    );
    if (plan === null) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res.status(200).json({ success: true, plan });
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

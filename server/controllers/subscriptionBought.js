const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const { SubscriptionBought } = require("../models/index");

exports.addSubscriptionForOrgs = asyncHandler(async (req, res) => {
  try {
    let payload = req.body;
    if(payload.upgraded === undefined){
      await SubscriptionBought.updateMany(
        { organizationId: mongoose.Types.ObjectId(req.body.organizationId), status: "waiting" },
        { status: "upgraded" }
      );
    }
    

    payload = {
      ...payload,
      planId: mongoose.Types.ObjectId(req.body.planId),
      organizationId: mongoose.Types.ObjectId(req.body.organizationId),
    };
    const plan = await SubscriptionBought.create(payload);

    return res.status(201).send(plan);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});


exports.updateSubscriptionForOrgs = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    let payload = req.body;
    if (payload.paymentInfo) {
      await SubscriptionBought.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(id) },
        {
          $addToSet: { paymentInfo: { ...payload.paymentInfo,date:new Date() } },
          $set: {
            stripeSubscription: { ...payload.stripeSubscription},
            status: payload.status,
            startDate: payload.startDate,
            expireDate: payload.expireDate,
            userId:mongoose.Types.ObjectId(payload.userId)
          },
        }
      );
    }

    return res.status(201).send({success:true});
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});

exports.getByOrganization = asyncHandler(async (req, res) => {
  try {
    let { id } = req.params;
    const data = await SubscriptionBought.aggregate([
      { $match: { organizationId: mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "userId",
          as: "user",
        },
      },
      {
        $unwind: {
          path: "$user",
    
          preserveNullAndEmptyArrays: true,
        },
      },

    ]);
    return res.status(201).send(data);
  } catch (error) {
    return res.status(400).send({ message: error.message.replace(/"/g, ""), success: false });
  }
});
